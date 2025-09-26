#!/usr/bin/env python3
"""
Cost Analyzer for Claude-GitHub-Jira Integration

This script analyzes the cost breakdown of the automation system across
different services and provides recommendations for cost optimization.

Usage:
    python scripts/cost-analyzer.py --period 30d --detailed
    python scripts/cost-analyzer.py --export-csv
"""

import argparse
import json
import os
import sys
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
import requests
import csv

class CostAnalyzer:
    """Analyzes costs for the automation system."""
    
    # Cost constants (USD)
    GITHUB_ACTIONS_COST_PER_MINUTE = 0.008  # Linux runner
    CLAUDE_API_COST_PER_1K_TOKENS = 0.015   # Claude-3 Sonnet
    JIRA_API_COST_PER_CALL = 0.0            # Free tier
    AVERAGE_TOKENS_PER_REQUEST = 2500       # Estimated
    
    def __init__(self, github_token: str, repo: str):
        """Initialize the cost analyzer.
        
        Args:
            github_token: GitHub personal access token
            repo: Repository in format 'owner/repo'
        """
        self.github_token = github_token
        self.repo = repo
        self.session = requests.Session()
        self.session.headers.update({
            'Authorization': f'token {github_token}',
            'Accept': 'application/vnd.github.v3+json'
        })
    
    def get_workflow_runs(self, days: int = 30) -> List[Dict]:
        """Fetch workflow runs from GitHub API.
        
        Args:
            days: Number of days to look back
            
        Returns:
            List of workflow run data
        """
        since_date = (datetime.now() - timedelta(days=days)).isoformat()
        
        url = f'https://api.github.com/repos/{self.repo}/actions/runs'
        params = {
            'created': f'>={since_date}',
            'per_page': 100
        }
        
        all_runs = []
        page = 1
        
        while page <= 10:  # Safety limit
            params['page'] = page
            response = self.session.get(url, params=params)
            
            if response.status_code != 200:
                print(f"❌ Error fetching workflow runs: {response.status_code}")
                break
            
            data = response.json()
            runs = data.get('workflow_runs', [])
            
            if not runs:
                break
            
            all_runs.extend(runs)
            
            # Check if we have more pages
            if len(runs) < 100:
                break
                
            page += 1
        
        return all_runs
    
    def calculate_github_actions_cost(self, runs: List[Dict]) -> Tuple[float, Dict]:
        """Calculate GitHub Actions costs.
        
        Args:
            runs: List of workflow runs
            
        Returns:
            Tuple of (total_cost, breakdown_dict)
        """
        total_minutes = 0
        breakdown = {
            'total_runs': 0,
            'successful_runs': 0,
            'failed_runs': 0,
            'total_minutes': 0,
            'avg_duration_minutes': 0
        }
        
        automation_runs = []
        
        for run in runs:
            # Filter for automation-related workflows
            if any(keyword in run['name'].lower() for keyword in ['claude', 'code-review', 'automation']):
                automation_runs.append(run)
                
                if run['created_at'] and run['updated_at']:
                    created = datetime.fromisoformat(run['created_at'].replace('Z', '+00:00'))
                    updated = datetime.fromisoformat(run['updated_at'].replace('Z', '+00:00'))
                    duration_minutes = (updated - created).total_seconds() / 60
                    total_minutes += duration_minutes
                    
                    if run['conclusion'] == 'success':
                        breakdown['successful_runs'] += 1
                    elif run['conclusion'] == 'failure':
                        breakdown['failed_runs'] += 1
        
        breakdown['total_runs'] = len(automation_runs)
        breakdown['total_minutes'] = round(total_minutes, 2)
        breakdown['avg_duration_minutes'] = round(total_minutes / len(automation_runs), 2) if automation_runs else 0
        
        total_cost = total_minutes * self.GITHUB_ACTIONS_COST_PER_MINUTE
        
        return total_cost, breakdown
    
    def estimate_claude_api_cost(self, successful_runs: int) -> Tuple[float, Dict]:
        """Estimate Claude API costs.
        
        Args:
            successful_runs: Number of successful workflow runs
            
        Returns:
            Tuple of (total_cost, breakdown_dict)
        """
        # Assume each successful run makes one Claude API call
        api_calls = successful_runs
        total_tokens = api_calls * self.AVERAGE_TOKENS_PER_REQUEST
        total_cost = (total_tokens / 1000) * self.CLAUDE_API_COST_PER_1K_TOKENS
        
        breakdown = {
            'api_calls': api_calls,
            'estimated_tokens': total_tokens,
            'tokens_per_call': self.AVERAGE_TOKENS_PER_REQUEST,
            'cost_per_1k_tokens': self.CLAUDE_API_COST_PER_1K_TOKENS
        }
        
        return total_cost, breakdown
    
    def calculate_total_cost(self, days: int = 30) -> Dict:
        """Calculate total cost breakdown.
        
        Args:
            days: Number of days to analyze
            
        Returns:
            Dictionary with complete cost breakdown
        """
        print(f"🔍 Analyzing costs for the last {days} days...")
        
        # Fetch workflow data
        runs = self.get_workflow_runs(days)
        print(f"📊 Found {len(runs)} total workflow runs")
        
        # Calculate GitHub Actions cost
        actions_cost, actions_breakdown = self.calculate_github_actions_cost(runs)
        
        # Calculate Claude API cost
        claude_cost, claude_breakdown = self.estimate_claude_api_cost(
            actions_breakdown['successful_runs']
        )
        
        # Jira API is free for most use cases
        jira_cost = 0.0
        jira_breakdown = {
            'api_calls': actions_breakdown['successful_runs'],  # Rough estimate
            'cost_per_call': self.JIRA_API_COST_PER_CALL,
            'note': 'Free tier - costs may apply for high volume'
        }
        
        # Total cost
        total_cost = actions_cost + claude_cost + jira_cost
        
        # Daily average
        daily_avg = total_cost / days if days > 0 else 0
        
        return {
            'analysis_period': f'{days} days',
            'analysis_date': datetime.now().isoformat(),
            'total_cost': round(total_cost, 4),
            'daily_average': round(daily_avg, 4),
            'monthly_projection': round(daily_avg * 30, 4),
            'breakdown': {
                'github_actions': {
                    'cost': round(actions_cost, 4),
                    'percentage': round((actions_cost / total_cost * 100), 1) if total_cost > 0 else 0,
                    **actions_breakdown
                },
                'claude_api': {
                    'cost': round(claude_cost, 4),
                    'percentage': round((claude_cost / total_cost * 100), 1) if total_cost > 0 else 0,
                    **claude_breakdown
                },
                'jira_api': {
                    'cost': round(jira_cost, 4),
                    'percentage': round((jira_cost / total_cost * 100), 1) if total_cost > 0 else 0,
                    **jira_breakdown
                }
            }
        }
    
    def generate_recommendations(self, cost_data: Dict) -> List[str]:
        """Generate cost optimization recommendations.
        
        Args:
            cost_data: Cost analysis results
            
        Returns:
            List of recommendation strings
        """
        recommendations = []
        
        breakdown = cost_data['breakdown']
        actions = breakdown['github_actions']
        claude = breakdown['claude_api']
        
        # GitHub Actions optimizations
        if actions['avg_duration_minutes'] > 5:
            recommendations.append(
                f"⚡ **Optimize workflow duration**: Average run time is {actions['avg_duration_minutes']:.1f} minutes. "
                "Consider caching dependencies, optimizing steps, or running tests in parallel."
            )
        
        if actions['failed_runs'] > actions['successful_runs'] * 0.1:  # More than 10% failure rate
            recommendations.append(
                f"🔧 **Reduce failure rate**: {actions['failed_runs']} failed runs waste compute resources. "
                "Investigate common failure patterns and improve error handling."
            )
        
        # Claude API optimizations
        if claude['tokens_per_call'] > 3000:
            recommendations.append(
                "📝 **Optimize Claude prompts**: Consider reducing prompt length or using more efficient "
                "prompt engineering to reduce token usage."
            )
        
        # Cost thresholds
        if cost_data['monthly_projection'] > 50:
            recommendations.append(
                f"💰 **High monthly projection**: ${cost_data['monthly_projection']:.2f}/month projected cost. "
                "Consider implementing usage quotas or approval workflows for non-critical runs."
            )
        
        # Efficiency recommendations
        if cost_data['total_cost'] > 0:
            cost_per_run = cost_data['total_cost'] / actions['total_runs'] if actions['total_runs'] > 0 else 0
            if cost_per_run > 0.10:
                recommendations.append(
                    f"⚖️ **High cost per run**: ${cost_per_run:.4f} per workflow run. "
                    "Consider batching multiple changes or implementing smarter triggering."
                )
        
        # Usage pattern recommendations
        if actions['total_runs'] < 10:
            recommendations.append(
                "📈 **Low usage detected**: Consider promoting the automation system to increase adoption "
                "and maximize ROI on setup investment."
            )
        
        if not recommendations:
            recommendations.append(
                "✅ **Well optimized**: Your automation system is running efficiently with reasonable costs!"
            )
        
        return recommendations
    
    def export_to_csv(self, cost_data: Dict, filename: str):
        """Export cost data to CSV file.
        
        Args:
            cost_data: Cost analysis results
            filename: Output CSV filename
        """
        with open(filename, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            
            # Header
            writer.writerow(['Metric', 'Value', 'Unit'])
            
            # Summary data
            writer.writerow(['Analysis Period', cost_data['analysis_period'], 'days'])
            writer.writerow(['Total Cost', cost_data['total_cost'], 'USD'])
            writer.writerow(['Daily Average', cost_data['daily_average'], 'USD'])
            writer.writerow(['Monthly Projection', cost_data['monthly_projection'], 'USD'])
            writer.writerow([''])  # Empty row
            
            # Breakdown
            for service, data in cost_data['breakdown'].items():
                service_name = service.replace('_', ' ').title()
                writer.writerow([f'{service_name} Cost', data['cost'], 'USD'])
                writer.writerow([f'{service_name} Percentage', data['percentage'], '%'])
                
                if 'total_runs' in data:
                    writer.writerow([f'{service_name} Total Runs', data['total_runs'], 'runs'])
                if 'api_calls' in data:
                    writer.writerow([f'{service_name} API Calls', data['api_calls'], 'calls'])
        
        print(f"📄 Cost data exported to {filename}")

def print_cost_report(cost_data: Dict, recommendations: List[str]):
    """Print a formatted cost report to console.
    
    Args:
        cost_data: Cost analysis results
        recommendations: List of recommendations
    """
    print("\n" + "="*60)
    print("💰 CLAUDE-GITHUB-JIRA AUTOMATION COST ANALYSIS")
    print("="*60)
    
    print(f"\n📅 Analysis Period: {cost_data['analysis_period']}")
    print(f"📊 Total Cost: ${cost_data['total_cost']:.4f}")
    print(f"📈 Daily Average: ${cost_data['daily_average']:.4f}")
    print(f"📊 Monthly Projection: ${cost_data['monthly_projection']:.2f}")
    
    print("\n💸 Cost Breakdown:")
    print("-" * 40)
    
    for service, data in cost_data['breakdown'].items():
        service_name = service.replace('_', ' ').title()
        print(f"{service_name:15} ${data['cost']:8.4f} ({data['percentage']:5.1f}%)")
    
    print("\n📊 Detailed Metrics:")
    print("-" * 40)
    
    actions = cost_data['breakdown']['github_actions']
    print(f"GitHub Actions:")
    print(f"  • Total Runs: {actions['total_runs']}")
    print(f"  • Successful: {actions['successful_runs']}")
    print(f"  • Failed: {actions['failed_runs']}")
    print(f"  • Avg Duration: {actions['avg_duration_minutes']:.1f} minutes")
    print(f"  • Total Minutes: {actions['total_minutes']:.1f}")
    
    claude = cost_data['breakdown']['claude_api']
    print(f"\nClaude API:")
    print(f"  • API Calls: {claude['api_calls']}")
    print(f"  • Est. Tokens: {claude['estimated_tokens']:,}")
    print(f"  • Avg Tokens/Call: {claude['tokens_per_call']:,}")
    
    print("\n🎯 Optimization Recommendations:")
    print("-" * 40)
    
    for i, recommendation in enumerate(recommendations, 1):
        print(f"{i}. {recommendation}")
    
    print("\n" + "="*60)

def main():
    """Main function."""
    parser = argparse.ArgumentParser(
        description='Analyze costs for Claude-GitHub-Jira automation system'
    )
    parser.add_argument(
        '--period',
        default='30d',
        help='Analysis period (e.g., 7d, 30d, 90d)'
    )
    parser.add_argument(
        '--detailed',
        action='store_true',
        help='Show detailed breakdown'
    )
    parser.add_argument(
        '--export-csv',
        metavar='FILENAME',
        help='Export results to CSV file'
    )
    parser.add_argument(
        '--repo',
        help='GitHub repository (owner/repo)',
        default=os.environ.get('GITHUB_REPOSITORY', 'Dean-Son/algorithm')
    )
    
    args = parser.parse_args()
    
    # Get GitHub token
    github_token = os.environ.get('GITHUB_TOKEN')
    if not github_token:
        print("❌ Error: GITHUB_TOKEN environment variable not set")
        print("   Export your GitHub token: export GITHUB_TOKEN=your_token_here")
        sys.exit(1)
    
    # Parse period
    period_str = args.period.lower()
    if period_str.endswith('d'):
        days = int(period_str[:-1])
    else:
        print("❌ Error: Period must be in format '30d', '7d', etc.")
        sys.exit(1)
    
    try:
        # Initialize analyzer
        analyzer = CostAnalyzer(github_token, args.repo)
        
        # Calculate costs
        cost_data = analyzer.calculate_total_cost(days)
        
        # Generate recommendations
        recommendations = analyzer.generate_recommendations(cost_data)
        
        # Print report
        print_cost_report(cost_data, recommendations)
        
        # Export to CSV if requested
        if args.export_csv:
            analyzer.export_to_csv(cost_data, args.export_csv)
        
        # Save JSON for other tools
        output_file = 'cost-analysis.json'
        with open(output_file, 'w') as f:
            json.dump({
                **cost_data,
                'recommendations': recommendations
            }, f, indent=2)
        
        print(f"\n💾 Detailed results saved to {output_file}")
        
    except requests.RequestException as e:
        print(f"❌ Error communicating with GitHub API: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
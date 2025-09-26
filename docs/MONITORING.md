# 📊 Performance Monitoring & Health Check Guide

This guide covers the comprehensive monitoring system for the Claude-GitHub-Jira integration, including performance metrics, cost tracking, and automated health checks.

## 🎯 Monitoring Overview

Our monitoring system provides:
- **Performance Metrics**: Success rates, execution times, and throughput
- **Cost Analysis**: API usage costs and optimization recommendations
- **Health Checks**: Connectivity and system status monitoring
- **Automated Alerts**: Proactive issue detection and notification

## 📈 Performance Monitoring Workflow

### Automatic Triggers
- **Daily Schedule**: Runs at 9 AM KST (midnight UTC)
- **Workflow Completion**: Triggers after each Claude Code Review
- **Manual Dispatch**: On-demand analysis with custom parameters

### Key Metrics Collected
| Metric | Description | Threshold |
|--------|-------------|-----------|
| **Success Rate** | Percentage of successful workflow runs | >85% |
| **Average Duration** | Mean execution time per workflow | <300 seconds |
| **Total Runs** | Number of automation executions | - |
| **Failed Runs** | Count of failed executions | <10% of total |
| **API Calls** | Total API requests to external services | - |
| **Estimated Cost** | Financial impact of automation usage | <$5/month |

### Performance Dashboard
The system generates visual dashboards including:
- Success rate pie charts
- Duration distribution histograms
- Performance score breakdowns
- Activity and cost summaries

## 💰 Cost Analysis

### Cost Components
1. **GitHub Actions**: Compute time for workflow execution
   - Rate: ~$0.008 per minute
   - Average: 2-3 minutes per run

2. **Claude API**: AI-powered code analysis
   - Rate: ~$0.015 per 1K tokens
   - Average: 2,500 tokens per request

3. **Jira API**: Ticket management and updates
   - Rate: Free for most use cases
   - Note: Costs may apply for high-volume usage

### Using the Cost Analyzer

#### Basic Usage
```bash
# Analyze last 30 days
export GITHUB_TOKEN=your_token_here
python scripts/cost-analyzer.py

# Analyze specific period
python scripts/cost-analyzer.py --period 7d

# Export results to CSV
python scripts/cost-analyzer.py --export-csv costs.csv --detailed
```

#### Sample Output
```
💰 CLAUDE-GITHUB-JIRA AUTOMATION COST ANALYSIS
============================================================

📅 Analysis Period: 30 days
📊 Total Cost: $2.1847
📈 Daily Average: $0.0728
📊 Monthly Projection: $2.18

💸 Cost Breakdown:
GitHub Actions   $ 1.2640 ( 57.9%)
Claude Api       $ 0.9207 ( 42.1%)
Jira Api         $ 0.0000 (  0.0%)
```

### Cost Optimization Recommendations
The analyzer provides actionable recommendations:
- **Workflow Duration**: Optimize slow-running steps
- **Failure Rate**: Reduce wasted compute on failed runs
- **Token Usage**: Optimize Claude prompts for efficiency
- **Usage Patterns**: Implement smart triggering for batched changes

## 🏥 Health Check System

### Health Check Components

#### 1. Connectivity Check
Tests API accessibility for all integrated services:
- **Claude API**: Model availability and authentication
- **GitHub API**: Repository access and permissions
- **Jira API**: Instance connectivity and credentials

#### 2. Performance Analysis
Evaluates recent system performance:
- Success rates over the last 24 hours
- Average execution duration trends
- Performance score calculation (0-100)

#### 3. Security Assessment
Reviews security configuration:
- Environment variable protection
- Workflow permission settings
- Dependency vulnerability scanning
- Token rotation reminders

### Health Check Schedule
- **Every 6 hours**: Automated health monitoring
- **Manual Trigger**: On-demand health assessment
- **Alert Thresholds**: Configurable sensitivity levels

### Health Report Format
```markdown
# 🏥 System Health Report

## 🎯 Overall System Health
| Component | Status | Score |
|-----------|--------|-------|
| Connectivity | excellent | 100% |
| Performance | good | 87.5 |
| Security | good | 90 |

## 🔌 API Connectivity Status
| Service | Status | Details |
|---------|--------|---------|
| Claude API | healthy | ✅ Operational |
| GitHub API | healthy | ✅ Operational |
| Jira API | healthy | ✅ Operational |
```

## 🚨 Alert System

### Alert Levels
- **🟢 Low**: Performance degradation or minor issues
- **🟡 Medium**: Multiple issues or moderate impact
- **🔴 High**: Critical system failures or security concerns

### Alert Triggers
1. **Performance Alerts**
   - Success rate below 85%
   - Average duration exceeds 300 seconds
   - High estimated costs (>$5/month)

2. **Health Alerts**
   - API connectivity failures
   - Security configuration issues
   - Workflow permission problems

3. **Cost Alerts**
   - Unexpected cost increases
   - Usage pattern anomalies
   - Budget threshold breaches

### Alert Actions
When alerts are triggered:
1. **GitHub Issue Created**: Detailed problem description
2. **Investigation Steps**: Provided in issue template
3. **Recommended Actions**: Specific remediation guidance
4. **Auto-Labeling**: Categorized by priority and type

## 🔧 Configuration

### Environment Variables
```bash
# Required for monitoring
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
CLAUDE_TOKEN=sk-xxxxxxxxxxxx
JIRA_URL=https://company.atlassian.net
JIRA_EMAIL=user@company.com
JIRA_TOKEN=ATATT3xFfGF0...

# Optional monitoring settings
METRICS_RETENTION_DAYS=90
ALERT_THRESHOLD_SUCCESS_RATE=85
ALERT_THRESHOLD_AVG_DURATION=300
```

### Workflow Customization

#### Performance Monitoring
```yaml
# .github/workflows/performance-monitoring.yml
env:
  METRICS_RETENTION_DAYS: 90
  ALERT_THRESHOLD_SUCCESS_RATE: 85
  ALERT_THRESHOLD_AVG_DURATION: 300
```

#### Health Check
```yaml
# .github/workflows/health-check.yml
env:
  HEALTH_CHECK_TIMEOUT: 30
  MAX_RESPONSE_TIME: 5000
  MIN_SUCCESS_RATE: 90
```

## 📊 Dashboard Access

### Viewing Performance Data
1. **GitHub Actions Tab**: View workflow execution logs
2. **Artifacts**: Download generated dashboards and reports
3. **Issues Tab**: Review automated alerts and health reports
4. **Cost Reports**: Access detailed cost analysis files

### Manual Dashboard Generation
```bash
# Generate performance dashboard
gh workflow run performance-monitoring.yml \
  -f time_range=30d \
  -f detailed_analysis=true

# Trigger health check
gh workflow run health-check.yml \
  -f check_type=full \
  -f alert_threshold=medium
```

## 🎯 Best Practices

### Monitoring Strategy
1. **Regular Review**: Check weekly performance summaries
2. **Threshold Tuning**: Adjust alert levels based on usage patterns
3. **Cost Awareness**: Monitor monthly spending trends
4. **Proactive Maintenance**: Address issues before they become critical

### Performance Optimization
1. **Workflow Efficiency**: Minimize execution time
2. **Error Handling**: Reduce failure rates through better error handling
3. **Prompt Engineering**: Optimize Claude API token usage
4. **Caching Strategies**: Implement dependency caching

### Security Monitoring
1. **Token Rotation**: Regular credential updates (90-day cycle)
2. **Permission Auditing**: Review workflow permissions quarterly
3. **Dependency Updates**: Keep security vulnerabilities patched
4. **Access Monitoring**: Track API usage patterns

## 🔍 Troubleshooting

### Common Issues

#### High Failure Rate
**Symptoms**: Success rate below 85%
**Investigation**:
1. Check recent workflow logs in Actions tab
2. Review error patterns in failed runs
3. Verify API token validity and permissions
4. Test connectivity to external services

**Solutions**:
- Update expired tokens
- Fix authentication issues
- Improve error handling in workflows
- Optimize network timeouts

#### Slow Performance
**Symptoms**: Average duration exceeds 300 seconds
**Investigation**:
1. Identify slow workflow steps
2. Check dependency installation times
3. Review API response times
4. Analyze resource utilization

**Solutions**:
- Implement caching for dependencies
- Optimize API calls and payloads
- Parallelize independent workflow steps
- Upgrade runner resources if needed

#### High Costs
**Symptoms**: Monthly projection exceeds budget
**Investigation**:
1. Run detailed cost analysis
2. Identify usage pattern changes
3. Review API call frequency
4. Check for unnecessary workflow triggers

**Solutions**:
- Optimize workflow triggers
- Reduce API token usage
- Implement usage quotas
- Batch multiple changes together

### Getting Help
1. **Check Documentation**: Review monitoring guides and troubleshooting steps
2. **GitHub Issues**: Create issues using provided templates
3. **Workflow Logs**: Examine detailed execution logs
4. **Health Reports**: Use automated health check insights

## 📚 Related Documentation
- [Setup Guide](../setup-automation.sh): Initial system configuration
- [Contributing Guide](../CONTRIBUTING.md): Development guidelines
- [Rules](../RULES.md): Team development standards
- [Troubleshooting](../beginner-complete-guide.html): Comprehensive troubleshooting guide

---

*This monitoring system ensures optimal performance, cost efficiency, and reliability of the Claude-GitHub-Jira integration.*
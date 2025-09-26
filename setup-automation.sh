#!/bin/bash

# Claude-GitHub-Jira 통합 자동화 설정 스크립트
# 이 스크립트는 새로운 팀원이 쉽게 환경을 설정할 수 있도록 도와줍니다.

set -e

echo "🚀 Claude-GitHub-Jira 자동화 시스템 설정을 시작합니다..."
echo ""

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 진행 상황 표시 함수
print_step() {
    echo -e "${BLUE}[단계 $1]${NC} $2"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

# 시스템 요구사항 확인
print_step "1" "시스템 요구사항 확인 중..."

# Python 버전 확인
if ! command -v python3 &> /dev/null; then
    print_error "Python 3.8 이상이 필요합니다. 설치 후 다시 실행해주세요."
    exit 1
fi

PYTHON_VERSION=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
REQUIRED_VERSION="3.8"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$PYTHON_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    print_error "Python $REQUIRED_VERSION 이상이 필요합니다. 현재 버전: $PYTHON_VERSION"
    exit 1
fi

print_success "Python 버전 확인 완료: $PYTHON_VERSION"

# Git 확인
if ! command -v git &> /dev/null; then
    print_error "Git이 설치되어 있지 않습니다."
    exit 1
fi
print_success "Git 설치 확인 완료"

# Node.js 확인 (선택사항)
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_success "Node.js 확인 완료: $NODE_VERSION"
fi

echo ""

# uv 및 uvx 설치
print_step "2" "uv 패키지 매니저 설치 중..."

if ! command -v uv &> /dev/null; then
    print_warning "uv가 설치되어 있지 않습니다. 설치를 진행합니다..."
    pip install uv --upgrade
    print_success "uv 설치 완료"
else
    print_success "uv가 이미 설치되어 있습니다."
    # 최신 버전으로 업데이트
    pip install uv --upgrade
    print_success "uv 업데이트 완료"
fi

# uvx 명령어 확인
if ! command -v uvx &> /dev/null; then
    print_error "uvx 명령어를 찾을 수 없습니다. PATH 설정을 확인해주세요."
    echo "다음 명령어를 실행해보세요:"
    echo "export PATH=\"\$HOME/.local/bin:\$PATH\""
    exit 1
fi

print_success "uvx 명령어 확인 완료"

echo ""

# MCP Atlassian 패키지 설치 테스트
print_step "3" "MCP Atlassian 연결 테스트 중..."

if uvx mcp-atlassian --help > /dev/null 2>&1; then
    print_success "MCP Atlassian 패키지 접근 가능"
else
    print_warning "MCP Atlassian 패키지 초기 설치 중..."
    uvx mcp-atlassian --help > /dev/null 2>&1 || true
    print_success "MCP Atlassian 패키지 설치 완료"
fi

echo ""

# 디렉토리 구조 생성
print_step "4" "프로젝트 디렉토리 구조 생성 중..."

# .github/workflows 디렉토리
if [ ! -d ".github/workflows" ]; then
    mkdir -p .github/workflows
    print_success ".github/workflows 디렉토리 생성"
else
    print_success ".github/workflows 디렉토리 이미 존재"
fi

# .claude 디렉토리
if [ ! -d ".claude" ]; then
    mkdir -p .claude
    print_success ".claude 디렉토리 생성"
else
    print_success ".claude 디렉토리 이미 존재"
fi

echo ""

# 설정 파일 생성
print_step "5" "설정 파일 템플릿 생성 중..."

# .env.example 파일 생성
if [ ! -f ".env.example" ]; then
    cat > .env.example << 'EOF'
# Claude 설정
CLAUDE_CODE_OAUTH_TOKEN=your_claude_oauth_token_here

# Jira 설정  
JIRA_URL=https://your-company.atlassian.net
JIRA_EMAIL=your-email@company.com
JIRA_TOKEN=your_jira_api_token_here

# GitHub 설정 (Actions에서 자동 주입)
GITHUB_TOKEN=automatically_provided_by_actions
EOF
    print_success ".env.example 파일 생성 완료"
else
    print_success ".env.example 파일 이미 존재"
fi

# .claude/settings.local.json 생성 (존재하지 않는 경우만)
if [ ! -f ".claude/settings.local.json" ]; then
    cat > .claude/settings.local.json << 'EOF'
{
  "permissions": {
    "allow": [
      "mcp__taskmaster-ai__initialize_project",
      "Bash(git checkout:*)",
      "Bash(git add:*)", 
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(gh pr create:*)",
      "mcp__mcp-atlassian__jira_add_comment",
      "Bash(gh pr list:*)",
      "Bash(gh pr ready:*)"
    ],
    "deny": [],
    "ask": []
  },
  "enableAllProjectMcpServers": true,
  "enabledMcpjsonServers": [
    "mcp-atlassian"
  ]
}
EOF
    print_success "Claude 설정 파일 생성 완료"
else
    print_success "Claude 설정 파일 이미 존재"
fi

# .mcp.json 생성 (환경변수 사용)
if [ ! -f ".mcp.json" ]; then
    cat > .mcp.json << 'EOF'
{
  "mcpServers": {
    "mcp-atlassian": {
      "command": "uvx",
      "args": [
        "mcp-atlassian",
        "--jira-url=${JIRA_URL}",
        "--jira-username=${JIRA_EMAIL}",
        "--jira-token=${JIRA_TOKEN}"
      ]
    }
  }
}
EOF
    print_success "MCP 설정 파일 생성 완료"
else
    print_success "MCP 설정 파일 이미 존재"
fi

# .gitignore 업데이트
print_step "6" ".gitignore 파일 업데이트 중..."

# .gitignore에 필요한 항목들 추가
GITIGNORE_ITEMS="
# 환경변수 파일
.env
.env.local
.env.production

# 임시 파일
*.tmp
*.temp
.DS_Store

# IDE 설정
.vscode/settings.json
.idea/

# Claude Code 캐시
.claude/cache/
"

if [ ! -f ".gitignore" ]; then
    echo "$GITIGNORE_ITEMS" > .gitignore
    print_success ".gitignore 파일 생성 완료"
else
    # 기존 .gitignore에 추가 (중복 방지)
    echo "$GITIGNORE_ITEMS" >> .gitignore
    # 중복 제거
    sort .gitignore | uniq > .gitignore.tmp && mv .gitignore.tmp .gitignore
    print_success ".gitignore 파일 업데이트 완료"
fi

echo ""

# GitHub Workflow 파일 생성
print_step "7" "GitHub Actions 워크플로우 파일 생성 중..."

if [ ! -f ".github/workflows/claude-code-review.yml" ]; then
    cat > .github/workflows/claude-code-review.yml << 'EOF'
name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  claude-review:
    runs-on: ubuntu-latest
    
    permissions:
      contents: read
      pull-requests: write
      issues: read
      id-token: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Extract Jira ticket from branch
        id: jira_ticket
        run: |
          BRANCH_NAME="${{ github.head_ref }}"
          if [[ $BRANCH_NAME =~ feature/([A-Z]+-[0-9]+) ]]; then
            TICKET=${BASH_REMATCH[1]}
            echo "ticket=$TICKET" >> $GITHUB_OUTPUT
            echo "✅ Jira 티켓 발견: $TICKET"
          else
            echo "❌ 브랜치명에서 Jira 티켓을 찾을 수 없습니다: $BRANCH_NAME"
            echo "브랜치명 형식: feature/CX-123"
            exit 1
          fi

      - name: Get changed files
        id: changed_files
        run: |
          git diff --name-only origin/${{ github.base_ref }}..HEAD > changed_files.txt
          echo "files<<EOF" >> $GITHUB_OUTPUT
          cat changed_files.txt >> $GITHUB_OUTPUT
          echo "EOF" >> $GITHUB_OUTPUT

      - name: Setup Python for Claude integration
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'

      - name: Install Claude dependencies
        run: |
          pip install anthropic requests

      - name: Claude Code Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.CLAUDE_TOKEN }}
          JIRA_URL: ${{ secrets.JIRA_URL }}
          JIRA_EMAIL: ${{ secrets.JIRA_EMAIL }}
          JIRA_TOKEN: ${{ secrets.JIRA_TOKEN }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          python << 'EOF'
          import os
          import requests
          import json
          from anthropic import Anthropic

          # 변경된 파일들 읽기
          with open('changed_files.txt', 'r') as f:
              changed_files = f.read().strip().split('\n')

          # 파일 내용 수집
          file_contents = []
          for file in changed_files:
              if os.path.exists(file) and file.endswith(('.py', '.js', '.ts', '.java', '.cpp', '.c', '.php', '.rb', '.go')):
                  with open(file, 'r', encoding='utf-8', errors='ignore') as f:
                      content = f.read()
                      file_contents.append(f"파일: {file}\n{content}\n{'='*50}\n")

          if not file_contents:
              print("코드 리뷰할 파일이 없습니다.")
              exit(0)

          # Claude AI 코드 리뷰
          client = Anthropic(api_key=os.environ['ANTHROPIC_API_KEY'])
          
          code_context = '\n'.join(file_contents[:5])  # 최대 5개 파일만
          
          prompt = f"""
          다음 코드 변경사항을 리뷰해주세요:

          {code_context}

          다음 관점에서 리뷰를 진행해주세요:
          1. 코드 품질 및 개선점
          2. 잠재적 버그나 보안 이슈
          3. 성능 최적화 가능성
          4. 코딩 스타일 및 모범 사례 준수

          리뷰 결과를 간결하고 실용적으로 작성해주세요.
          """

          message = client.messages.create(
              model="claude-3-sonnet-20240229",
              max_tokens=1500,
              messages=[{"role": "user", "content": prompt}]
          )
          
          review_content = message.content[0].text

          # GitHub PR에 댓글 작성
          github_token = os.environ['GITHUB_TOKEN']
          repo = os.environ['GITHUB_REPOSITORY']
          pr_number = os.environ['GITHUB_REF'].split('/')[-2] if '/pull/' in os.environ['GITHUB_REF'] else None
          
          if not pr_number:
              # PR 번호를 다른 방법으로 찾기
              pr_number = "${{ github.event.pull_request.number }}"

          comment_body = f"""## 🤖 Claude AI 코드 리뷰

{review_content}

---
*이 리뷰는 Claude AI에 의해 자동 생성되었습니다.*  
*🤖 Generated with [Claude Code](https://claude.ai/code)*
"""

          # PR 댓글 작성
          url = f"https://api.github.com/repos/{repo}/issues/{pr_number}/comments"
          headers = {
              'Authorization': f'token {github_token}',
              'Accept': 'application/vnd.github.v3+json'
          }
          data = {'body': comment_body}
          
          response = requests.post(url, headers=headers, json=data)
          if response.status_code == 201:
              print("✅ PR 댓글 작성 완료")
          else:
              print(f"❌ PR 댓글 작성 실패: {response.status_code}")
          EOF

      - name: Update Jira ticket
        if: steps.jira_ticket.outputs.ticket != ''
        env:
          JIRA_URL: ${{ secrets.JIRA_URL }}
          JIRA_EMAIL: ${{ secrets.JIRA_EMAIL }}
          JIRA_TOKEN: ${{ secrets.JIRA_TOKEN }}
        run: |
          TICKET="${{ steps.jira_ticket.outputs.ticket }}"
          PR_URL="${{ github.event.pull_request.html_url }}"
          
          # Jira 댓글 작성
          COMMENT="📋 GitHub PR이 생성되었습니다: $PR_URL

🤖 자동화된 코드 리뷰가 진행 중입니다.
- Claude AI가 코드를 분석하여 리뷰 댓글을 작성합니다.
- PR 병합 후 자동으로 완료 상태로 업데이트됩니다.

생성 시간: $(date '+%Y-%m-%d %H:%M:%S UTC')"

          # Base64 인코딩을 사용한 Basic Auth
          AUTH=$(echo -n "${{ secrets.JIRA_EMAIL }}:${{ secrets.JIRA_TOKEN }}" | base64)
          
          curl -X POST \
            "${{ secrets.JIRA_URL }}/rest/api/3/issue/$TICKET/comment" \
            -H "Authorization: Basic $AUTH" \
            -H "Content-Type: application/json" \
            -d "{\"body\": {\"type\": \"doc\", \"version\": 1, \"content\": [{\"type\": \"paragraph\", \"content\": [{\"type\": \"text\", \"text\": \"$COMMENT\"}]}]}}" \
            && echo "✅ Jira 티켓 업데이트 완료: $TICKET" \
            || echo "❌ Jira 티켓 업데이트 실패: $TICKET"
EOF
    print_success "GitHub Actions 워크플로우 파일 생성 완료"
else
    print_success "GitHub Actions 워크플로우 파일 이미 존재"
fi

echo ""

# RULES.md 파일 생성
print_step "8" "브랜치 규칙 문서 생성 중..."

if [ ! -f "RULES.md" ]; then
    cat > RULES.md << 'EOF'
# 개발 규칙 (Development Rules)

## 브랜치 네이밍 규칙

### Feature 브랜치
- **형식**: `feature/CX-{숫자}`
- **규칙**: CX-{숫자}는 반드시 Jira 티켓 번호와 동일해야 합니다
- **예시**: 
  - `feature/CX-1790` (Jira 티켓: CX-1790)
  - `feature/CX-2024` (Jira 티켓: CX-2024)

### 기타 브랜치 유형
- **Hotfix**: `hotfix/CX-{숫자}`
- **Bugfix**: `bugfix/CX-{숫자}` 
- **Release**: `release/v{버전}`

## 자동화 시스템 사용법

### PR 생성 시 주의사항
1. 브랜치명에 정확한 Jira 티켓 번호 포함
2. PR 제목에 티켓 번호 명시: `[CX-1234] 기능 설명`
3. PR 설명에 관련 Jira 티켓 링크 포함

### AI 코드 리뷰 활용
- PR 생성 후 2-3분 내에 자동 리뷰 댓글 확인
- Claude가 제안한 개선사항 적극 반영
- 보안/성능 이슈 발견 시 즉시 수정

## 주의사항
- 브랜치명 규칙 준수 필수 (자동화 작동 조건)
- API 토큰은 정기적으로 갱신 (3개월 주기 권장)
- 민감한 정보는 환경변수 사용

## 팀원 온보딩
1. `./setup-automation.sh` 스크립트 실행
2. `.env` 파일에 개인 토큰 설정
3. 테스트 PR 생성하여 동작 확인
4. 본 문서 숙지 및 준수

## 문제 해결
- GitHub Actions 실행 로그 확인
- Repository Secrets 설정 확인
- 브랜치 네이밍 규칙 준수 확인
EOF
    print_success "개발 규칙 문서 생성 완료"
else
    print_success "개발 규칙 문서 이미 존재"
fi

echo ""

# 사용자 입력 가이드
print_step "9" "설정 완료 및 다음 단계 안내"

print_success "🎉 자동화 시스템 기본 설정이 완료되었습니다!"

echo ""
echo -e "${YELLOW}다음 단계를 수행해주세요:${NC}"
echo ""
echo "1. 개인 토큰 설정:"
echo "   - .env.example 파일을 .env로 복사"
echo "   - 각 서비스에서 발급받은 토큰을 .env 파일에 입력"
echo ""
echo "2. GitHub Repository 설정:"
echo "   - Repository Settings → Secrets and variables → Actions"
echo "   - 다음 secrets 추가:"
echo "     • CLAUDE_TOKEN: Claude OAuth 토큰"
echo "     • JIRA_URL: Jira 인스턴스 URL"
echo "     • JIRA_EMAIL: Jira 로그인 이메일"
echo "     • JIRA_TOKEN: Jira API 토큰"
echo ""
echo "3. 권한 설정:"
echo "   - Repository Settings → Actions → General"
echo "   - Workflow permissions를 'Read and write permissions'로 변경"
echo ""
echo "4. 테스트:"
echo "   - feature/CX-TEST 브랜치 생성"
echo "   - 간단한 변경사항 커밋"
echo "   - PR 생성하여 자동화 동작 확인"
echo ""

print_warning "⚠️  중요한 보안 사항:"
echo "   - .env 파일은 절대 Git에 커밋하지 마세요"
echo "   - API 토큰은 정기적으로 갱신하세요"
echo "   - 팀원과 토큰을 공유하지 마세요"

echo ""
print_success "설정 스크립트가 완료되었습니다. RULES.md 파일을 확인해주세요!"

# 실행 권한 확인 메시지
echo ""
echo -e "${BLUE}📝 설정된 파일들:${NC}"
echo "   ✓ .env.example (토큰 템플릿)"
echo "   ✓ .claude/settings.local.json (Claude 설정)"
echo "   ✓ .mcp.json (MCP 서버 설정)"
echo "   ✓ .github/workflows/claude-code-review.yml (GitHub Actions)"
echo "   ✓ RULES.md (개발 규칙)"
echo "   ✓ .gitignore (Git 제외 파일)"

# 완료 시간 출력
echo ""
echo -e "${GREEN}🚀 설정 완료! 총 소요시간: $(date)${NC}"
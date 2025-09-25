# 개발 규칙 (Development Rules)

## 브랜치 네이밍 규칙 (Branch Naming Convention)

### Feature 브랜치
- **형식**: `feature/CX-{숫자}`
- **규칙**: CX-{숫자}는 반드시 Jira 티켓 번호와 동일해야 합니다
- **예시**: 
  - `feature/CX-1790` (Jira 티켓: CX-1790)
  - `feature/CX-2024` (Jira 티켓: CX-2024)
  - `feature/CX-1001` (Jira 티켓: CX-1001)

### 기타 브랜치 유형
- **Hotfix**: `hotfix/CX-{숫자}`
- **Bugfix**: `bugfix/CX-{숫자}`
- **Release**: `release/v{버전}`

## 사용 예시

```bash
# 새로운 기능 개발 시
git checkout -b feature/CX-1790

# 버그 수정 시
git checkout -b bugfix/CX-1791

# 핫픽스 시
git checkout -b hotfix/CX-1792
```

## 주의사항
- 브랜치명은 반드시 해당 Jira 티켓 번호와 일치해야 합니다
- CX 접두사는 대문자로 작성합니다
- 숫자는 Jira 티켓의 정확한 번호를 사용합니다
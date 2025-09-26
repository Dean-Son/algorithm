# Pull Request

## 📋 Summary
<!-- Provide a concise description of what this PR accomplishes -->


## 🎯 Type of Change
<!-- Check the type of change your PR introduces -->

- [ ] 🐛 **Bug fix** (non-breaking change that fixes an issue)
- [ ] ✨ **New feature** (non-breaking change that adds functionality)
- [ ] 💥 **Breaking change** (fix or feature that would cause existing functionality to change)
- [ ] 📚 **Documentation update** (changes to documentation only)
- [ ] 🔧 **Maintenance** (refactoring, dependency updates, etc.)
- [ ] ⚡ **Performance improvement** (code changes that improve performance)
- [ ] 🔒 **Security improvement** (changes that improve security)

## 🎫 Related Issue(s)
<!-- Link to related Jira tickets or GitHub issues -->

- Jira: [CX-XXXX](https://your-jira-instance.atlassian.net/browse/CX-XXXX)
- Fixes #(issue number)

## 🧪 Test Plan
<!-- Describe how you tested your changes -->

### Manual Testing
- [ ] Tested locally in development environment
- [ ] Tested integration with Claude Code
- [ ] Tested GitHub Actions workflow
- [ ] Tested Jira integration (if applicable)
- [ ] Verified browser compatibility (if UI changes)

### Automated Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] End-to-end tests pass
- [ ] No new linting errors
- [ ] Code coverage maintained/improved

### Testing Checklist
- [ ] **Setup Script**: If setup-automation.sh was modified, tested on clean environment
- [ ] **Documentation**: If docs were updated, verified accuracy and completeness
- [ ] **Backward Compatibility**: Ensured existing configurations still work
- [ ] **Error Handling**: Tested error scenarios and edge cases

## 🎨 Screenshots/GIFs
<!-- If your changes include UI modifications, add screenshots or GIFs -->

### Before
<!-- Screenshot or description of how it looked/worked before -->

### After
<!-- Screenshot or description of how it looks/works after -->

## 🔧 Configuration Changes
<!-- List any configuration files that were modified -->

- [ ] `.github/workflows/` files
- [ ] `.claude/settings.local.json`
- [ ] `.mcp.json`
- [ ] `setup-automation.sh`
- [ ] Environment variables or secrets
- [ ] Documentation files

## ⚠️ Breaking Changes
<!-- If this PR introduces breaking changes, list them here -->

### What breaks:


### Migration path:


### Timeline:


## 🔍 Code Review Focus
<!-- Guide reviewers on what to focus on -->

### Key Areas for Review:
- [ ] **Logic correctness**: Core functionality works as expected
- [ ] **Error handling**: Proper error messages and graceful degradation
- [ ] **Security**: No sensitive data exposed, proper authentication
- [ ] **Performance**: No performance regressions
- [ ] **Code quality**: Follows project coding standards
- [ ] **Documentation**: Changes are properly documented

### Questions for Reviewers:
<!-- Specific questions you'd like reviewers to address -->


## 📊 Performance Impact
<!-- If applicable, describe performance implications -->

- [ ] No performance impact
- [ ] Improves performance
- [ ] Minor performance impact (acceptable)
- [ ] Significant performance impact (needs discussion)

Details:


## 🔒 Security Considerations
<!-- Describe any security implications -->

- [ ] No security impact
- [ ] Improves security
- [ ] Introduces new security considerations (described below)

Details:


## 📚 Documentation Updates
<!-- Check all that apply -->

- [ ] Updated README.md
- [ ] Updated CHANGELOG.md
- [ ] Updated setup guide
- [ ] Updated troubleshooting documentation
- [ ] Updated API documentation
- [ ] Created/updated team training materials

## 🚀 Deployment Notes
<!-- Special deployment considerations -->

### Pre-deployment:
- [ ] Update environment variables
- [ ] Update GitHub repository secrets
- [ ] Update team documentation
- [ ] Notify team of changes

### Post-deployment:
- [ ] Monitor GitHub Actions
- [ ] Verify Jira integration
- [ ] Check Claude Code functionality
- [ ] Update team knowledge base

## ✅ Pre-submission Checklist
<!-- Complete this checklist before submitting -->

### Code Quality:
- [ ] Code follows the project's coding standards
- [ ] Self-reviewed the code changes
- [ ] Added comments for complex logic
- [ ] Removed unnecessary console.log/debug statements
- [ ] No merge conflicts

### Testing:
- [ ] All tests pass locally
- [ ] Added tests for new functionality
- [ ] Tested edge cases and error scenarios
- [ ] Verified no regressions in existing functionality

### Documentation:
- [ ] Updated relevant documentation
- [ ] Added inline code comments where needed
- [ ] Updated CHANGELOG.md if applicable
- [ ] Verified all links work correctly

### Integration:
- [ ] Tested Claude Code integration
- [ ] Verified GitHub Actions workflow
- [ ] Confirmed Jira automation works
- [ ] Checked MCP server connectivity

---

## 💬 Additional Notes
<!-- Any additional information for reviewers -->


---

**🤖 AI Integration Status:**
- [ ] This PR was created with Claude Code assistance
- [ ] AI-generated code has been reviewed and validated
- [ ] All AI suggestions have been implemented thoughtfully

*This PR follows our [development rules](./RULES.md) and [contribution guidelines](./CONTRIBUTING.md).*
# Contributing to Claude-GitHub-Jira Integration

Thank you for your interest in contributing to our Claude-GitHub-Jira integration project! This guide will help you get started with contributing code, documentation, and other improvements.

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher (optional, for frontend development)
- Git
- Access to Claude Code, GitHub, and Jira (for testing)

### Initial Setup
1. **Fork and Clone**:
   ```bash
   git clone https://github.com/your-username/algorithm.git
   cd algorithm
   ```

2. **Run Setup Script**:
   ```bash
   ./setup-automation.sh
   ```

3. **Configure Environment**:
   ```bash
   cp .env.example .env
   # Fill in your actual tokens and URLs
   ```

## 📋 How to Contribute

### Types of Contributions
We welcome various types of contributions:

- 🐛 **Bug fixes**: Fix issues in existing functionality
- ✨ **New features**: Add new capabilities to the integration
- 📚 **Documentation**: Improve guides, tutorials, and API docs
- 🧪 **Testing**: Add or improve test coverage
- 🔧 **Infrastructure**: Improve build, deployment, or dev tools
- 🎨 **UI/UX**: Enhance user interface and experience

### Contribution Workflow

#### 1. Create an Issue (Optional but Recommended)
- Check existing issues to avoid duplicates
- Use our issue templates for consistency
- Discuss your approach before starting large changes

#### 2. Create a Feature Branch
```bash
# For Jira-tracked work
git checkout -b feature/CX-1234

# For other work
git checkout -b feature/descriptive-name
git checkout -b bugfix/fix-authentication
git checkout -b docs/update-setup-guide
```

#### 3. Make Your Changes
- Follow our [coding standards](#coding-standards)
- Write clear, concise commit messages
- Add tests for new functionality
- Update documentation as needed

#### 4. Test Your Changes
```bash
# Run automated tests
npm test                # If applicable
python -m pytest       # If applicable

# Manual testing
./setup-automation.sh   # Test setup script
# Test integration with Claude, GitHub, and Jira
```

#### 5. Submit a Pull Request
- Use our [PR template](/.github/PULL_REQUEST_TEMPLATE.md)
- Link to related issues/tickets
- Provide clear description and test plan
- Request review from maintainers

## 🎯 Coding Standards

### General Guidelines
- **Clarity over cleverness**: Write code that's easy to understand
- **Consistency**: Follow existing patterns and conventions
- **Documentation**: Comment complex logic and public APIs
- **Error handling**: Handle edge cases gracefully
- **Security**: Never commit secrets or sensitive data

### Code Style

#### Shell Scripts
```bash
#!/bin/bash
set -e  # Exit on errors

# Use clear function names
setup_environment() {
    print_step "1" "Setting up environment..."
    # Implementation
}

# Use color coding for output
print_success "✅ Task completed"
print_warning "⚠️  Warning message"
print_error "❌ Error occurred"
```

#### Python (if applicable)
```python
"""Module docstring describing purpose."""

def function_name(param1: str, param2: int) -> bool:
    """
    Clear docstring explaining function purpose.
    
    Args:
        param1: Description of parameter
        param2: Description of parameter
        
    Returns:
        Description of return value
    """
    # Implementation
    return True
```

#### JavaScript/TypeScript (if applicable)
```javascript
/**
 * Clear function documentation
 * @param {string} param1 - Description
 * @param {number} param2 - Description
 * @returns {boolean} Description
 */
function functionName(param1, param2) {
    // Use meaningful variable names
    const isValid = validateInput(param1);
    
    // Handle errors gracefully
    if (!isValid) {
        throw new Error(`Invalid input: ${param1}`);
    }
    
    return true;
}
```

### YAML/Workflow Files
```yaml
name: Descriptive Workflow Name

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  job-name:
    name: Clear Job Description
    runs-on: ubuntu-latest
    
    steps:
      - name: Clear Step Description
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
```

## 🧪 Testing Guidelines

### Types of Tests
1. **Unit Tests**: Test individual functions/components
2. **Integration Tests**: Test component interactions
3. **End-to-End Tests**: Test complete user workflows
4. **Manual Tests**: Human verification of functionality

### Testing Requirements
- All new features must include tests
- Bug fixes should include regression tests
- Tests should be deterministic and fast
- Use meaningful test names and descriptions

### Manual Testing Checklist
- [ ] Setup script works on clean environment
- [ ] Claude Code integration functions correctly
- [ ] GitHub Actions workflow executes successfully
- [ ] Jira integration creates/updates tickets properly
- [ ] Error messages are clear and helpful
- [ ] Documentation is accurate and complete

## 📚 Documentation Standards

### Required Documentation
- **Code Comments**: Explain complex logic and decisions
- **README Updates**: Keep setup and usage instructions current
- **CHANGELOG**: Document all changes with proper versioning
- **API Documentation**: Document all public interfaces

### Documentation Style
- Use clear, concise language
- Include practical examples
- Provide troubleshooting guidance
- Keep content up to date with code changes

### Documentation Structure
```
README.md           # Project overview and quick start
CONTRIBUTING.md     # This file
CHANGELOG.md        # Version history and changes
RULES.md           # Development rules and standards
docs/
  ├── setup/        # Detailed setup guides
  ├── api/          # API documentation
  ├── troubleshooting/ # Problem-solving guides
  └── examples/     # Usage examples and tutorials
```

## 🔍 Review Process

### What Reviewers Look For
1. **Functionality**: Does the code work as intended?
2. **Code Quality**: Is it readable, maintainable, and well-structured?
3. **Testing**: Are there adequate tests with good coverage?
4. **Documentation**: Are changes properly documented?
5. **Security**: No security vulnerabilities or exposed secrets
6. **Performance**: No unnecessary performance degradation

### Review Response
- **Be responsive**: Address feedback promptly
- **Be respectful**: Engage constructively with reviewers
- **Be thorough**: Test your changes after making updates
- **Be patient**: Reviews take time, especially for large changes

## 🐛 Bug Reports

When reporting bugs:
1. **Search first**: Check if the bug has already been reported
2. **Use the template**: Fill out our bug report template completely
3. **Be specific**: Provide exact steps to reproduce
4. **Include context**: Environment details, error messages, logs
5. **Stay engaged**: Respond to follow-up questions

## ✨ Feature Requests

When requesting features:
1. **Check existing requests**: Avoid duplicate requests
2. **Use the template**: Complete our feature request template
3. **Explain the problem**: What pain point does this solve?
4. **Propose solutions**: Share your ideas for implementation
5. **Consider scope**: Start with smaller, focused features

## 🚀 Release Process

### Version Numbering
We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Workflow
1. **Update CHANGELOG.md**: Document all changes
2. **Create release branch**: `release/v1.2.3`
3. **Final testing**: Comprehensive test of all functionality
4. **Create PR**: Review all changes before merge
5. **Tag release**: `git tag v1.2.3`
6. **Update documentation**: Ensure all docs are current

## 🎖️ Recognition

We appreciate all contributions! Contributors are:
- Listed in our CHANGELOG.md
- Credited in release notes
- Mentioned in project documentation
- Invited to join our contributor community

## 📞 Getting Help

### Where to Get Support
- **GitHub Discussions**: General questions and ideas
- **GitHub Issues**: Bug reports and feature requests
- **Pull Request Comments**: Code-specific questions
- **Documentation**: Check existing guides first

### Response Time Expectations
- **Bug reports**: Within 48 hours
- **Feature requests**: Within 1 week
- **Pull requests**: Within 1 week
- **Security issues**: Within 24 hours

### Community Guidelines
- **Be respectful**: Treat everyone with kindness and respect
- **Be inclusive**: Welcome contributors of all backgrounds
- **Be patient**: Everyone is learning and growing
- **Be constructive**: Provide helpful feedback and suggestions

## 📜 Legal

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

### Contributor License Agreement
- You own the rights to your contributions
- You grant the project rights to use your contributions
- Your contributions don't violate any third-party rights
- You're not including any proprietary or confidential information

---

## 🙏 Thank You!

Your contributions make this project better for everyone. Whether you're fixing a typo, adding a feature, or improving documentation, every contribution is valuable and appreciated.

Happy coding! 🚀

---

*Last updated: 2025-01-26*  
*For questions about this guide, please open an issue or discussion.*
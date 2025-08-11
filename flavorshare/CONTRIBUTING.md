# Contributing to FlavorShare

Thank you for your interest in contributing to FlavorShare! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **Bug Reports** - Help us identify and fix issues
- **Feature Requests** - Suggest new features or improvements
- **Code Contributions** - Submit pull requests with code changes
- **Documentation** - Improve or add documentation
- **Testing** - Help test the application and report issues
- **Design** - Suggest UI/UX improvements

### Before You Start

1. **Check existing issues** - Your idea might already be discussed
2. **Read the documentation** - Understand how the project works
3. **Set up your development environment** - Follow the setup instructions in README.md

## 🚀 Development Setup

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Local Development

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/yourusername/flavorshare.git
   cd flavorshare
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../client
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cd ../backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd client
   npm start
   ```

## 📝 Making Changes

### Code Style Guidelines

#### JavaScript/Node.js
- Use **ES6+** features when possible
- Follow **Airbnb JavaScript Style Guide**
- Use **2 spaces** for indentation
- Use **single quotes** for strings
- Use **const** and **let** instead of **var**
- Use **arrow functions** when appropriate

#### React
- Use **functional components** with hooks
- Use **PascalCase** for component names
- Use **camelCase** for variables and functions
- Keep components **small and focused**
- Use **destructuring** for props

#### CSS/TailwindCSS
- Use **TailwindCSS utility classes** when possible
- Follow **BEM methodology** for custom CSS
- Use **semantic class names**
- Keep styles **mobile-first**

### File Naming Conventions

- **Components**: PascalCase (e.g., `RecipeCard.jsx`)
- **Pages**: PascalCase (e.g., `Home.jsx`)
- **Utilities**: camelCase (e.g., `api.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.js`)

### Commit Message Format

Use conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

**Examples:**
```
feat(auth): add JWT token refresh functionality
fix(recipes): resolve image upload issue on mobile
docs(readme): update installation instructions
style(components): format code according to style guide
```

## 🔧 Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

### 2. Make Your Changes

- Write clean, readable code
- Add comments for complex logic
- Follow the existing code patterns
- Keep commits small and focused

### 3. Test Your Changes

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd client
npm test

# Run tests in watch mode
npm test -- --watch
```

### 4. Update Documentation

- Update README.md if needed
- Add JSDoc comments for new functions
- Update API documentation if endpoints change

### 5. Commit Your Changes

```bash
git add .
git commit -m "feat(auth): add password reset functionality"
```

### 6. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] Code follows the style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] No console.log statements
- [ ] No sensitive information in code
- [ ] Branch is up to date with main

### Pull Request Template

Use this template when creating a PR:

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Testing
- [ ] Backend tests pass
- [ ] Frontend tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing (if applicable)

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have made corresponding changes to documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective
- [ ] New and existing tests pass locally

## Additional Notes
Any additional information or context
```

## 🧪 Testing Guidelines

### Backend Testing

- Write tests for all new endpoints
- Test both success and error cases
- Mock external dependencies
- Use descriptive test names

```javascript
describe('POST /api/recipes', () => {
  it('should create a new recipe with valid data', async () => {
    // Test implementation
  });

  it('should return 400 for invalid recipe data', async () => {
    // Test implementation
  });
});
```

### Frontend Testing

- Test component rendering
- Test user interactions
- Test form submissions
- Test error handling

```javascript
describe('RecipeCard Component', () => {
  it('renders recipe information correctly', () => {
    // Test implementation
  });

  it('handles like button click', () => {
    // Test implementation
  });
});
```

## 🐛 Bug Reports

### Before Reporting

1. **Check existing issues** - The bug might already be reported
2. **Reproduce the issue** - Make sure it's reproducible
3. **Check the documentation** - The solution might be documented

### Bug Report Template

```markdown
## Bug Description
Clear and concise description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: [e.g., Windows 10, macOS 12.0]
- Browser: [e.g., Chrome 96, Firefox 95]
- Node.js version: [e.g., 18.0.0]
- npm version: [e.g., 8.0.0]

## Additional Context
Any other context about the problem
```

## 💡 Feature Requests

### Before Requesting

1. **Check existing issues** - The feature might already be requested
2. **Think about implementation** - Consider how it would work
3. **Consider impact** - How would it affect existing users?

### Feature Request Template

```markdown
## Feature Description
Clear and concise description of the feature

## Problem Statement
What problem does this feature solve?

## Proposed Solution
How would you like to see this implemented?

## Alternative Solutions
Any alternative solutions you've considered?

## Additional Context
Any other context or screenshots
```

## 📚 Documentation

### Code Documentation

- Use **JSDoc** for functions and classes
- Write **clear and concise** comments
- Explain **why**, not just **what**
- Keep comments **up to date**

```javascript
/**
 * Creates a new recipe in the database
 * @param {Object} recipeData - The recipe data to create
 * @param {string} recipeData.title - Recipe title
 * @param {string} recipeData.description - Recipe description
 * @param {Array} recipeData.ingredients - List of ingredients
 * @returns {Promise<Object>} The created recipe
 * @throws {Error} If recipe data is invalid
 */
async function createRecipe(recipeData) {
  // Implementation
}
```

### README Updates

- Keep installation instructions **current**
- Update **screenshots** when UI changes
- Add **examples** for new features
- Include **troubleshooting** sections

## 🔒 Security

### Security Guidelines

- **Never commit sensitive information** (API keys, passwords, etc.)
- **Use environment variables** for configuration
- **Validate all user inputs**
- **Sanitize data** before database operations
- **Use HTTPS** in production
- **Follow OWASP guidelines**

### Reporting Security Issues

If you find a security vulnerability:

1. **DO NOT** create a public issue
2. **Email** the maintainers directly
3. **Wait** for a response before disclosing publicly
4. **Follow responsible disclosure** practices

## 🎯 Getting Help

### Questions and Support

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and general discussion
- **Code Review** - Ask questions in pull request comments

### Resources

- [React Documentation](https://reactjs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## 🙏 Recognition

Contributors will be recognized in:

- **README.md** - Contributors section
- **Release notes** - For significant contributions
- **GitHub contributors** - Automatic recognition

## 📄 License

By contributing to FlavorShare, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to FlavorShare! 🍳✨**

Your contributions help make this project better for everyone in the cooking community.

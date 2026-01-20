# Contributing to storybook-storyblok-addon

Thank you for your interest in contributing to storybook-storyblok-addon! This document provides guidelines and instructions for contributing.

## Code of Conduct

This project adheres to a [Code of Conduct](../CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (code snippets, screenshots, etc.)
- **Describe the behavior you observed and what you expected**
- **Include your environment details** (OS, Node version, Storybook version, browser)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **Include examples of how the feature would be used**

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Write clear commit messages**
6. **Submit a pull request**

## Development Setup

### Prerequisites

- Node.js >= 16.0.0
- npm or yarn

### Setting Up Your Development Environment

```bash
# Clone your fork
git clone https://github.com/mazemax/storybook-storyblok-addon.git
cd storybook-storyblok-addon

# Install dependencies
npm install

# Build the addon
npm run build

# Start development mode (watch for changes)
npm run dev

# Run type checking
npm run type-check
```

### Testing Your Changes

To test the addon locally in a Storybook project:

```bash
# In the addon directory
npm link

# In your Storybook project directory
npm link storybook-storyblok-addon

# Add the addon to your .storybook/main.js
# Then start your Storybook
npm run storybook
```

### Project Structure

```
storybook-storyblok-addon/
├── src/
│   ├── index.ts              # Addon registration
│   ├── Tool.tsx              # Toolbar button component
│   ├── Panel.tsx             # Panel UI component
│   ├── preset.ts             # Storybook preset
│   ├── bookmarklet.ts        # Bookmarklet code
│   └── utils/                # Utility functions
│       ├── clipboard.ts
│       ├── extractMetadata.ts
│       ├── fieldMapper.ts
│       ├── generateBlockInstance.ts
│       └── generateStoryblokJSON.ts
├── examples/                 # Example components
├── docs/                     # Documentation
└── dist/                     # Build output
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Follow existing code style and conventions
- Provide proper type annotations
- Avoid using `any` when possible

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons at the end of statements
- Keep lines under 100 characters when possible
- Use meaningful variable and function names

### Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add support for custom field mappings
fix: resolve clipboard permission issue in Firefox
docs: update installation instructions
```

## Documentation

- Update the README.md if you change functionality
- Add JSDoc comments to functions and classes
- Update the CHANGELOG.md following [Keep a Changelog](https://keepachangelog.com/) format
- Include examples for new features

## Release Process

Releases are managed by maintainers. The process includes:

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create a git tag
4. Publish to npm
5. Create a GitHub release

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

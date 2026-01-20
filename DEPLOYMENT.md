# Deployment Guide

This guide explains how to deploy the storybook-storyblok-addon package to npm and manage releases.

## Prerequisites

Before you begin, ensure you have:

1. **npm account**: Sign up at [npmjs.com](https://www.npmjs.com/) if you don't have one
2. **GitHub repository access**: Push access to `https://github.com/mazemax/storybook-storyblok-addon`
3. **npm authentication**: Logged in locally with `npm login`

## Initial Setup

### 1. Push to GitHub

Push your code to the GitHub repository:

```bash
# Make sure you're on the main branch
git branch --show-current

# Push to GitHub (first time)
git push -u origin main
```

### 2. Set Up npm Token for GitHub Actions

To enable automated publishing, you need to add your npm token to GitHub Secrets:

#### Generate npm Token

1. Go to [npmjs.com](https://www.npmjs.com/)
2. Click on your profile picture → **Access Tokens**
3. Click **Generate New Token** → **Automation**
4. Give it a name (e.g., "GitHub Actions - storybook-storyblok-addon")
5. Copy the generated token

#### Add Token to GitHub

1. Go to your repository: `https://github.com/mazemax/storybook-storyblok-addon`
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click **Add secret**

## Publishing a New Version

### Method 1: Automated Release (Recommended)

This method uses GitHub Releases to trigger automated publishing.

#### Step 1: Update Version and Changelog

```bash
# Bump version (choose one)
npm version patch  # 1.0.0 → 1.0.1 (bug fixes)
npm version minor  # 1.0.0 → 1.1.0 (new features)
npm version major  # 1.0.0 → 2.0.0 (breaking changes)

# This command:
# - Updates version in package.json
# - Creates a git tag
# - Commits the change
```

#### Step 2: Update CHANGELOG.md

Add your changes to `CHANGELOG.md`:

```markdown
## [1.0.1] - 2026-01-20

### Fixed
- Fixed clipboard permission issue in Firefox
- Resolved bookmarklet compatibility with Safari

### Changed
- Updated dependencies to latest versions

[1.0.1]: https://github.com/mazemax/storybook-storyblok-addon/releases/tag/v1.0.1
```

#### Step 3: Commit and Push

```bash
# Commit the changelog
git add CHANGELOG.md
git commit -m "docs: update changelog for v1.0.1"

# Push commits and tags
git push && git push --tags
```

#### Step 4: Create GitHub Release

1. Go to: `https://github.com/mazemax/storybook-storyblok-addon/releases`
2. Click **Draft a new release**
3. **Choose a tag**: Select the tag you just pushed (e.g., `v1.0.1`)
4. **Release title**: Same as tag (e.g., `v1.0.1`)
5. **Description**: Copy from CHANGELOG.md
6. Click **Publish release**

The GitHub Action will automatically:
- Build the package
- Run type checks
- Publish to npm with provenance

#### Step 5: Verify Publication

1. Check the **Actions** tab on GitHub for the workflow status
2. Verify on npm: `https://www.npmjs.com/package/storybook-storyblok-addon`
3. Test installation: `npm install storybook-storyblok-addon@latest`

### Method 2: Manual Publishing

If you prefer to publish manually:

```bash
# 1. Ensure you're logged in to npm
npm whoami

# If not logged in:
npm login

# 2. Update version
npm version patch  # or minor/major

# 3. Build the package
npm run build

# 4. Run checks
npm run type-check

# 5. Publish
npm publish --access public

# 6. Push to GitHub
git push && git push --tags
```

## Pre-release Versions

To publish beta or alpha versions:

```bash
# Create a pre-release version
npm version prerelease --preid=beta  # 1.0.0 → 1.0.1-beta.0

# Publish with beta tag
npm publish --tag beta --access public

# Users can install with:
npm install storybook-storyblok-addon@beta
```

## Versioning Guidelines

Follow [Semantic Versioning](https://semver.org/):

- **Patch (1.0.x)**: Bug fixes, documentation updates, internal refactoring
- **Minor (1.x.0)**: New features, non-breaking changes
- **Major (x.0.0)**: Breaking changes, major API changes

### Examples

```bash
# Bug fix: Fixed clipboard issue
npm version patch  # 1.0.0 → 1.0.1

# New feature: Added dark mode support
npm version minor  # 1.0.1 → 1.1.0

# Breaking change: Changed API interface
npm version major  # 1.1.0 → 2.0.0
```

## Rollback

If you need to rollback a published version:

```bash
# Deprecate the problematic version
npm deprecate storybook-storyblok-addon@1.0.1 "This version has a critical bug. Please use 1.0.2 instead."

# Publish a fixed version
npm version patch
npm publish --access public
```

## Troubleshooting

### "You do not have permission to publish"

- Ensure you're logged in: `npm whoami`
- Check your npm account has permission for the package
- Use `npm login` to authenticate

### "You cannot publish over the previously published version"

- The version already exists on npm
- Bump the version: `npm version patch`
- Try publishing again

### GitHub Action fails with "403 Forbidden"

- Check that `NPM_TOKEN` secret is set correctly
- Ensure the token hasn't expired
- Verify the token has "Automation" permission

### Build fails

```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### Type check fails

```bash
# Fix type errors first
npm run type-check

# Then build
npm run build
```

## Monitoring

### Check Package Status

```bash
# View package info
npm view storybook-storyblok-addon

# Check downloads
npm view storybook-storyblok-addon downloads
```

### GitHub Insights

Monitor your package at:
- Issues: `https://github.com/mazemax/storybook-storyblok-addon/issues`
- Pull Requests: `https://github.com/mazemax/storybook-storyblok-addon/pulls`
- Releases: `https://github.com/mazemax/storybook-storyblok-addon/releases`
- Actions: `https://github.com/mazemax/storybook-storyblok-addon/actions`

## Security

### Package Provenance

The automated workflow publishes with `--provenance` flag, which:
- Links the package to the source code
- Verifies the build came from GitHub Actions
- Increases trust and security

### Two-Factor Authentication

Enable 2FA on your npm account:
1. Go to [npmjs.com](https://www.npmjs.com/)
2. Profile → **Account**
3. Enable **Two-Factor Authentication**

## Best Practices

1. **Always test before publishing**
   ```bash
   npm ci
   npm run build
   npm run type-check
   ```

2. **Keep CHANGELOG.md updated** with every release

3. **Use semantic versioning** consistently

4. **Test in a real project** before publishing

5. **Document breaking changes** clearly in CHANGELOG and README

6. **Tag releases** on GitHub for better tracking

7. **Monitor GitHub Actions** after creating releases

## Need Help?

- GitHub Issues: `https://github.com/mazemax/storybook-storyblok-addon/issues`
- npm Documentation: [docs.npmjs.com](https://docs.npmjs.com/)
- GitHub Actions Docs: [docs.github.com/actions](https://docs.github.com/actions)

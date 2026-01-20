# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated CI/CD.

## Workflows

### CI Workflow (`ci.yml`)

Runs on every push to `main`/`master` branches and on pull requests.

**What it does:**
- Tests the package on Node.js versions 16, 18, and 20
- Installs dependencies
- Builds the package
- Runs type checking

### Publish Workflow (`publish.yml`)

Automatically publishes the package to npm when a new release is created on GitHub.

**What it does:**
- Builds the package
- Runs type checks
- Publishes to npm with provenance

## Setup Instructions

### 1. Create an NPM Token

1. Log in to [npmjs.com](https://www.npmjs.com/)
2. Click on your profile → Access Tokens
3. Generate a new **Automation** token
4. Copy the token

### 2. Add NPM Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click **Add secret**

### 3. Publishing a New Version

To publish a new version:

1. **Update version in package.json**
   ```bash
   npm version patch  # for bug fixes
   npm version minor  # for new features
   npm version major  # for breaking changes
   ```

2. **Update CHANGELOG.md** with the changes

3. **Commit and push**
   ```bash
   git add package.json CHANGELOG.md
   git commit -m "chore: bump version to x.x.x"
   git push
   ```

4. **Create a GitHub Release**
   - Go to your repository on GitHub
   - Click **Releases** → **Create a new release**
   - Choose a tag (e.g., `v1.0.1`)
   - Title: `v1.0.1` (or your version)
   - Description: Copy from CHANGELOG.md
   - Click **Publish release**

5. **Automated Publishing**
   - The `publish.yml` workflow will automatically trigger
   - It will build and publish the package to npm
   - Check the Actions tab to monitor progress

## Troubleshooting

### Publish fails with "403 Forbidden"

- Verify your NPM_TOKEN is correct and hasn't expired
- Ensure the token has "Automation" permission
- Check that the package name is available on npm

### Build fails in CI

- Ensure all dependencies are listed in package.json
- Test locally: `npm ci && npm run build && npm run type-check`
- Check the Actions tab for detailed error logs

### Version already published

- You cannot republish the same version
- Bump the version in package.json and create a new release

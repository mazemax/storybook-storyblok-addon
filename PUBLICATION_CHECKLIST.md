# Publication Checklist for storybook-storyblok-addon

This checklist will guide you through the final steps to publish your package to npm.

## ✅ Completed Steps

- [x] Package renamed from `@mindvalley/storybook-storyblok-addon` to `storybook-storyblok-addon`
- [x] All documentation updated with new package name
- [x] Documentation reorganized into `docs/` folder
- [x] LICENSE file created (MIT)
- [x] CHANGELOG.md created with v1.0.0 release notes
- [x] CODE_OF_CONDUCT.md added
- [x] CONTRIBUTING.md added
- [x] README.md enhanced with badges and links
- [x] package.json metadata updated (author, repository, keywords, engines)
- [x] Build scripts added (prepublishOnly)
- [x] .npmignore created to exclude unnecessary files
- [x] Examples reviewed (no private references)
- [x] Package built successfully
- [x] Type checking passed

## 📋 Pre-Publication Steps (Manual)

### 1. Update Repository URLs

**IMPORTANT**: Before publishing, update these placeholder URLs in the following files:

#### package.json
```json
"repository": {
  "url": "https://github.com/yourusername/storybook-storyblok-addon"
},
"bugs": {
  "url": "https://github.com/yourusername/storybook-storyblok-addon/issues"
},
"homepage": "https://github.com/yourusername/storybook-storyblok-addon#readme"
```

#### README.md
- Line 287: Update support URL
- Badge URLs will auto-update after npm publication

#### CHANGELOG.md
- Line 29: Update release URL

#### docs/CONTRIBUTING.md
- Line 35: Update clone URL

Replace `yourusername` with your actual GitHub username.

### 2. Create GitHub Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "chore: prepare v1.0.0 for publication"

# Create repository on GitHub, then:
git remote add origin https://github.com/yourusername/storybook-storyblok-addon.git
git branch -M main
git push -u origin main
```

### 3. Verify Package Contents

```bash
# See what will be published
npm pack --dry-run

# This should include:
# - dist/ folder (built files)
# - README.md
# - LICENSE
# - package.json
# - CHANGELOG.md
```

### 4. Test Package Locally

```bash
# In this directory
npm link

# In a test Storybook project
npm link storybook-storyblok-addon

# Add to .storybook/main.js:
# addons: ['storybook-storyblok-addon']

# Test the functionality:
# - Toolbar button appears
# - Panel displays correctly
# - Copy functionality works
# - Bookmarklet works in Storyblok
```

### 5. NPM Account Setup

```bash
# Login to npm (create account at npmjs.com if needed)
npm login

# Verify you're logged in
npm whoami

# Enable 2FA (recommended)
# Go to: https://www.npmjs.com/settings/[username]/tfa
```

### 6. Check Package Name Availability

```bash
# Verify the package name is available
npm view storybook-storyblok-addon

# If it shows "npm ERR! 404", the name is available
# If it shows package info, the name is taken - choose a different name
```

### 7. Final Verification

- [ ] All tests pass (if you have tests)
- [ ] Build succeeds: `npm run build`
- [ ] Type check passes: `npm run type-check`
- [ ] No sensitive data in code
- [ ] All URLs updated from placeholders
- [ ] README is clear and accurate
- [ ] Examples work correctly
- [ ] Version is set to 1.0.0 in package.json

## 🚀 Publication Steps

### 1. Dry Run

```bash
# See what would be published without actually publishing
npm publish --dry-run

# Review the output carefully
```

### 2. Publish to NPM

```bash
# Publish the package
npm publish

# If you get a 2FA prompt, enter your code
```

### 3. Verify Publication

```bash
# Check that the package is live
npm view storybook-storyblok-addon

# Try installing it
npm install storybook-storyblok-addon
```

### 4. Create Git Tag

```bash
# Tag the release
git tag v1.0.0
git push --tags
```

### 5. Create GitHub Release

1. Go to: https://github.com/yourusername/storybook-storyblok-addon/releases/new
2. Select tag: v1.0.0
3. Title: "v1.0.0 - Initial Release"
4. Description: Copy from CHANGELOG.md
5. Publish release

## 📢 Post-Publication

### 1. Verify Package Works

```bash
# In a fresh directory
mkdir test-install
cd test-install
npm init -y
npm install storybook-storyblok-addon

# Verify the package installed correctly
ls node_modules/storybook-storyblok-addon
```

### 2. Update README Badges

The npm version badge should now work automatically:
- https://badge.fury.io/js/storybook-storyblok-addon.svg

### 3. Share the Release

Consider sharing on:
- Storybook Discord/Community
- Storyblok Community
- Twitter/X
- Dev.to or Medium (write a blog post)
- Reddit (r/javascript, r/webdev)

### 4. Monitor Issues

- Watch your GitHub repository for issues
- Respond to questions promptly
- Consider setting up GitHub Discussions

## 🔄 Future Updates

When you need to publish updates:

```bash
# Update version (patch/minor/major)
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# This automatically:
# - Updates package.json version
# - Creates a git commit
# - Creates a git tag

# Update CHANGELOG.md with changes

# Publish
npm publish

# Push changes and tags
git push && git push --tags
```

## 📝 Notes

- **Package Name**: If `storybook-storyblok-addon` is taken, consider alternatives:
  - `storyblok-storybook-addon`
  - `sb-storyblok-addon`
  - `storybook-storyblok-bridge`
  
- **Storybook Version**: Currently targets Storybook 6.5.16. Consider testing with Storybook 7.x/8.x and updating compatibility in README.

- **Browser Testing**: Test the bookmarklet in:
  - Chrome/Edge (latest)
  - Firefox (latest)
  - Safari (latest)

- **Documentation**: Consider adding:
  - GIFs/screenshots to README
  - Video tutorial
  - Live demo site

## 🆘 Troubleshooting

### "Package name too similar to existing package"
- Choose a different name
- Update all references in code and docs

### "You do not have permission to publish"
- Ensure you're logged in: `npm whoami`
- Check package name isn't taken
- Verify npm account email is confirmed

### "prepublishOnly script failed"
- Fix build errors
- Fix type errors
- Ensure all dependencies are installed

### Package published but not showing on npm
- Wait a few minutes (can take up to 5 minutes)
- Clear npm cache: `npm cache clean --force`
- Check: https://www.npmjs.com/package/storybook-storyblok-addon

## ✨ Success!

Once published, your package will be available at:
- npm: https://www.npmjs.com/package/storybook-storyblok-addon
- GitHub: https://github.com/yourusername/storybook-storyblok-addon
- Install: `npm install storybook-storyblok-addon`

Congratulations on your open source contribution! 🎉

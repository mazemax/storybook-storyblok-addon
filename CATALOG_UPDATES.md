# Storybook Addon Catalog Integration Updates

## Summary

This document outlines the changes made to `storybook-storyblok-addon` to meet the requirements for listing in the official Storybook Addon Catalog (https://storybook.js.org/addons).

## Changes Made

### 1. Package Version Update
- **Updated**: `version` from `1.0.1` to `1.0.2`
- **Reason**: New release needed to publish updated metadata to npm

### 2. Keywords Enhancement
- **Added**: `storybook-addons` (plural) to keywords array
- **Added**: `integration` keyword
- **Reason**: The Storybook catalog crawler specifically looks for the `storybook-addons` keyword (plural) to identify eligible addons

**Before:**
```json
"keywords": [
  "storybook-addon",
  "storybook",
  "storyblok",
  "cms",
  "component",
  "design-system",
  "visual-editor",
  "blocks"
]
```

**After:**
```json
"keywords": [
  "storybook-addons",
  "storybook-addon",
  "storybook",
  "storyblok",
  "cms",
  "component",
  "design-system",
  "visual-editor",
  "blocks",
  "integration"
]
```

### 3. Storybook Metadata Enhancements

#### a. Framework Support Specification
- **Updated**: `supportedFrameworks` from `["vue"]` to `["vue3"]`
- **Added**: `unsupportedFrameworks` array listing all non-supported frameworks
- **Reason**: The catalog requires explicit declaration of which frameworks are NOT supported

**Added frameworks to unsupportedFrameworks:**
- react
- angular
- web-components
- ember
- html
- svelte
- preact
- qwik
- solid

#### b. Category Tags
- **Added**: `tags` array with categorization tags
- **Tags**: `["cms", "integration", "export"]`
- **Reason**: Helps catalog properly categorize and filter the addon

**Complete storybook metadata section:**
```json
"storybook": {
  "displayName": "Storyblok",
  "icon": "https://raw.githubusercontent.com/mazemax/storybook-storyblok-addon/main/docs/storyblok-storybook.png",
  "supportedFrameworks": [
    "vue3"
  ],
  "unsupportedFrameworks": [
    "react",
    "angular",
    "web-components",
    "ember",
    "html",
    "svelte",
    "preact",
    "qwik",
    "solid"
  ],
  "tags": [
    "cms",
    "integration",
    "export"
  ]
}
```

## Why These Changes Matter

### 1. Discovery by Catalog Crawler
The Storybook catalog uses automated crawlers that scan npm packages for specific metadata:
- `storybook-addons` keyword (plural) is the primary discovery mechanism
- Without this keyword, packages are not indexed by the catalog

### 2. Proper Categorization
- The `tags` array helps users find your addon when filtering by category
- Common tag categories include: testing, styling, data, integrate, essentials, etc.

### 3. Framework Compatibility
- `unsupportedFrameworks` prevents users from attempting to use the addon with incompatible frameworks
- Improves user experience by setting clear expectations

### 4. Catalog Requirements Checklist

Based on Storybook's integration catalog documentation, here's what's required:

- [x] Published on npm
- [x] Contains `storybook-addons` keyword
- [x] Has `storybook` metadata object in package.json
- [x] Includes `displayName` in storybook metadata
- [x] Includes `icon` URL in storybook metadata
- [x] Specifies `supportedFrameworks` array
- [x] Specifies `unsupportedFrameworks` array
- [x] Includes descriptive `tags` array
- [x] Has valid `repository` URL
- [x] Has README.md with usage instructions
- [x] Has MIT or compatible license

## Next Steps

### 1. Publish to npm
```bash
npm publish
```

### 2. Wait for Catalog Indexing
- The Storybook catalog crawler runs periodically (typically every 24-48 hours)
- After publishing the updated package, it may take 1-2 days for the addon to appear
- The crawler checks npm for packages with the `storybook-addons` keyword

### 3. Verify Listing
- Check https://storybook.js.org/addons after 24-48 hours
- Search for "storyblok" or "storybook-storyblok-addon"
- Your addon should appear with the icon, description, and framework tags

### 4. Monitor npm Stats
- npm downloads: https://www.npmjs.com/package/storybook-storyblok-addon
- GitHub stars and issues
- Community feedback

## Troubleshooting

### If the addon doesn't appear after 48 hours:

1. **Verify npm publication**
   - Check that version 1.0.2 is live on npm
   - Confirm all metadata is visible in the npm package page

2. **Validate package.json**
   - Ensure no JSON syntax errors
   - Verify all URLs are accessible (icon, repository)

3. **Check crawler logs**
   - The Storybook team may have public logs or status pages
   - Consider reaching out to Storybook community/Discord

4. **Review icon URL**
   - Ensure the icon URL is publicly accessible
   - Recommended format: PNG, 128x128px or larger
   - Current URL: https://raw.githubusercontent.com/mazemax/storybook-storyblok-addon/main/docs/storyblok-storybook.png

## Additional Recommendations

### Consider Adding:
1. **Screenshots in README** - Visual examples help users understand the addon
2. **Video Demo** - Short GIF or video showing the workflow
3. **Compatibility Notes** - Storybook version compatibility (currently 6.5.16)
4. **Migration Guide** - If you support multiple Storybook versions

### Future Enhancements:
1. **Support for More Frameworks** - Consider adding React, Angular support
2. **Storybook 7.x/8.x Compatibility** - Update dependencies for latest Storybook
3. **TypeScript Improvements** - Enhanced type definitions
4. **Testing** - Add automated tests for catalog CI/CD

## References

- Storybook Addon Catalog: https://storybook.js.org/addons
- Integration Documentation: https://storybook.js.org/docs/addons/integration-catalog
- npm Package: https://www.npmjs.com/package/storybook-storyblok-addon
- GitHub Repository: https://github.com/mazemax/storybook-storyblok-addon

## Changelog Entry

Add this to CHANGELOG.md:

```markdown
## [1.0.2] - 2026-01-22

### Changed
- Added `storybook-addons` keyword for Storybook catalog discovery
- Updated `supportedFrameworks` to specify `vue3` instead of `vue`
- Added `unsupportedFrameworks` array to clarify framework compatibility
- Added `tags` array for better categorization in Storybook catalog
- Added `integration` keyword

### Fixed
- Metadata updates to meet Storybook Addon Catalog requirements
```

---

**Document Created**: January 22, 2026
**Author**: Max Saad
**Package Version**: 1.0.2

/**
 * Storybook preset for storybook-storyblok-addon
 *
 * This preset automatically registers the addon's manager entry when installed.
 */

const path = require('path')

// Reference the built manager entry file using __dirname
// Since this preset is in dist/preset.js, the manager entry is in dist/index.js
export const managerEntries = (entry: string[] = []) => {
  // __dirname will point to the dist folder when this file is executed
  // So we can directly reference index.js in the same directory
  const managerEntry = path.join(__dirname, 'index.js')
  return [...entry, managerEntry]
}

/**
 * Storybook preset for storybook-storyblok-addon
 *
 * This preset automatically registers the addon's manager entry when installed.
 */

// Reference the built manager entry file
// When bundled, this will resolve to the correct path in the dist directory
export const managerEntries = () => {
  return ['storybook-storyblok-addon/dist/index.js']
}

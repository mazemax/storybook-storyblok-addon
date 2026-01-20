/**
 * Storybook preset for storybook-storyblok-addon
 *
 * This preset automatically registers the addon's manager entry when installed.
 */

export const managerEntries = [require.resolve('./index')]

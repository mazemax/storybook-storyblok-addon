/**
 * Manager registration for storybook-storyblok-addon
 *
 * Registers both the toolbar button and panel with Storybook
 */

import React from 'react'
import { addons, types } from '@storybook/addons'
import { Tool } from './Tool'
import { Panel } from './Panel'

const ADDON_ID = 'storybook-storyblok'
const TOOL_ID = `${ADDON_ID}/tool`
const PANEL_ID = `${ADDON_ID}/panel`

// Register addon
addons.register(ADDON_ID, () => {
  // Register toolbar button
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Copy to Storyblok',
    match: ({ viewMode }) => viewMode === 'story',
    render: () => React.createElement(Tool, {}),
  })

  // Register panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Storyblok',
    render: ({ active = false }) => React.createElement(Panel, { active }),
  })
})

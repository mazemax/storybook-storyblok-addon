# Testing Plan: Storybook Storyblok Addon

## Overview

This document outlines the steps to test the `storybook-storyblok-addon` with a Storybook project.

The addon allows copying component blocks from Storybook and pasting them into Storyblok's visual editor.

---

## Prerequisites

### 1. Environment Setup
- [ ] Node.js 16+ installed
- [ ] npm or yarn package manager
- [ ] A project with Storybook installed
- [ ] Access to a Storyblok space with existing components

### 2. Build the Addon
```bash
cd /path/to/storybook-storyblok-addon
npm install
npm run build
```

**Expected Output**: `dist/` folder with compiled files (index.js, index.mjs, preset.js, etc.)

---

## Phase 1: Link the Addon Locally

### Step 1: Create NPM Link
```bash
# In the addon directory
cd /path/to/storybook-storyblok-addon
npm link
```

### Step 2: Link to Your Project
```bash
# In your Storybook project directory
cd /path/to/your-project
npm link storybook-storyblok-addon
```

**Verification**:
```bash
ls -la node_modules/storybook-storyblok-addon
# Should show a symlink to your addon directory
```

---

## Phase 2: Configure Storybook

### Step 3: Update Storybook Configuration

**File**: `.storybook/main.js` or `.storybook/main.ts`

```javascript
module.exports = {
  addons: [
    '@storybook/addon-essentials',
    'storybook-storyblok-addon',
  ],
}
```

---

## Phase 3: Install the Bookmarklet

### Step 4: Get the Bookmarklet

1. Start Storybook: `npm run storybook`
2. Navigate to any component story
3. Open the **"Storyblok"** panel (bottom tabs)
4. Find the **"Paste to Storyblok"** button
5. **Drag** it to your browser's bookmarks bar

**Note**: The bookmarklet is required to transfer clipboard data to Storyblok's internal clipboard.

---

## Phase 4: Run and Test

### Step 5: Start Storybook
```bash
npm run storybook
```

**Expected Result**: Storybook starts on `http://localhost:6006`

### Step 6: Verify Addon Installation

**Visual Checks**:
- [ ] 📋 Copy icon appears in the toolbar
- [ ] "Storyblok" panel appears in the addons panel (bottom tabs)
- [ ] No console errors in browser DevTools

**If addon doesn't appear**:
```bash
# Clear Storybook cache
npm run storybook -- --no-manager-cache
```

---

## Phase 5: Test the Copy & Paste Workflow

### Step 7: Test Copy from Storybook

For a test component (e.g., `BaseButton`):

1. [ ] Navigate to the story in Storybook
2. [ ] Click the toolbar copy button (📋)
3. [ ] Verify success notification (checkmark icon appears briefly)
4. [ ] Paste clipboard content into a text editor to verify JSON

**Expected JSON Format** (block instance array):
```json
[
  {
    "id": "",
    "_uid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "component": "BaseButton",
    "label": "Get Started",
    "url": "#",
    "classes": "mv-btn--primary"
  }
]
```

**Key Fields**:
- `id`: Empty string (Storyblok fills this)
- `_uid`: Unique UUID (auto-generated)
- `component`: Component name (must match Storyblok Block Library)
- `...props`: Props from the story's `args`

### Step 8: Test Paste to Storyblok

1. [ ] Go to Storyblok editor page
2. [ ] Click the **bookmarklet** in your bookmarks bar
3. [ ] See success message: "✅ 1 block(s) ready to paste!"
4. [ ] Click on a "bloks" field (Body, Header, or Footer)
5. [ ] Select **"Paste Block"** option
6. [ ] Verify the block appears with correct data

**Troubleshooting**:
- If "Paste Block" doesn't appear, click a different field then click back
- If you get "component not found", the component doesn't exist in your Storyblok space

### Step 9: Test Panel UI

1. [ ] Open the "Storyblok" panel in Storybook
2. [ ] Verify component overview displays correctly
3. [ ] Check props/fields table shows all properties
4. [ ] Verify JSON preview is syntax-highlighted
5. [ ] Test "Copy to Clipboard" button in panel
6. [ ] Verify the bookmarklet instructions are visible

---

## Phase 6: Test Different Components

### Step 10: Test Multiple Component Types

Test with various component types to ensure proper field handling:

| Component Type | Test Aspects |
|----------------|--------------|
| Button | Simple text/string props |
| Card | Image URLs, nested content |
| Form Input | Boolean props, number props |
| Section | Complex nested bloks |

For each component:
- [ ] Copy from Storybook
- [ ] Run bookmarklet in Storyblok
- [ ] Paste block
- [ ] Verify all fields populated correctly

---

## Phase 7: Test Component Name Mapping

### Step 11: Test Default Component Names

The addon preserves component names as PascalCase:

| Story Component | Expected Storyblok Name |
|-----------------|-------------------------|
| `BaseButton` | `BaseButton` |
| `HeroSection` | `HeroSection` |
| `MyComponent` | `MyComponent` |

### Step 12: Test Custom Block Names

Add `storyblok.blockName` parameter to override:

```javascript
export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    storyblok: {
      blockName: 'custom_button_name',
    },
  },
}
```

- [ ] Verify copied JSON uses `"component": "custom_button_name"`
- [ ] Verify paste works if component exists in Storyblok with that name

---

## Phase 8: Error Handling

### Step 13: Test Error States

1. **Clipboard permission denied**
   - [ ] Deny clipboard permissions when prompted
   - [ ] Verify helpful error message appears

2. **Component not in Storyblok**
   - [ ] Copy a component that doesn't exist in Storyblok
   - [ ] Run bookmarklet and paste
   - [ ] Verify error message: "Oops, the component was not found"

3. **Invalid clipboard content**
   - [ ] Copy random text (not from Storybook)
   - [ ] Click bookmarklet
   - [ ] Verify error shows clipboard content for debugging

4. **No story selected**
   - [ ] Go to Docs page (not Canvas)
   - [ ] Try to click copy button
   - [ ] Verify it's disabled or shows appropriate message

---

## Phase 9: Browser Compatibility

### Step 14: Test Across Browsers

Test the full workflow in each browser:

- [ ] **Chrome/Edge** (latest)
- [ ] **Firefox** (latest)  
- [ ] **Safari** (latest, macOS)

**Check in each browser**:
- [ ] Copy button works
- [ ] Bookmarklet runs without errors
- [ ] Paste Block appears
- [ ] No console errors

---

## Phase 10: Performance

### Step 15: Test with Many Props

Create a story with 15+ props:

```javascript
export const ManyProps = {
  args: {
    prop1: 'value1',
    prop2: 'value2',
    // ... up to prop15
  },
}
```

- [ ] Copy completes quickly
- [ ] Panel UI remains responsive
- [ ] JSON preview is scrollable

---

## Success Criteria

The test is successful if:

✅ Copy button generates valid block instance JSON  
✅ Bookmarklet successfully transfers to Storyblok clipboard  
✅ Paste Block appears in Storyblok bloks fields  
✅ Component data is correctly populated after paste  
✅ Works across major browsers (Chrome, Firefox, Safari)  
✅ Error states show helpful messages  
✅ Panel UI displays component information correctly  

---

## Common Issues and Solutions

### Issue: "Clipboard does not contain valid JSON"

**Cause**: Bookmarklet clicked before copying from Storybook, or copied something else.

**Solution**: 
1. Click copy button in Storybook first
2. Immediately go to Storyblok and click bookmarklet
3. Don't copy anything else in between

### Issue: "Oops, the component was not found"

**Cause**: The component name doesn't exist in Storyblok's Block Library.

**Solution**:
1. Check the component name in the copied JSON
2. Either create the component in Storyblok, or
3. Use `storyblok.blockName` parameter to map to an existing component

### Issue: "Paste Block" doesn't appear

**Cause**: Storyblok UI didn't react to localStorage change.

**Solution**:
1. Click on a different field in Storyblok
2. Click back to the Body/Header/Footer field
3. Try refreshing the page and running bookmarklet again

### Issue: Addon doesn't appear in Storybook

**Solutions**:
1. Clear cache: `npm run storybook -- --no-manager-cache`
2. Restart Storybook server
3. Verify addon is in `.storybook/main.js` addons array
4. Verify addon built successfully (`dist/` folder exists)

### Issue: Bookmarklet permission error

**Cause**: Browser blocking clipboard access.

**Solution**:
1. Chrome/Edge: Allow clipboard access when prompted
2. Firefox: Enable `dom.events.asyncClipboard.readText` in about:config
3. Try using HTTPS if on HTTP

---

## Cleanup (After Testing)

```bash
# Unlink the addon
cd /path/to/your-project
npm unlink storybook-storyblok-addon

# Restore original .storybook/main.js configuration
```

---

## Document Version

**Version**: 2.0  
**Last Updated**: January 20, 2026  
**Major Changes**: Updated for bookmarklet workflow and block instance format

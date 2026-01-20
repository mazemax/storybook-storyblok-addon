# Quick Start Guide

Get copying from Storybook to Storyblok in 5 minutes.

## 1. Install

```bash
npm install storybook-storyblok-addon --save-dev
```

## 2. Configure

Add to `.storybook/main.js`:

```javascript
module.exports = {
  addons: [
    '@storybook/addon-essentials',
    'storybook-storyblok-addon',
  ],
}
```

## 3. Get the Bookmarklet

1. Start Storybook
2. Open the **"Storyblok"** panel
3. Drag **"Paste to Storyblok"** to your bookmarks bar

## 4. Copy & Paste

```
Storybook          →  Bookmarklet  →  Storyblok
Click 📋 Copy         Click it        Click "Paste Block"
```

That's it! Your component block is now in Storyblok.

---

## Requirements

- The component must exist in your Storyblok Block Library
- Component names must match (e.g., `BaseButton` in Storybook = `BaseButton` in Storyblok)

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Component not found" | Create the component in Storyblok's Block Library |
| "Invalid JSON" | Make sure you clicked copy in Storybook first |
| "Paste Block" missing | Click another field, then click back |

---

See [README.md](../README.md) for full documentation.

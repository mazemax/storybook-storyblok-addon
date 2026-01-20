/**
 * Storyblok Clipboard Bookmarklet
 * 
 * This bookmarklet transfers block data from system clipboard to Storyblok's localStorage.
 * 
 * HOW TO USE:
 * 1. Create a new bookmark in your browser
 * 2. Set the URL/Location to the bookmarklet code below
 * 3. Copy a block from Storybook using the "Copy to Storyblok" button
 * 4. Go to Storyblok editor
 * 5. Click the bookmarklet
 * 6. The "Paste Block" option should now appear
 */

/**
 * Bookmarklet code (minified version for bookmark URL)
 * 
 * Copy this entire string and paste it as a bookmark URL:
 * 
 * This version:
 * 1. Writes to localStorage
 * 2. Dispatches storage event to trigger Storyblok's reactivity
 * 3. Dispatches custom events that Storyblok might listen for
 */
export const BOOKMARKLET_CODE = `javascript:(async()=>{try{const t=await navigator.clipboard.readText();let d;try{d=JSON.parse(t)}catch(e){alert('❌ Invalid JSON\\n\\nClipboard content (first 200 chars):\\n'+t.substring(0,200)+'\\n\\nMake sure you clicked Copy in Storybook first.');return}if(!Array.isArray(d)){d=[d]}const valid=d.every(b=>b.component&&b._uid);if(!valid){alert('❌ Missing required fields\\n\\nBlocks need "component" and "_uid" fields.\\n\\nFound: '+JSON.stringify(d[0],null,2).substring(0,300));return}const json=JSON.stringify(d);const oldVal=localStorage.getItem('clipboard');localStorage.setItem('clipboard',json);window.dispatchEvent(new StorageEvent('storage',{key:'clipboard',newValue:json,oldValue:oldVal,storageArea:localStorage}));window.dispatchEvent(new CustomEvent('storyblok:clipboard:update',{detail:d}));alert('✅ '+d.length+' block(s) ready to paste!\\n\\nIf Paste Block is not visible, try clicking on a different field in Storyblok, then click back.')}catch(e){alert('Error: '+e.message+'\\n\\nMake sure you granted clipboard permission.')}})();`

/**
 * Human-readable version of the bookmarklet (for documentation)
 */
export const BOOKMARKLET_SOURCE = `
javascript:(async () => {
  try {
    // Read from system clipboard
    const text = await navigator.clipboard.readText();
    
    // Parse JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      alert('❌ Invalid JSON\\n\\nClipboard content (first 200 chars):\\n' + text.substring(0, 200) + '\\n\\nMake sure you clicked Copy in Storybook first.');
      return;
    }
    
    // Ensure it's an array
    if (!Array.isArray(data)) {
      data = [data];
    }
    
    // Validate block structure
    const valid = data.every(block => block.component && block._uid);
    if (!valid) {
      alert('❌ Missing required fields\\n\\nBlocks need "component" and "_uid" fields.\\n\\nFound: ' + JSON.stringify(data[0], null, 2).substring(0, 300));
      return;
    }
    
    // Write to Storyblok's localStorage
    const json = JSON.stringify(data);
    const oldValue = localStorage.getItem('clipboard');
    localStorage.setItem('clipboard', json);
    
    // Dispatch storage event to trigger Storyblok's reactivity
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'clipboard',
      newValue: json,
      oldValue: oldValue,
      storageArea: localStorage
    }));
    
    // Dispatch custom event in case Storyblok listens for it
    window.dispatchEvent(new CustomEvent('storyblok:clipboard:update', {
      detail: data
    }));
    
    alert('✅ ' + data.length + ' block(s) ready to paste!\\n\\nIf Paste Block is not visible, try clicking on a different field in Storyblok, then click back.');
  } catch (e) {
    alert('Error: ' + e.message + '\\n\\nMake sure you granted clipboard permission.');
  }
})();
`

/**
 * Generate the bookmarklet installation HTML
 */
export function generateBookmarkletHTML(): string {
  return `
    <div style="padding: 16px; background: #f5f5f5; border-radius: 8px; margin: 16px 0;">
      <h4 style="margin: 0 0 12px 0;">📌 Install Storyblok Paste Bookmarklet</h4>
      <p style="margin: 0 0 12px 0; font-size: 13px; color: #666;">
        Drag this button to your bookmarks bar:
      </p>
      <a 
        href="${BOOKMARKLET_CODE}"
        style="
          display: inline-block;
          padding: 8px 16px;
          background: #00b3b0;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          font-weight: 600;
          font-size: 14px;
        "
        onclick="alert('Drag this to your bookmarks bar!'); return false;"
      >
        📋 Paste to Storyblok
      </a>
      <p style="margin: 12px 0 0 0; font-size: 12px; color: #888;">
        After copying from Storybook, go to Storyblok and click the bookmarklet.
      </p>
    </div>
  `
}

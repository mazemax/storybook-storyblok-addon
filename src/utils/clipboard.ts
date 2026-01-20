/**
 * Clipboard utilities for copying JSON to clipboard
 */

/**
 * Copy text to clipboard using modern Clipboard API with fallback
 */
export async function copyToClipboard(text: string): Promise<void> {
  // Try modern Clipboard API first
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text)
      return
    } catch (err) {
      console.warn('Clipboard API failed, falling back to execCommand:', err)
    }
  }

  // Fallback to execCommand for older browsers
  return copyToClipboardFallback(text)
}

/**
 * Fallback clipboard copy using execCommand
 */
function copyToClipboardFallback(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    textarea.style.top = '-9999px'
    textarea.setAttribute('readonly', '')

    document.body.appendChild(textarea)

    try {
      textarea.select()
      textarea.setSelectionRange(0, textarea.value.length)

      const successful = document.execCommand('copy')
      document.body.removeChild(textarea)

      if (successful) {
        resolve()
      } else {
        reject(new Error('execCommand copy failed'))
      }
    } catch (err) {
      document.body.removeChild(textarea)
      reject(err)
    }
  })
}

/**
 * Copy formatted JSON to clipboard
 */
export async function copyJSONToClipboard(
  data: any,
  indent = 2
): Promise<void> {
  const json = JSON.stringify(data, null, indent)
  return copyToClipboard(json)
}

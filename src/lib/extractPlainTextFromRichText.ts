export function extractPlainTextFromRichText(
    richText: any,
    maxLength = 120
  ): { text: string; truncated: boolean } {
    if (!richText) {
      return { text: '', truncated: false }
    }
  
    let result = ''
  
    const walk = (node: any) => {
      if (!node) return
  
      if (typeof node.text === 'string') {
        result += node.text
      }
  
      if (Array.isArray(node.children)) {
        node.children.forEach(walk)
      }
    }
  
    // Lexical rich text structure has content in the `root` property
    const root = richText?.root || richText
    walk(root)
  
    const trimmed = result.trim()
  
    if (!trimmed) {
      return { text: '', truncated: false }
    }
  
    if (trimmed.length <= maxLength) {
      return { text: trimmed, truncated: false }
    }
  
    return {
      text: trimmed.slice(0, maxLength).replace(/\s+\S*$/, ''),
      truncated: true,
    }
  }
import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical'

export function extractPlainTextFromRichText(
  richText: SerializedEditorState | null | undefined,
  maxLength = 120,
): { text: string; truncated: boolean } {
  if (!richText) {
    return { text: '', truncated: false }
  }

  let result = ''

  const walk = (node: SerializedLexicalNode): void => {
    if (!node) return

    if ('text' in node && typeof node.text === 'string') {
      result += node.text
    }

    if ('children' in node && Array.isArray(node.children)) {
      node.children.forEach((child) => walk(child as SerializedLexicalNode))
    }
  }

  const root = richText.root
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

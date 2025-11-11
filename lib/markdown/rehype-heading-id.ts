import { visit } from 'unist-util-visit';

export function rehypeHeadingId() {
  return (tree: any) => {
    if (!tree || typeof tree !== 'object') {
      return tree;
    }
    
    try {
      visit(tree, 'element', (node: any) => {
        if (!node || typeof node !== 'object' || !node.tagName) {
          return;
        }
        
        if (/^h[1-6]$/.test(node.tagName)) {
          if (node.children && Array.isArray(node.children) && node.children.length > 0) {
            const textNodes = node.children.filter((child: any) => child && child.type === 'text');
            if (textNodes.length > 0) {
              const lastTextNode = textNodes[textNodes.length - 1];
              if (lastTextNode && lastTextNode.value && typeof lastTextNode.value === 'string') {
                const text = lastTextNode.value;
                const match = text.match(/\s+\{#([a-zA-Z0-9_-]+)\}$/);
                if (match) {
                  const id = match[1];
                  node.properties = node.properties || {};
                  node.properties.id = id;
                  lastTextNode.value = text.replace(/\s+\{#[a-zA-Z0-9_-]+\}$/, '');
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.warn('Error in rehypeHeadingId plugin:', error);
    }
    
    return tree;
  };
}


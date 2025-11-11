import { visit } from 'unist-util-visit';

export function remarkHeadingId() {
  return (tree: any) => {
    if (!tree || typeof tree !== 'object') {
      return tree;
    }
    
    try {
      visit(tree, 'heading', (node: any) => {
        if (!node || typeof node !== 'object' || !node.children) {
          return;
        }
        
        if (node.children && Array.isArray(node.children) && node.children.length > 0) {
          const lastChild = node.children[node.children.length - 1];
          if (lastChild && lastChild.type === 'text' && lastChild.value) {
            const text = lastChild.value;
            const match = text.match(/\s+\{#([a-zA-Z0-9_-]+)\}$/);
            if (match) {
              const id = match[1];
              node.data = node.data || {};
              node.data.hProperties = node.data.hProperties || {};
              node.data.hProperties.id = id;
              lastChild.value = text.replace(/\s+\{#[a-zA-Z0-9_-]+\}$/, '');
            }
          }
        }
      });
    } catch (error) {
      console.warn('Error in remarkHeadingId plugin:', error);
    }
    
    return tree;
  };
}


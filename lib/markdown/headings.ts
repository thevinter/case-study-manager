import type { Heading } from '@/types/schema';
import { nanoid } from 'nanoid';

const HEADING_REGEX = /^(#{1,6})\s+(.+?)(?:\s+\{#([a-zA-Z0-9_-]+)\})?$/gm;
const HEADING_ID_PATTERN = /\s+\{#[a-zA-Z0-9_-]+\}$/;

export function extractHeadings(content: string): Array<{ level: number; text: string; id?: string; line: number }> {
  const headings: Array<{ level: number; text: string; id?: string; line: number }> = [];
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    const match = line.match(/^(#{1,6})\s+(.+?)(?:\s+\{#([a-zA-Z0-9_-]+)\})?$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = match[3];
      headings.push({ level, text, id, line: index });
    }
  });
  
  return headings;
}

export function ensureHeadingIds(content: string): { content: string; headingIndex: Heading[] } {
  const lines = content.split('\n');
  const headingIndex: Heading[] = [];
  const idMap = new Map<string, string>();
  
  lines.forEach((line, index) => {
    const match = line.match(/^(#{1,6})\s+(.+?)(?:\s+\{#([a-zA-Z0-9_-]+)\})?$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      let id = match[3];
      
      if (!id) {
        id = nanoid(10);
        lines[index] = `${match[1]} ${text} {#${id}}`;
      }
      
      idMap.set(`${index}`, id);
      headingIndex.push({
        id,
        level,
        text,
        line: index,
      });
    }
  });
  
  return {
    content: lines.join('\n'),
    headingIndex,
  };
}

export function buildHeadingIndex(content: string): Heading[] {
  const headings: Heading[] = [];
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    const match = line.match(/^(#{1,6})\s+(.+?)(?:\s+\{#([a-zA-Z0-9_-]+)\})?$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = match[3] || nanoid(10);
      
      headings.push({
        id,
        level,
        text,
        line: index,
      });
    }
  });
  
  return headings;
}


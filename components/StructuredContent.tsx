import React from 'react';
import { StructuredBlock } from '@/lib/data';

export default function StructuredContent({ blocks }: { blocks: StructuredBlock[] }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="prose max-w-none">
      {blocks.map((block, idx) => {
        if (block.type === 'paragraph' && block.text) {
          return <p key={idx}>{block.text}</p>;
        }
        if (block.type === 'heading' && block.text) {
          return <h3 key={idx}>{block.text}</h3>;
        }
        if (block.type === 'list' && Array.isArray(block.items)) {
          return (
            <ul key={idx}>
              {block.items.map((item, i) => (
                <li key={i}>{typeof item === 'string' ? item : JSON.stringify(item)}</li>
              ))}
            </ul>
          );
        }
        if (block.type === 'citation') {
          return (
            <blockquote key={idx}>
              <p className="mb-1 font-semibold">{block.text}</p>
              {block.source && <span className="text-xs text-primary-700 font-bold tracking-wider">— {block.source}</span>}
            </blockquote>
          );
        }
        if (block.type === 'callout') {
          return (
            <div key={idx} className="p-4 my-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
              <p className="font-medium">{block.text}</p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
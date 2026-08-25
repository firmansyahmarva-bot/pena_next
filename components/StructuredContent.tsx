import React from 'react';
import { StructuredBlock } from '@/lib/types';

export default function StructuredContent({ blocks }: { blocks: StructuredBlock[] }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="prose max-w-none space-y-4">
      {blocks.map((block, idx) => {
        if (block.type === 'paragraph' && block.text) {
          return (
            <p
              key={idx}
              className="text-slate-700 leading-relaxed text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: block.text }}
            />
          );
        }
        if (block.type === 'heading' && block.text) {
          return (
            <h3
              key={idx}
              className="text-lg sm:text-xl font-bold text-slate-900 mt-6 mb-3 pt-2"
              dangerouslySetInnerHTML={{ __html: block.text }}
            />
          );
        }
        if (block.type === 'list' && Array.isArray(block.items)) {
          return (
            <ul key={idx} className="list-disc pl-5 space-y-2 text-slate-700 text-sm sm:text-base">
              {block.items.map((item, i) => (
                <li
                  key={i}
                  className="leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: typeof item === 'string' ? item : JSON.stringify(item) }}
                />
              ))}
            </ul>
          );
        }
        if (block.type === 'citation') {
          return (
            <blockquote key={idx} className="border-l-4 border-emerald-600 bg-emerald-50/60 p-4 rounded-r-xl my-4 text-emerald-950">
              <p className="font-semibold text-sm mb-1" dangerouslySetInnerHTML={{ __html: block.text || '' }} />
              {block.source && <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">— {block.source}</span>}
            </blockquote>
          );
        }
        if (block.type === 'callout') {
          return (
            <div key={idx} className="p-4 sm:p-5 my-5 bg-amber-50/90 border border-amber-200 rounded-xl text-amber-950 text-sm">
              <p className="font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: block.text || '' }} />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
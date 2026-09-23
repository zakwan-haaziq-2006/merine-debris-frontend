import React from 'react';

/**
 * Lightweight, safe Markdown Renderer for Gemini Survey Reports
 * Supports headers, tables, lists, bold, italics, code blocks, and blockquotes
 */
export default function MarkdownViewer({ markdown = '' }) {
  if (!markdown) {
    return (
      <div className="text-sm font-mono text-[#8EA9C1] p-6 text-center italic">
        No report markdown generated yet. Upload an acoustic sonar image and run analysis to compile the dossier.
      </div>
    );
  }

  // Parse lines into structured tokens
  const lines = markdown.split('\n');
  const renderedElements = [];
  let tableRows = [];
  let inTable = false;
  let inCodeBlock = false;
  let codeBlockContent = [];

  const parseInlineFormatting = (text) => {
    // Bold: **text**
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={idx} className="text-[#67D9E8]">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={idx} className="px-1.5 py-0.5 rounded bg-[#020b14] text-[#67D9E8] font-mono text-xs border border-white/10">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  const flushTable = (key) => {
    if (tableRows.length === 0) return;

    const [headerRow, separatorRow, ...bodyRows] = tableRows;
    const headers = headerRow ? headerRow.split('|').filter(c => c.trim()).map(c => c.trim()) : [];
    
    renderedElements.push(
      <div key={`table-${key}`} className="my-5 overflow-x-auto rounded-xl border border-[#67D9E8]/30 shadow-lg">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-[#020b14] text-[#67D9E8] uppercase text-[11px] border-b border-white/10">
            <tr>
              {headers.map((h, hIdx) => (
                <th key={hIdx} className="py-3 px-4 font-bold tracking-wider">{parseInlineFormatting(h)}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-[#031B2E]/60 text-white">
            {bodyRows.map((row, rIdx) => {
              const cells = row.split('|').filter(c => c.trim()).map(c => c.trim());
              return (
                <tr key={rIdx} className="hover:bg-white/5 transition-colors">
                  {cells.map((c, cIdx) => (
                    <td key={cIdx} className="py-3 px-4 text-[#A4C2DC]">{parseInlineFormatting(c)}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );

    tableRows = [];
    inTable = false;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Code blocks
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        renderedElements.push(
          <div key={`code-${index}`} className="my-4 p-4 rounded-xl bg-[#020b14] border border-white/10 font-mono text-xs text-[#67D9E8] overflow-x-auto">
            <pre>{codeBlockContent.join('\n')}</pre>
          </div>
        );
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      return;
    }

    // Tables
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      inTable = true;
      if (!trimmed.includes('---')) {
        tableRows.push(trimmed);
      }
      return;
    } else if (inTable) {
      flushTable(index);
    }

    // Headers
    if (trimmed.startsWith('# ')) {
      renderedElements.push(
        <h1 key={index} className="text-2xl md:text-3xl font-extrabold text-white font-display uppercase tracking-wider mt-6 mb-3 pb-2 border-b border-[#67D9E8]/30">
          {parseInlineFormatting(trimmed.slice(2))}
        </h1>
      );
    } else if (trimmed.startsWith('## ')) {
      renderedElements.push(
        <h2 key={index} className="text-lg md:text-xl font-bold text-[#67D9E8] font-display uppercase tracking-wide mt-6 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#67D9E8]" />
          {parseInlineFormatting(trimmed.slice(3))}
        </h2>
      );
    } else if (trimmed.startsWith('### ')) {
      renderedElements.push(
        <h3 key={index} className="text-base font-bold text-white font-display uppercase tracking-wide mt-4 mb-2">
          {parseInlineFormatting(trimmed.slice(4))}
        </h3>
      );
    } 
    // Lists & Checklists
    else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      renderedElements.push(
        <div key={index} className="flex items-start gap-3 my-1.5 pl-2 text-sm text-[#A4C2DC] font-sans">
          <span className="w-1.5 h-1.5 rounded-full bg-[#67D9E8] mt-2 shrink-0" />
          <span>{parseInlineFormatting(trimmed.slice(2))}</span>
        </div>
      );
    } else if (/^\d+\.\s/.test(trimmed)) {
      const match = trimmed.match(/^(\d+)\.\s(.*)/);
      renderedElements.push(
        <div key={index} className="flex items-start gap-3 my-2 p-3 rounded-lg bg-[#020b14]/60 border border-white/5 text-sm text-white font-sans">
          <span className="px-2 py-0.5 rounded bg-[#031B2E] border border-[#67D9E8]/30 text-[#67D9E8] font-mono text-xs font-bold shrink-0">
            {match[1]}
          </span>
          <span className="flex-1">{parseInlineFormatting(match[2])}</span>
        </div>
      );
    }
    // Blockquotes
    else if (trimmed.startsWith('> ')) {
      renderedElements.push(
        <div key={index} className="my-4 p-4 rounded-xl bg-[#031B2E]/80 border-l-4 border-[#67D9E8] text-sm text-[#A4C2DC] italic">
          {parseInlineFormatting(trimmed.slice(2))}
        </div>
      );
    }
    // Regular paragraphs
    else if (trimmed.length > 0) {
      renderedElements.push(
        <p key={index} className="my-2.5 text-sm text-[#A4C2DC] font-sans leading-relaxed">
          {parseInlineFormatting(trimmed)}
        </p>
      );
    }
  });

  if (inTable) {
    flushTable('end');
  }

  return (
    <div className="space-y-2 font-sans">
      {renderedElements}
    </div>
  );
}

import React from 'react';
import { MarginNote } from '../components/MarginNote';

// Syntax Support:
// Margin Notes: {{Term|Definition|Text}}
// Bold: **text**
// Italic: *text*
// Blockquote: > text at start of paragraph

export const parseContent = (content: string): React.ReactNode => {
  if (!content) return null;

  // Split by double line breaks for paragraphs
  const paragraphs = content.split(/\n\n+/);

  return paragraphs.map((paragraph, pIndex) => {
    // Check if it's a blockquote (starts with >)
    if (paragraph.trim().startsWith('>')) {
      return (
        <blockquote key={pIndex} className="pl-6 border-l-4 border-terracotta italic text-xl my-8 text-charcoal/80 dark:text-gray-300">
          {parseInline(paragraph.replace(/^>\s*/, ''))}
        </blockquote>
      );
    }

    return (
      <p key={pIndex} className={`mb-6 ${pIndex === 0 ? 'drop-cap' : ''}`}>
        {parseInline(paragraph)}
      </p>
    );
  });
};

const parseInline = (text: string): React.ReactNode[] => {
  // We parse in stages: Margin Notes -> Bold -> Italic
  // This is a simple recursive strategy.
  
  // 1. Handle Margin Notes {{...}}
  const noteRegex = /\{\{(.*?)\|(.*?)\|(.*?)\}\}/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = noteRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      // Parse text before the note for Bold/Italic
      parts.push(...parseBold(text.substring(lastIndex, match.index)));
    }

    const [_, term, definition, childrenText] = match;
    parts.push(
      <MarginNote key={`note-${match.index}`} term={term.trim()} definition={definition.trim()}>
        {childrenText.trim()}
      </MarginNote>
    );

    lastIndex = noteRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(...parseBold(text.substring(lastIndex)));
  }

  return parts;
};

const parseBold = (text: string): React.ReactNode[] => {
  const boldRegex = /\*\*(.*?)\*\*/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(...parseItalic(text.substring(lastIndex, match.index)));
    }

    parts.push(
      <strong key={`bold-${match.index}`} className="font-bold text-charcoal dark:text-white">
        {match[1]}
      </strong>
    );

    lastIndex = boldRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(...parseItalic(text.substring(lastIndex)));
  }

  return parts;
};

const parseItalic = (text: string): React.ReactNode[] => {
  const italicRegex = /\*(.*?)\*/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = italicRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    parts.push(
      <em key={`italic-${match.index}`} className="italic">
        {match[1]}
      </em>
    );

    lastIndex = italicRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
};
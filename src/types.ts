import { ReactNode } from 'react';

export type ArticleCategory = 'Systems' | 'Responsibility' | 'Long-term Decisions';

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: ArticleCategory;
  date: string;
  readingTime: string;
  complexity: 'Low' | 'Mid' | 'High';
  content: string; // Changed from ReactNode to string for storage/editing
  imageUrl?: string;
  imageCaption?: string;
}

export interface MarginNoteProps {
  term: string;
  definition: string;
  children: ReactNode;
}
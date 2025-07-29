

export enum ContentType {
  HEADING1,
  HEADING2,
  HEADING3,
  HEADING4,
  PARAGRAPH,
  LIST_UNORDERED,
  CODE_BLOCK,
  DEFINITION_LIST,
  NOTE,
  LINK,
  PREFORMATTED_TEXT,
  IMAGE_PLACEHOLDER,
  CODE_EXPLANATION, // New type for side-by-side view
}

export interface DefinitionListItem {
  term: string;
  definition: string;
}

export interface CodeExplanationItem {
  lines: string; // e.g., "1-3", "5", "8-10"
  explanation: string;
}

export interface ContentItem {
  type: ContentType;
  text?: string;
  items?: string[];
  code?: string;
  language?: string;
  definitionItems?: DefinitionListItem[];
  title?: string;
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
  explanations?: CodeExplanationItem[]; // For CODE_EXPLANATION
  codeTitle?: string; // For CODE_EXPLANATION
}

export interface ChapterSection {
  id: string; 
  icon?: string;
  title?: string;
  content: ContentItem[];
  isSpeaking?: boolean; // Added for TTS state
}

export interface Chapter {
  id: string; // Unique ID for the chapter
  chapterTitle: string;
  sections: ChapterSection[];
}

export interface Part {
  id: string; // Unique ID for the part
  partTitle: string;
  chapters: Chapter[];
  icon?: string; // Optional icon for the part
}

export interface Book {
  bookTitle: string;
  arabicBookTitle?: string; // Optional Arabic title
  parts: Part[];
}

export interface SearchResult {
  part: Part;
  chapter: Chapter;
  section: ChapterSection;
}

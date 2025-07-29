
import React from 'react';
import { ContentItem, ContentType, DefinitionListItem } from '../types';
import CodeBlock from './CodeBlock';
import CodeExplanationBlock from './CodeExplanationBlock';

interface ContentRendererProps {
  item: ContentItem;
}

// A curated list of relevant, high-quality images from Unsplash
const preselectedImages = [
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=400&fit=crop&q=80', // Code on screen
  'https://images.unsplash.com/photo-1517694712202-1428bc3835b3?w=600&h=400&fit=crop&q=80', // Laptop with code
  'https://images.unsplash.com/photo-1550439062-609e1531270e?w=600&h=400&fit=crop&q=80', // Abstract tech lines
  'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=600&h=400&fit=crop&q=80', // Developer setup
  'https://images.unsplash.com/photo-1516116216624-53e6973bea12?w=600&h=400&fit=crop&q=80', // Server racks
  'https://images.unsplash.com/photo-1580894908361-967195033215?w=600&h=400&fit=crop&q=80', // Team working on computers
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop&q=80', // React logo
  'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=600&h=400&fit=crop&q=80', // Database diagram
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop&q=80', // Network/API connections
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop&q=80', // Matrix-like code
  'https://images.unsplash.com/photo-1562813733-b31f71025d54?w=600&h=400&fit=crop&q=80', // Flowchart on screen
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop&q=80', // Woman coding
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop&q=80', // Code close-up
  'https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?w=600&h=400&fit=crop&q=80', // Padlock, security concept
  'https://images.unsplash.com/photo-1614064548237-02f9d3ed9486?w=600&h=400&fit=crop&q=80'  // File folders, upload concept
];

// Simple hash function to get a consistent index from a string
const getHashFromString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};


const ContentRenderer: React.FC<ContentRendererProps> = ({ item }) => {
  const baseFontSizeStyle = (baseRem: string): React.CSSProperties => ({
    fontSize: `calc(${baseRem} * var(--font-size-multiplier, 1))`,
  });

  switch (item.type) {
    case ContentType.HEADING3: // Used for section titles within EbookReaderPage's direct mapping
      return <h3 style={baseFontSizeStyle('1.25rem')} className="text-xl font-semibold text-stone-100 mt-6 mb-3">{item.text}</h3>;
    case ContentType.HEADING4:
      return <h4 style={baseFontSizeStyle('1.125rem')} className="text-lg font-bold text-stone-100 mt-4 mb-2">{item.text}</h4>;
    case ContentType.PARAGRAPH:
      return <p style={baseFontSizeStyle('1rem')} className="my-4 text-stone-300 leading-relaxed text-justify text-base">{item.text}</p>;
    case ContentType.LIST_UNORDERED:
      return (
        <ul style={baseFontSizeStyle('1rem')} className="my-4 mr-6 list-disc list-outside space-y-2 text-stone-300 text-base">
          {item.items?.map((li, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: li }}></li>
          ))}
        </ul>
      );
    case ContentType.CODE_EXPLANATION:
        return <CodeExplanationBlock 
                    language={item.language} 
                    code={item.code || ''} 
                    explanations={item.explanations || []} 
                    codeTitle={item.codeTitle}
                />;
    case ContentType.CODE_BLOCK: // Fallback for any old code blocks
      return <CodeBlock language={item.language} code={item.code || ''} />;
    case ContentType.DEFINITION_LIST:
      return (
        <dl className="my-4 space-y-3">
          {item.definitionItems?.map((dlItem: DefinitionListItem, index: number) => (
            <div key={index} className="bg-stone-700 p-3 rounded-md border border-stone-600">
              <dt style={baseFontSizeStyle('1.125rem')} className="text-lg font-bold text-stone-200" dangerouslySetInnerHTML={{ __html: dlItem.term }}></dt>
              <dd style={baseFontSizeStyle('1.125rem')} className="text-lg text-stone-200 mr-4">{dlItem.definition}</dd>
            </div>
          ))}
        </dl>
      );
    case ContentType.NOTE:
      return (
        <div className="my-6 p-4 bg-amber-800 border-r-4 border-amber-600 rounded-md shadow">
          {item.title && <p style={baseFontSizeStyle('1rem')} className="font-bold text-amber-200 mb-1 text-base">{item.title}</p>}
          <p style={baseFontSizeStyle('1.125rem')} className="text-lg text-amber-100 whitespace-pre-wrap font-code">{item.text}</p>
        </div>
      );
    case ContentType.LINK:
      return (
        <p style={baseFontSizeStyle('1rem')} className="my-2 text-base">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sky-300 hover:text-sky-200 hover:underline transition-colors">
            {item.text || item.url}
          </a>
        </p>
      );
    case ContentType.PREFORMATTED_TEXT:
       return (
        <pre style={baseFontSizeStyle('1rem')} className="my-4 p-4 bg-stone-900 text-stone-200 rounded-md overflow-x-auto font-code border border-stone-700 text-base">
          {item.text}
        </pre>
      );
    case ContentType.IMAGE_PLACEHOLDER:
      // Use a consistent, curated image based on its alt text for relevance and stability
      const hash = getHashFromString(item.alt || 'default-image');
      const imageUrl = preselectedImages[hash % preselectedImages.length];

      return (
        <div className="my-4 flex justify-center bg-stone-700 p-2 rounded-lg">
          <img 
            src={imageUrl}
            alt={item.alt || 'Placeholder Image'} 
            className="rounded-md shadow-md opacity-90 object-cover"
            width={item.width || 600}
            height={item.height || 400}
            loading="lazy"
          />
        </div>
      );
    default:
      return null;
  }
};

export default ContentRenderer;
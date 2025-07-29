import React from 'react';
import { ContentItem, ContentType } from '../types';
import CodeBlock from './CodeBlock';
import CodeExplanationBlock from './CodeExplanationBlock';
import AuthFlowProject from './projects/AuthFlowProject';
import ContactFormProject from './projects/ContactFormProject';
import DigitalProductProject from './projects/DigitalProductProject';
import PaymentGatewayProject from './projects/PaymentGatewayProject';

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
    case ContentType.HEADING1:
      return <h1 style={baseFontSizeStyle('2.25rem')} className="text-4xl font-bold text-amber-300 mt-8 mb-4">{item.text}</h1>;
    case ContentType.HEADING2:
      return <h2 style={baseFontSizeStyle('1.875rem')} className="text-3xl font-bold text-amber-400 mt-8 mb-4 border-b-2 border-stone-700 pb-2">{item.text}</h2>;
    case ContentType.HEADING3:
      return <h3 style={baseFontSizeStyle('1.5rem')} className="text-2xl font-semibold text-stone-100 mt-6 mb-3">{item.text}</h3>;
    case ContentType.HEADING4:
      return <h4 style={baseFontSizeStyle('1.25rem')} className="text-xl font-bold text-stone-100 mt-4 mb-2">{item.text}</h4>;
    case ContentType.PARAGRAPH:
      return <p style={baseFontSizeStyle('1.125rem')} className="my-4 text-stone-300 leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: item.text || '' }} />;
    case ContentType.LIST_UNORDERED:
      return (
        <ul style={baseFontSizeStyle('1.125rem')} className="my-4 mr-6 list-disc list-outside space-y-2 text-stone-300">
          {item.items?.map((li, index) => <li key={index} dangerouslySetInnerHTML={{ __html: li }} />)}
        </ul>
      );
    case ContentType.CODE_BLOCK:
      return <CodeBlock language={item.language} code={item.code || ''} />;
    case ContentType.CODE_EXPLANATION:
      if (!item.explanations || !item.code) return null;
      return (
        <CodeExplanationBlock
          language={item.language}
          code={item.code}
          explanations={item.explanations}
          codeTitle={item.codeTitle}
        />
      );
    case ContentType.DEFINITION_LIST:
      return (
        <dl className="my-4 space-y-3">
          {item.definitionItems?.map((dl, index) => (
            <div key={index} className="bg-stone-800 p-4 rounded-md border border-stone-700 shadow">
              <dt style={baseFontSizeStyle('1.125rem')} className="font-bold text-amber-400">{dl.term}</dt>
              <dd style={baseFontSizeStyle('1.125rem')} className="text-stone-300 mr-4 mt-1" dangerouslySetInnerHTML={{ __html: dl.definition }} />
            </div>
          ))}
        </dl>
      );
    case ContentType.NOTE:
      return (
        <div className="my-6 p-4 bg-amber-900/50 border-r-4 border-amber-500 rounded-md shadow">
          {item.title && <p style={baseFontSizeStyle('1.125rem')} className="font-bold text-amber-300 mb-1">{item.title}</p>}
          <p style={baseFontSizeStyle('1.125rem')} className="text-amber-100 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: item.text || ''}} />
        </div>
      );
    case ContentType.LINK:
      return (
        <p style={baseFontSizeStyle('1.125rem')} className="my-2">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 hover:underline">
            {item.text || item.url}
          </a>
        </p>
      );
    case ContentType.PREFORMATTED_TEXT:
      return (
        <pre style={baseFontSizeStyle('0.875rem')} className="my-4 p-4 bg-stone-900 text-stone-200 rounded-md overflow-x-auto font-code border border-stone-700">
          {item.text}
        </pre>
      );
    case ContentType.IMAGE_PLACEHOLDER:
      const imageKey = item.alt || item.text || 'default';
      const imageUrl = preselectedImages[getHashFromString(imageKey) % preselectedImages.length];
      return (
        <figure className="my-6">
          <img 
            src={imageUrl}
            alt={item.alt || 'Illustrative image'} 
            width={item.width || 600} 
            height={item.height || 400} 
            className="rounded-md mx-auto shadow-lg" 
          />
          {item.alt && <figcaption className="text-center text-stone-400 text-sm mt-2 italic">{item.alt}</figcaption>}
        </figure>
      );
    default:
      // This will give a warning in development if a new ContentType is added and not handled.
      // const _exhaustiveCheck: never = item.type;
      return null;
  }
};

export default ContentRenderer;

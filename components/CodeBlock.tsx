
import React, { useState } from 'react';

interface CodeBlockProps {
  language?: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback or error message could be shown here
    }
  };

  return (
    <div className="my-6 bg-stone-900 rounded-lg shadow-md border border-stone-700 overflow-hidden">
      <div className="flex items-center justify-between p-2 bg-stone-800 border-b border-stone-600">
        {language ? (
          <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-md text-base font-bold select-none">
            {language.toUpperCase()}
          </span>
        ) : <div />}
        <button
          onClick={handleCopy}
          className="px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded-md text-base font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400"
          aria-label="Copy code"
        >
          {copied ? 'تم النسخ!' : 'نسخ'}
        </button>
      </div>
      <pre
        className="p-4 text-gray-100 overflow-x-auto whitespace-pre-wrap break-all font-code leading-relaxed text-left"
        style={{ fontSize: `calc(0.875rem * var(--font-size-multiplier, 1))` }}
      >
        <code dir="ltr">{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
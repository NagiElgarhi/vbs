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
    <div className="relative my-6 bg-gray-900 rounded-lg shadow-md">
      <div className="absolute top-2 left-2 z-10 flex items-center space-x-2 rtl:space-x-reverse">
        <button
          onClick={handleCopy}
          className="px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded-md text-base font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400"
          aria-label="Copy code"
        >
          {copied ? 'تم النسخ!' : 'نسخ'}
        </button>
        {language && (
          <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-md text-base font-bold select-none">
            {language.toUpperCase()}
          </span>
        )}
      </div>
      <pre className="p-4 pt-10 text-gray-100 overflow-x-auto whitespace-pre-wrap break-all font-code leading-relaxed text-left text-base">
        <code dir="ltr">{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
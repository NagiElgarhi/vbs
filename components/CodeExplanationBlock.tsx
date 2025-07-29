import React, { useState } from 'react';
import { CodeExplanationItem } from '../types';

interface CodeExplanationBlockProps {
  language?: string;
  code: string;
  explanations: CodeExplanationItem[];
  codeTitle?: string;
}

const CodeExplanationBlock: React.FC<CodeExplanationBlockProps> = ({ language, code, explanations, codeTitle }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const codeLines = code.split('\n');

  return (
    <div className="flex flex-col md:flex-row my-6 bg-stone-800 rounded-lg shadow-lg border border-stone-700 overflow-hidden">
      {/* Explanation Side (Now first, so it will be on the RIGHT in RTL) */}
      <div className="w-full md:w-1/2 p-4 bg-stone-800 md:border-r-2 border-stone-700">
        <h4
          className="font-semibold text-amber-400 mb-4 border-b border-stone-700 pb-2"
          style={{ fontSize: `calc(1.25rem * var(--font-size-multiplier, 1))` }}
        >
          شرح الكود
        </h4>
        <div className="space-y-4">
          {explanations.map((item, index) => (
            <div key={index} className="flex">
              <div className="flex-shrink-0 w-16 text-center">
                <span className="inline-block bg-stone-700 text-amber-300 font-bold text-xs px-2 py-1 rounded">
                  سطر {item.lines}
                </span>
              </div>
              <p
                className="flex-grow mr-4 text-stone-300 leading-relaxed font-bold"
                style={{ fontSize: `calc(1.25rem * var(--font-size-multiplier, 1))` }}
              >
                {item.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Code Side (Now second, so it will be on the LEFT in RTL) */}
      <div dir="ltr" className="w-full md:w-1/2 bg-gray-900 flex flex-col border-t-2 md:border-t-0 border-stone-700">
        <div className="flex-shrink-0 flex items-center justify-between p-2 bg-stone-700 border-b border-stone-600">
          <div className="flex items-center space-x-2">
             <button
                onClick={handleCopy}
                className="px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded-md text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400"
                aria-label="Copy code"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
             {language && (
                <span className="px-2 py-1 bg-gray-600 text-gray-300 rounded-md text-xs font-bold select-none">
                  {language.toUpperCase()}
                </span>
              )}
          </div>
          {codeTitle && <span className="text-gray-300 font-semibold text-sm">{codeTitle}</span>}
        </div>
        <div className="flex-grow p-4 overflow-x-auto text-left">
          <pre
            className="font-code leading-relaxed text-gray-100"
            style={{ fontSize: `calc(0.875rem * var(--font-size-multiplier, 1))` }}
          >
            {codeLines.map((line, index) => (
              <div key={index} className="flex">
                <span className="w-8 text-right pr-4 text-gray-500 select-none">{index + 1}</span>
                <code className="flex-1 whitespace-pre-wrap break-all">{line}</code>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeExplanationBlock;
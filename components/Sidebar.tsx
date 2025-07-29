
import React, { useState, useEffect } from 'react';
import { Book, Part, Chapter, ChapterSection, SearchResult } from '../types';

interface SidebarProps {
  book: Book;
  activeSectionId?: string | null;
  onSelectSection: (selection: { partId: string; chapterId: string; sectionId: string; }) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchResults: SearchResult[];
  onSearchResultClick: (result: SearchResult) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  book, 
  activeSectionId,
  onSelectSection,
  searchQuery,
  onSearchChange,
  searchResults,
  onSearchResultClick,
  isOpen,
  onClose
}) => {
  type View = 'parts' | 'chapters' | 'sections';
  const [view, setView] = useState<View>('parts');
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  // Reset view when sidebar is closed/opened
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { // Delay reset to avoid seeing it during closing animation
        setView('parts');
        setSelectedPart(null);
        setSelectedChapter(null);
      }, 300);
    }
  }, [isOpen]);


  const handlePartClick = (part: Part) => {
    setSelectedPart(part);
    setView('chapters');
  };

  const handleChapterClick = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setView('sections');
  };

  const handleSectionClick = (section: ChapterSection) => {
    if (selectedPart && selectedChapter) {
      onSelectSection({
          partId: selectedPart.id,
          chapterId: selectedChapter.id,
          sectionId: section.id
      });
    }
  };

  const handleBack = () => {
    if (view === 'sections') {
      setSelectedChapter(null);
      setView('chapters');
    } else if (view === 'chapters') {
      setSelectedPart(null);
      setView('parts');
    }
  };
  
  const handleSearchResultClick = (e: React.MouseEvent<HTMLButtonElement>, result: SearchResult) => {
    e.preventDefault();
    onSearchResultClick(result);
  };
  
  const getHeader = () => {
    const canGoBack = view !== 'parts';
    let title = "فهرس الكتاب";
    if (view === 'chapters' && selectedPart) {
      title = selectedPart.partTitle;
    } else if (view === 'sections' && selectedChapter) {
      title = selectedChapter.chapterTitle;
    }
    
    return (
       <div className="p-4 sticky top-0 bg-stone-600 z-10 border-b border-stone-500 flex items-center justify-between">
         {canGoBack ? (
            <button onClick={handleBack} title="رجوع" className="p-1 text-stone-300 hover:text-white hover:bg-stone-500 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 rtl:rotate-180">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
         ) : <div className="w-8 h-8"></div> /* Placeholder for alignment */ }

        <h2 className="text-lg font-semibold text-stone-50 text-center truncate px-2" title={title}> 
          {title}
        </h2>
        
        <button onClick={onClose} title="إغلاق الفهرس" className="p-1 text-stone-300 hover:text-white hover:bg-stone-500 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      </div>
    );
  };

  const renderContent = () => {
     if (view === 'parts') {
       return (
        <ul className="space-y-1.5"> 
            {book.parts.map((part: Part) => (
              <li key={part.id}>
                <button
                  onClick={() => handlePartClick(part)}
                  className="flex items-center w-full text-right px-3 py-2.5 rounded-md font-bold transition-colors duration-150 ease-in-out bg-stone-600 text-white hover:bg-stone-500"
                >
                  {part.icon && <span className="ml-2 rtl:mr-0 rtl:ml-2 text-lg select-none">{part.icon}</span>}
                  <span className="flex-grow text-xl">{part.partTitle}</span>
                  <svg className="w-4 h-4 rtl:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </li>
            ))}
        </ul>
       );
     }

     if (view === 'chapters' && selectedPart) {
        return (
          <ul className="space-y-1.5"> 
            {(selectedPart.chapters || []).map((chapter: Chapter) => (
                <li key={chapter.id}>
                  <button
                    onClick={() => handleChapterClick(chapter)}
                    className="flex items-center w-full text-right px-3 py-2 rounded-md font-bold transition-colors duration-150 ease-in-out bg-stone-500 text-white hover:bg-stone-400"
                  >
                    <span className="flex-grow">{chapter.chapterTitle}</span>
                    <svg className="w-3.5 h-3.5 rtl:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </li>
            ))}
             {(!Array.isArray(selectedPart.chapters) || selectedPart.chapters.length === 0) && (
                <li>
                    <span className="block w-full text-right px-3 py-2 text-base text-stone-400 font-bold">لا توجد فصول فى هذا الباب</span>
                </li>
            )}
          </ul>
        );
     }
     
     if (view === 'sections' && selectedChapter) {
       return (
          <ul className="space-y-0.5">
            {(selectedChapter.sections || []).length > 0 ? selectedChapter.sections.map((section: ChapterSection) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`block w-full text-right px-3 py-1.5 rounded-md text-base font-bold transition-colors duration-150 ease-in-out
                    ${activeSectionId === section.id 
                      ? 'bg-stone-800 text-amber-300'
                      : 'text-white hover:text-amber-300 hover:bg-stone-600'}`}
                  onClick={(e) => { e.preventDefault(); handleSectionClick(section); }}
                >
                  {section.icon && <span className="ml-1.5 rtl:mr-0 rtl:ml-1.5 opacity-70 select-none">{section.icon}</span>}
                  {section.title || `عنصر ${section.id.split('_').pop()}`}
                </a>
              </li>
            )) : (
              <li>
                <span className="block w-full text-right px-3 py-1.5 text-base text-stone-400 font-bold">لا توجد عناصر</span>
              </li>
            )}
          </ul>
       );
     }
     
     return null;
  };
  
  return (
    <aside 
      className={`fixed top-0 bottom-0 rtl:right-0 ltr:left-0 w-80 bg-stone-700 border-l border-stone-600 flex flex-col z-50 shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'rtl:translate-x-full ltr:-translate-x-full'}`}
      role="navigation"
      aria-hidden={!isOpen}
    >
      {getHeader()}
      
      <div className="p-4 border-b border-stone-600">
        <div className="relative">
          <input
            type="search"
            placeholder="ابحث في الكتاب..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-stone-800 border border-stone-500 rounded-md py-2 pr-10 text-white placeholder-stone-400 focus:ring-amber-400 focus:border-amber-400 transition"
            aria-label="ابحث في الكتاب"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
             <svg className="w-5 h-5 text-stone-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
             </svg>
          </div>
        </div>
      </div>
      
      <nav aria-label="فهرس الكتاب" className="flex-grow overflow-y-auto px-3 pt-3 pb-6">
        {searchQuery.length < 3 ? (
            renderContent()
        ) : (
            <div role="status">
                {searchResults.length > 0 ? (
                    <ul className="space-y-2">
                        {searchResults.map((result, index) => (
                            <li key={`${result.section.id}-${index}`}>
                                <button onClick={(e) => handleSearchResultClick(e, result)} className="w-full text-right p-3 bg-stone-600 hover:bg-stone-500 rounded-md transition-colors text-white">
                                    <div className="font-bold text-amber-300">{result.section.title}</div>
                                    <div className="text-sm text-stone-300 mt-1">
                                        <span>{result.part.partTitle}</span>
                                        <span className="mx-1">&gt;</span>
                                        <span>{result.chapter.chapterTitle}</span>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-stone-400 p-4">لا توجد نتائج بحث لـ "{searchQuery}"</p>
                )}
            </div>
        )}
      </nav>
    </aside>
  );
};

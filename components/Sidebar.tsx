import React, { useState, useEffect, useMemo } from 'react';
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
  onGoHome: () => void;
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
  onClose,
  onGoHome
}) => {
  type View = 'parts' | 'chapters' | 'sections';
  const [view, setView] = useState<View>('parts');
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  const allSectionIds = useMemo(() => {
    const ids: string[] = [];
    book.parts.forEach(part => {
      part.chapters.forEach(chapter => {
        chapter.sections.forEach(section => {
          ids.push(section.id);
        });
      });
    });
    return ids;
  }, [book]);

  const { progressPercentage, remainingSections } = useMemo(() => {
    if (!allSectionIds || allSectionIds.length === 0) return { progressPercentage: 0, remainingSections: 0 };
    
    const currentIndex = activeSectionId ? allSectionIds.indexOf(activeSectionId) : -1;
    const completedSections = currentIndex >= 0 ? currentIndex + 1 : 0;
    
    const percentage = Math.round((completedSections / allSectionIds.length) * 100);
    const remaining = allSectionIds.length - completedSections;

    return { progressPercentage: percentage, remainingSections: remaining };
  }, [activeSectionId, allSectionIds]);


  // When a section is selected from outside (e.g., search), sync the sidebar view
  useEffect(() => {
    if (activeSectionId && isOpen) {
        let found = false;
        for (const part of book.parts) {
            for (const chapter of part.chapters) {
                if (chapter.sections.some(section => section.id === activeSectionId)) {
                    setSelectedPart(part);
                    setSelectedChapter(chapter);
                    setView('sections');
                    found = true;
                    break;
                }
            }
            if (found) break;
        }
    }
  }, [activeSectionId, isOpen, book.parts]);


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
         ) : (
            <button onClick={onGoHome} title="العودة للرئيسية" className="p-1 text-stone-300 hover:text-white hover:bg-stone-500 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </button>
         ) }

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
      
       {/* Progress Bar */}
       <div className="px-4 py-3 border-b border-stone-600">
        <div className="flex justify-between mb-1 text-sm font-medium text-stone-200">
          <span>تقدم قراءة الكتاب</span>
          <span className="font-code">{progressPercentage}%</span>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="flex-grow w-full bg-stone-900 rounded-full h-2.5">
            <div 
              className="bg-amber-400 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Reading progress"
            ></div>
          </div>
          <div className="text-xs font-medium text-stone-300 whitespace-nowrap">
            {remainingSections > 0 ? `${remainingSections} مستوى متبقي` : 'اكتمل'}
          </div>
        </div>
      </div>

      <nav aria-label="فهرس الكتاب" className="flex-grow overflow-y-auto px-3 py-3 pb-6">
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
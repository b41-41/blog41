'use client';

import React, { useState, useEffect } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!content) return;

    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const matches = [...content.matchAll(headingRegex)];
    
    const items: TOCItem[] = matches.map((match, index) => {
      const level = match[1].length; // # 개수
      const text = match[2].trim();
      const id = `heading-${text.replace(/[^\uAC00-\uD7A3a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase()}-${index}`;
      
      return { id, text, level };
    });

    setTocItems(items);
  }, [content]);

  useEffect(() => {
    if (tocItems.length === 0) return;

    const handleScroll = () => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
      
      for (const heading of headings) {
        const rect = heading.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
          const headingText = heading.textContent?.trim() || '';
          const matchingItem = tocItems.find(item => 
            item.text.toLowerCase() === headingText.toLowerCase() || 
            heading.id === item.id
          );
          
          if (matchingItem) {
            setActiveId(matchingItem.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const matchingItem = tocItems.find(item => item.id === id);
    if (!matchingItem) return;

    const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
    const targetHeading = Array.from(headings).find(heading => 
      heading.textContent?.trim().toLowerCase() === matchingItem.text.toLowerCase() ||
      heading.id === id
    );

    if (targetHeading) {
      targetHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg max-w-[180px] overflow-hidden transition-all duration-300 border border-gray-200 text-xs ${isOpen ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}>
      <div 
        className="flex items-center justify-between p-2 bg-primary-dark text-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <h3 className="text-xs font-medium">Contents</h3>
        </div>
        <span className="text-xs font-bold ml-2">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className="max-h-[40vh] overflow-y-auto p-2">
          <ul className="space-y-1 list-none p-0">
            {tocItems.map((item) => (
              <li 
                key={item.id}
                className={`
                  py-0.5 
                  ${item.level === 1 ? 'pl-0' : item.level === 2 ? 'pl-2' : 'pl-4'} 
                  text-xs
                  ${activeId === item.id ? 'text-primary-dark font-medium' : 'text-gray-700 hover:text-primary-dark'}
                  cursor-pointer
                  transition-colors
                  border-l
                  ${activeId === item.id ? 'border-primary-dark' : 'border-transparent'}
                `}
                onClick={() => scrollToHeading(item.id)}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TableOfContents;

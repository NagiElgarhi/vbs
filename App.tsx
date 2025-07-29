
import React from 'react';
import { EbookReaderPage } from './components/EbookReaderPage'; // Changed to named import

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-900">
      <EbookReaderPage />
    </div>
  );
};

export default App;
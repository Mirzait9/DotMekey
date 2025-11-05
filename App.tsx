import React, { useState, useCallback } from 'react';
import { generateKeywordsFromApi } from './services/geminiService';
import Header from './components/Header';
import Loader from './components/Loader';
import CopyNotification from './components/CopyNotification';
import KeywordTag from './components/KeywordTag';
import { KeywordWithScore } from './types';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [keywords, setKeywords] = useState<KeywordWithScore[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showCopyNotification, setShowCopyNotification] = useState<boolean>(false);

  const handleGenerateKeywords = useCallback(async () => {
    if (!topic.trim()) {
      setError('Please enter a video topic.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setKeywords([]);

    try {
      const generatedKeywords = await generateKeywordsFromApi(topic);
      setKeywords(generatedKeywords);
    } catch (err) {
      setError('Failed to generate keywords. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  const handleCopy = useCallback((textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setShowCopyNotification(true);
      setTimeout(() => setShowCopyNotification(false), 2000);
    });
  }, []);
  
  const handleCopyAll = useCallback(() => {
    if (keywords.length > 0) {
      handleCopy(keywords.map(k => k.keyword).join(', '));
    }
  }, [keywords, handleCopy]);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col items-center p-4">
      <Header />
      <main className="w-full max-w-2xl mx-auto flex-grow flex flex-col items-center">
        <div className="w-full bg-slate-800/50 rounded-xl shadow-2xl p-6 md:p-8 backdrop-blur-sm border border-slate-700">
          <h2 className="text-xl md:text-2xl font-bold text-center text-slate-200 mb-2">
            Generate YouTube SEO Keywords
          </h2>
          <p className="text-center text-slate-400 mb-6">
            Enter your video topic below and let our AI generate the perfect keywords.
          </p>
          
          <div className="flex flex-col gap-4 mb-6">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., 'React for beginners tutorial'"
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
              disabled={isLoading}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateKeywords()}
            />
            <button
              onClick={handleGenerateKeywords}
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-md transition duration-200 flex items-center justify-center"
            >
              {isLoading ? <Loader /> : 'Generate Keywords'}
            </button>
          </div>

          {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        </div>

        {keywords.length > 0 && (
          <div className="w-full bg-slate-800/50 rounded-xl shadow-lg mt-8 p-6 md:p-8 border border-slate-700">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-200">Generated Keywords</h3>
                <button
                    onClick={handleCopyAll}
                    className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-2 px-4 rounded-md transition duration-200 text-sm flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy All
                </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {keywords.map((item, index) => (
                <KeywordTag key={index} keyword={item.keyword} score={item.score} onCopy={handleCopy} />
              ))}
            </div>
          </div>
        )}
      </main>
      <footer className="w-full text-center py-4 mt-8">
        <p className="text-slate-500 text-sm">Powered by Gemini API</p>
      </footer>
      <CopyNotification show={showCopyNotification} />
    </div>
  );
};

export default App;
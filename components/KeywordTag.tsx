
import React from 'react';

interface KeywordTagProps {
  keyword: string;
  score: number;
  onCopy: (keyword: string) => void;
}

const getScoreColor = (score: number): string => {
  if (score > 75) return 'bg-green-500/20 text-green-300 ring-green-500/30'; // High
  if (score > 40) return 'bg-yellow-500/20 text-yellow-300 ring-yellow-500/30'; // Medium
  return 'bg-slate-600/30 text-slate-400 ring-slate-500/30'; // Low
};

const KeywordTag: React.FC<KeywordTagProps> = ({ keyword, score, onCopy }) => {
  return (
    <button
      onClick={() => onCopy(keyword)}
      className="group relative flex items-center gap-2 bg-slate-700/80 text-slate-200 text-sm font-medium pl-3 pr-2 py-1.5 rounded-full hover:bg-indigo-600 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500"
      title={`Click to copy "${keyword}"`}
    >
      <span>{keyword}</span>
      <span
        className={`flex items-center justify-center h-6 w-6 text-xs font-bold rounded-full ring-1 ring-inset ${getScoreColor(score)}`}
        title={`SEO Score: ${score}/100`}
      >
        {score}
      </span>
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Copy
      </span>
    </button>
  );
};

export default KeywordTag;

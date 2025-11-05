import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full max-w-2xl mx-auto py-6 mb-6 text-center">
      <div className="flex items-center justify-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-indigo-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1.258a1 1 0 01-.97-1.243l1.263-6.318a1 1 0 01.97-.743h18.416a1 1 0 01.97.743l1.263 6.318a1 1 0 01-.97 1.243H15v-2h2v-2h2v-2H9.258"
          />
        </svg>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          DotMe<span className="text-indigo-400">Key</span>
        </h1>
      </div>
      <p className="mt-2 text-md text-slate-400">Your AI-Powered YouTube SEO Assistant</p>
    </header>
  );
};

export default Header;
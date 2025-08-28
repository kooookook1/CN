import React, { useState, type FC } from 'react';
import { type Translations } from '../types';
import { generateWebsite } from '../services/geminiService';
import { GithubIcon } from '../constants';

interface AiSiteBuilderProps {
  t: Translations;
}

const AiSiteBuilder: FC<AiSiteBuilderProps> = ({ t }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedHtml, setGeneratedHtml] = useState('<html><head><style>body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background-color: #0F1724; color: #94A3B8; } h1 { font-size: 2rem; } </style></head><body><h1>Live Preview Will Appear Here</h1></body></html>');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setGeneratedHtml('<html><head><style>body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #0F1724; color: #7DD3FC; } .loader { border: 4px solid #f3f3f3; border-top: 4px solid #00FFF0; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; } @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style></head><body><div class="loader"></div><p style="margin-top: 1rem;">Generating...</p></body></html>');
    const html = await generateWebsite(prompt);
    setGeneratedHtml(html);
    setIsLoading(false);
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center">
        <h2 className="font-orbitron text-4xl font-bold text-slate-100 mb-2">{t.builder.title}</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="flex flex-col gap-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t.builder.prompt_placeholder}
            className="w-full h-64 p-4 bg-[var(--color-surface)] border-2 border-[var(--color-primary)]/30 rounded-md focus:outline-none focus:border-[var(--color-primary)] transition-colors text-slate-300 resize-none"
            dir={document.documentElement.dir}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full py-3 bg-[var(--color-primary)] text-black font-bold rounded-md hover:bg-[var(--color-secondary)] transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : t.builder.generate}
          </button>
          <div className="flex gap-4">
             <button className="w-full py-2 border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] font-bold rounded-md hover:bg-[var(--color-secondary)] hover:text-black transition-all duration-300">
               {t.builder.download}
            </button>
             <button className="w-full py-2 flex items-center justify-center gap-2 border-2 border-slate-500 text-slate-400 font-bold rounded-md hover:bg-slate-500 hover:text-white transition-all duration-300">
               <GithubIcon className="w-5 h-5"/> {t.builder.publish}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="h-[60vh] flex flex-col">
           <div className="bg-slate-800 px-4 py-2 rounded-t-md">
                <p className="font-orbitron text-sm text-slate-400">{t.builder.preview}</p>
            </div>
          <iframe
            srcDoc={generatedHtml}
            title="AI Generated Website Preview"
            className="w-full h-full border-x-2 border-b-2 border-[var(--color-primary)]/30 rounded-b-md bg-white"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
};

export default AiSiteBuilder;

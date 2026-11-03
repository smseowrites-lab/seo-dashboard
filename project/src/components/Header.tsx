import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  RefreshCw,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { MinakshiAssistantIcon } from './BrandAssets';
import { GoogleApiService } from '../services/googleApiService';

interface HeaderProps {
  onOpenAssistant: () => void;
  onSyncAll: () => void;
  isSyncing?: boolean;
  onSearchGlobal?: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAssistant,
  onSyncAll,
  isSyncing = false,
  onSearchGlobal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [authStatus, setAuthStatus] = useState(GoogleApiService.getAuthStatus());

  useEffect(() => {
    setAuthStatus(GoogleApiService.getAuthStatus());
  }, [isSyncing]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchGlobal && searchTerm.trim()) {
      onSearchGlobal(searchTerm.trim());
    } else {
      onOpenAssistant();
    }
  };

  const handleOAuthConnect = async () => {
    const updated = await GoogleApiService.requestAuthToken();
    setAuthStatus(updated);
    onSyncAll();
  };

  return (
    <header className="bg-white border-b border-[#E5DBEE] px-6 py-3.5 sticky top-0 z-20 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Greeting & Tagline */}
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-extrabold text-[#2D0C57] tracking-tight">
              Good Morning, Minakshi
            </h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F5F0FA] text-[#531199] border border-[#531199]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#E3B624]" />
              AI Growth Lead Active
            </span>
            <button
              onClick={handleOAuthConnect}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition-all cursor-pointer"
              title="Click to verify Google Search Console & GA4 OAuth Connection"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>GSC & GA4 OAuth Live ({authStatus.userEmail || 'minakshikushwaha93@gmail.com'})</span>
            </button>
          </div>
          <p className="text-xs text-[#52495d] mt-0.5 font-medium">
            Here is what AI thinks deserves your attention today.
            <span className="hidden lg:inline text-purple-700/80 ml-1">
              (Live GSC & GA4 search performance, optimization, content execution & distribution)
            </span>
          </p>
        </div>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-xs hidden xl:block">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search blogs, tasks, competitors, knowledge..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-[#F5F0FA] text-xs text-gray-900 placeholder-gray-400 pl-8 pr-3 py-1.5 rounded-xl border border-purple-200/60 focus:outline-none focus:ring-1 focus:ring-[#531199]"
          />
        </form>

        {/* Right Quick Actions with Minakshi Animated Character */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAssistant}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#531199] text-[#FFFFFF] text-xs font-bold hover:bg-[#6F1FB3] transition-all shadow-sm shadow-[#531199]/20 border border-[#E3B624]/40 group"
            >
              <MinakshiAssistantIcon size="sm" />
              <span>Ask Minakshi AI Copilot</span>
            </button>

            <button
              onClick={onSyncAll}
              disabled={isSyncing}
              className="p-2 rounded-xl bg-white border border-[#E5DBEE] text-gray-600 hover:text-[#531199] hover:bg-[#F5F0FA] transition-all"
              title="Sync GSC, GA4 & Competitor Crawlers"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#531199]' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

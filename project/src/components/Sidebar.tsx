import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Search, 
  HelpCircle, 
  Cpu, 
  Share2, 
  Users, 
  BarChart3, 
  Bot, 
  FileSpreadsheet, 
  History, 
  Settings,
  Database,
  Palette
} from 'lucide-react';

import { MFilterItLogo, MinakshiAvatar } from './BrandAssets';

export type ViewType = 
  | 'overview'
  | 'today_actions'
  | 'cross_intelligence'
  | 'seo'
  | 'aeo'
  | 'content_distribution'
  | 'competitor_intelligence'
  | 'ai_assistant'
  | 'canva_studio'
  | 'memory_center'
  | 'analytics'
  | 'reports'
  | 'activity_log'
  | 'settings';

interface SidebarProps {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  pendingCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  pendingCount
}) => {
  const navItems: { id: ViewType; label: string; icon: React.ReactNode; badge?: string | number; group?: string }[] = [
    { id: 'overview', label: "Today's Actions", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'today_actions', label: "Social Bookmarking", icon: <CheckSquare className="w-4 h-4" />, badge: pendingCount > 0 ? pendingCount : undefined },
    { id: 'cross_intelligence', label: 'Blog Promotion', icon: <Cpu className="w-4 h-4" />, badge: 'Active' },
    
    // Core Modules
    { id: 'seo', label: 'SEO Optimization', icon: <Search className="w-4 h-4" />, group: 'Core Engines' },
    { id: 'aeo', label: 'AEO Optimization', icon: <HelpCircle className="w-4 h-4" /> },
    
    // Content & Distribution
    { id: 'content_distribution', label: 'Content Distribution', icon: <Share2 className="w-4 h-4" />, group: 'Execution' },
    
    // Market & Competitors
    { id: 'competitor_intelligence', label: 'Competitor Intelligence', icon: <Users className="w-4 h-4" />, group: 'Market & Competitors' },
    
    // Operations & Insights
    { id: 'ai_assistant', label: 'mFilterIt Copilot', icon: <Bot className="w-4 h-4 text-[#e28eff]" />, badge: 'Brain v3.8', group: 'AI Engine & Creative' },
    { id: 'canva_studio', label: 'Creative Studio / Canva', icon: <Palette className="w-4 h-4" /> },
    { id: 'memory_center', label: 'Knowledge Hub', icon: <Database className="w-4 h-4" />, badge: '42 Grounded' },
    { id: 'analytics', label: 'Analytics (GSC / GA4)', icon: <BarChart3 className="w-4 h-4" />, group: 'Insights & Systems' },
    { id: 'reports', label: 'SEO Link Building', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'activity_log', label: 'Activity Log & Audit', icon: <History className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <aside className="w-64 bg-[#2D0C57] text-white flex flex-col h-screen shrink-0 border-r border-[#3e1374] select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#401579] flex items-center justify-between">
        <MFilterItLogo size="md" />
        <span className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-[#531199] text-[#E3B624] border border-[#E3B624]/30 shadow-xs">
          AI v2.6
        </span>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-2 py-1.5 space-y-0.5 text-xs scrollbar-thin scrollbar-thumb-purple-900">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <React.Fragment key={item.id}>
              {item.group && (
                <div className="text-[9px] font-bold tracking-wider uppercase text-purple-300/60 px-3 pt-3 pb-1">
                  {item.group}
                </div>
              )}
              <button
                onClick={() => onSelectView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all group ${
                  isActive
                    ? 'bg-[#531199] text-white shadow-sm shadow-[#531199]/50 border-l-4 border-l-[#E3B624] border-y border-r border-purple-400/30'
                    : 'text-purple-200/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <span className={`${isActive ? 'text-[#E3B624]' : 'text-purple-300 group-hover:text-white'}`}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-[#E3B624] text-[#2D0C57] font-bold'
                        : typeof item.badge === 'number'
                        ? 'bg-[#971199] text-white'
                        : 'bg-purple-900/60 text-purple-300 border border-purple-400/20'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            </React.Fragment>
          );
        })}
      </nav>

      {/* User Info Footer with Minakshi Kushwaha's Photo Avatar */}
      <div className="p-3 border-t border-[#401579] bg-[#240947]/80 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2.5 truncate">
          <MinakshiAvatar size="md" />
          <div className="truncate">
            <div className="font-bold text-white truncate text-[11px]">Minakshi Kushwaha</div>
            <div className="text-[10px] text-[#E3B624] truncate font-semibold">SEO & Growth Lead</div>
          </div>
        </div>
        <div className="w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20 shrink-0" title="AI Engines Online" />
      </div>
    </aside>
  );
};

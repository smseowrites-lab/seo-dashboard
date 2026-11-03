import React, { useState } from 'react';
import { CompetitorEvent, TaskRecommendation } from '../types';
import { 
  Users, 
  Sparkles, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  FileText,
  Filter
} from 'lucide-react';

interface CompetitorIntelligenceViewProps {
  events: CompetitorEvent[];
  onExecuteAction: (task: TaskRecommendation) => void;
  tasks: TaskRecommendation[];
}

export const CompetitorIntelligenceView: React.FC<CompetitorIntelligenceViewProps> = ({
  events,
  onExecuteAction,
  tasks
}) => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>('All');

  const competitors = ['All', 'CHEQ', 'AppsFlyer Protect360', 'DoubleVerify', 'HUMAN Security'];

  const filtered = selectedCompetitor === 'All'
    ? events
    : events.filter(e => e.competitorName.toLowerCase().includes(selectedCompetitor.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#531199] uppercase tracking-wider">
              <Users className="w-4 h-4" />
              <span>Real-Time Competitive Radar</span>
            </div>
            <h2 className="text-2xl font-black text-[#2D0C57] tracking-tight mt-1">
              Competitor Intelligence Agent
            </h2>
            <p className="text-xs text-gray-600 mt-1 max-w-3xl">
              Continuously monitors direct competitors for new blogs, updated reports, keywords, and AI citations. 
              Crucially: <strong>The AI does NOT automatically recommend creating duplicate articles</strong>, but prioritizes refreshing existing equity first.
            </p>
          </div>

          <div className="bg-[#F5F0FA] px-4 py-2 rounded-xl border border-purple-200 text-right">
            <div className="text-[10px] text-gray-500 font-semibold uppercase">Competitors Monitored</div>
            <div className="text-xl font-black text-[#531199]">5 Active (CHEQ, AppsFlyer, DV)</div>
          </div>
        </div>

        {/* Competitor filter tabs */}
        <div className="flex items-center gap-2 mt-6 border-b border-gray-200 pb-2 overflow-x-auto text-xs font-bold">
          {competitors.map(comp => (
            <button
              key={comp}
              onClick={() => setSelectedCompetitor(comp)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedCompetitor === comp
                  ? 'bg-[#531199] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {comp}
            </button>
          ))}
        </div>
      </div>

      {/* Strategic Questions Header */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-100/60 to-white border border-purple-200 text-xs text-gray-800">
        <span className="font-bold text-[#2D0C57] uppercase tracking-wide">Core AI Decision Mandate: </span>
        <span>"What did competitors publish recently that is relevant to mFilterIt?" and "What are competitors covering that mFilterIt does not cover?"</span>
      </div>

      {/* Event Cards */}
      <div className="space-y-4">
        {filtered.map(evt => (
          <div key={evt.id} className="bg-white rounded-xl border border-purple-200 p-5 shadow-2xs space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="text-[#971199] uppercase tracking-wide">{evt.competitorName}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 font-medium">{evt.eventDate}</span>
                  <span className="text-gray-300">•</span>
                  <span className="bg-purple-100 text-[#531199] px-2 py-0.2 rounded text-[10px] uppercase">
                    {evt.eventType.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="font-extrabold text-[#17131C] text-sm mt-1">
                  {evt.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Relevant to mFilterIt: Yes
                </span>
                <a 
                  href={evt.competitorUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs text-purple-700 hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Competitor Source</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* 4 Core Competitor Diagnosis Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                <div className="text-[10px] uppercase font-bold text-gray-500">1. What Happened?</div>
                <p className="text-gray-800 mt-1 font-medium leading-relaxed">{evt.whatHappened}</p>
              </div>

              <div className="p-3 rounded-lg bg-purple-50/50 border border-purple-200">
                <div className="text-[10px] uppercase font-bold text-[#531199]">2. Why is this relevant to mFilterIt?</div>
                <p className="text-gray-800 mt-1 font-medium leading-relaxed">{evt.relevanceReason}</p>
              </div>
            </div>

            {/* AI Prescribed Strategic Move */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-purple-50 to-white border border-purple-200 text-xs">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="text-[11px] font-extrabold text-[#2D0C57] uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#971199]" />
                  3. What Should mFilterIt Consider Doing?
                </div>
                <span className="font-bold text-purple-900 bg-white px-2 py-0.5 rounded text-[10px] border border-purple-200">
                  Prescription: {evt.mFilterItActionType.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-900 leading-snug">
                {evt.suggestedAction}
              </p>
              {evt.targetMFilterItPage && (
                <div className="mt-2 text-[11px] text-gray-600 flex items-center gap-1">
                  <strong className="text-purple-900">Target Asset to Upgrade: </strong>
                  <a href={evt.targetMFilterItPage} target="_blank" rel="noreferrer" className="text-purple-700 underline truncate">
                    {evt.targetMFilterItPage}
                  </a>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-gray-500">First-turn assessment: Upgrade existing asset over creating new URL</span>
              <button
                onClick={() => onExecuteAction(tasks[0])}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#531199] text-white text-xs font-bold hover:bg-[#6F1FB3] transition-all shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                <span>EXECUTE COUNTER-STRATEGY</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

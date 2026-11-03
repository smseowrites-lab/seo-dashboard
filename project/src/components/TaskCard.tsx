import React, { useState } from 'react';
import { 
  TaskRecommendation, 
  TaskStatus 
} from '../types';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  ArrowRight,
  ShieldAlert,
  Send,
  Share2,
  FileEdit,
  Check,
  X
} from 'lucide-react';

interface TaskCardProps {
  task: TaskRecommendation;
  onExecute: (task: TaskRecommendation) => void;
  onApprove?: (taskId: string) => void;
  onSkip?: (taskId: string) => void;
  onCreateCarousel?: (task: TaskRecommendation) => void;
  compact?: boolean;
  isSelected?: boolean;
  onToggleSelect?: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onExecute,
  onApprove,
  onSkip,
  onCreateCarousel,
  compact = false,
  isSelected = false,
  onToggleSelect
}) => {
  const [expanded, setExpanded] = useState(!compact);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
            HIGH PRIORITY
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            MEDIUM PRIORITY
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200">
            LOW PRIORITY
          </span>
        );
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'ai_detected':
        return <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">🟣 AI Detected</span>;
      case 'ai_recommended':
        return <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">🔵 AI Recommended</span>;
      case 'awaiting_approval':
        return <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">🟡 Awaiting Approval</span>;
      case 'ai_processing':
        return <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">⚙️ AI Processing</span>;
      case 'approved':
        return <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">🟢 Approved</span>;
      case 'completed':
        return <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">✅ Completed</span>;
      case 'needs_revision':
        return <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">🔴 Needs Revision</span>;
      case 'skipped':
        return <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">⚪ Skipped</span>;
    }
  };

  return (
    <div className={`bg-white rounded-xl border transition-all ${
      task.priority === 'high' 
        ? 'border-purple-200 shadow-sm hover:border-[#531199]/40' 
        : 'border-gray-200/80 hover:border-gray-300'
    } overflow-hidden`}>
      {/* Header bar */}
      <div className="p-4 bg-gradient-to-r from-[#F5F0FA]/60 to-white border-b border-[#E5DBEE]/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          {onToggleSelect && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelect(task.id)}
              className="mt-1 w-4 h-4 text-[#531199] rounded border-gray-300 focus:ring-[#531199] cursor-pointer"
              title="Select task"
            />
          )}
          <div className="mt-0.5">
            {getPriorityBadge(task.priority)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold text-[#531199] tracking-wide uppercase">
                {task.category} • {task.subcategory}
              </span>
              <span className="text-gray-300">|</span>
              {getStatusBadge(task.status)}
            </div>
            <h3 className="text-base font-extrabold text-[#17131C] mt-0.5 tracking-tight">
              {task.taskName}
            </h3>
            {task.url && (
              <a 
                href={task.url} 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-purple-700 hover:text-[#531199] inline-flex items-center gap-1 mt-0.5 font-medium hover:underline truncate max-w-md"
              >
                <span>{task.url}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            )}
          </div>
        </div>

        {/* Action / Expand Button */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
            title={expanded ? 'Collapse details' : 'Expand full diagnosis'}
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main 9-Point Mandatory Diagnosis Rule Body */}
      {expanded && (
        <div className="p-4 space-y-3.5 text-xs bg-white">
          {/* Signal & Evidence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-[#F5F0FA]/70 p-3 rounded-xl border border-purple-100">
            <div>
              <div className="text-[11px] font-bold text-[#2D0C57] flex items-center gap-1.5 uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#971199]" />
                1. Signal
              </div>
              <p className="text-gray-800 mt-1 font-medium leading-relaxed">
                {task.signal}
              </p>
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#2D0C57] flex items-center gap-1.5 uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#531199]" />
                2. Evidence
              </div>
              <p className="text-gray-800 mt-1 font-medium leading-relaxed">
                {task.evidence}
              </p>
            </div>
          </div>

          {/* Diagnosis & Reason */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-gray-200/80 bg-white">
              <div className="text-[11px] font-bold text-gray-700 flex items-center gap-1.5 uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                3. Diagnosis
              </div>
              <p className="text-gray-700 mt-1 leading-relaxed">
                {task.diagnosis}
              </p>
            </div>
            <div className="p-3 rounded-lg border border-purple-200 bg-purple-50/40">
              <div className="text-[11px] font-bold text-[#531199] flex items-center gap-1.5 uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-purple-600" />
                4. Why? (Strategic Reason)
              </div>
              <p className="text-gray-800 mt-1 font-medium leading-relaxed">
                {task.reason}
              </p>
            </div>
          </div>

          {/* Recommended Action, Channel & Expected Outcome */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-purple-50 via-white to-purple-50/30 border border-purple-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="text-[11px] font-extrabold text-[#2D0C57] flex items-center gap-1.5 uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#971199]" />
                5. Recommended Action
              </div>
              {task.channel && (
                <div className="text-[11px] font-bold text-purple-800 bg-white px-2 py-0.5 rounded-md border border-purple-200 shadow-2xs">
                  Channel: {task.channel}
                </div>
              )}
            </div>
            <p className="text-sm font-semibold text-gray-900 leading-snug">
              {task.recommendedAction}
            </p>
            
            <div className="mt-2 pt-2 border-t border-purple-200/60 flex items-center justify-between text-[11px] text-gray-600">
              <div>
                <span className="font-bold text-purple-900">Expected Outcome: </span>
                <span className="text-gray-700">{task.expectedOutcome}</span>
              </div>
              <div className="font-bold text-[#971199] shrink-0 ml-2">
                Approval Required: Yes
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Footer Buttons */}
      <div className="px-4 py-3 bg-[#FAF8FC] border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Primary Execution Button */}
          <button
            onClick={() => onExecute(task)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#531199] text-white text-xs font-bold hover:bg-[#6F1FB3] transition-all shadow-sm shadow-[#531199]/30 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-200" />
            <span>EXECUTE TASK</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </button>

          {/* Quick Context Actions */}
          {onCreateCarousel && (
            <button
              onClick={() => onCreateCarousel(task)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-purple-200 text-[#531199] text-xs font-semibold hover:bg-purple-50 transition-all"
            >
              <Share2 className="w-3.5 h-3.5 text-[#971199]" />
              <span>CREATE CAROUSEL</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onApprove && task.status === 'awaiting_approval' && (
            <button
              onClick={() => onApprove(task.id)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>APPROVE</span>
            </button>
          )}

          {onSkip && (
            <button
              onClick={() => onSkip(task.id)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 text-xs font-semibold transition-all"
            >
              <X className="w-3 h-3" />
              <span>SKIP</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { AuditLogEntry } from '../types';
import { 
  History, 
  Clock, 
  CheckCircle2, 
  Database, 
  FileText, 
  Sparkles, 
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';

interface ActivityLogViewProps {
  logs: AuditLogEntry[];
}

export const ActivityLogView: React.FC<ActivityLogViewProps> = ({ logs }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = logs.filter(l => 
    l.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.recommendation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#531199] uppercase tracking-wider">
              <History className="w-4 h-4" />
              <span>Full Audit Traceability</span>
            </div>
            <h2 className="text-2xl font-black text-[#2D0C57] tracking-tight mt-1">
              AI Activity & Compliance Audit Log
            </h2>
            <p className="text-xs text-gray-600 mt-1 max-w-3xl">
              Immutable ledger of every AI decision: exactly which data was inspected, the strategic reason, the AI drafted output, and human approval state.
            </p>
          </div>

          <div className="bg-[#F5F0FA] px-4 py-2 rounded-xl border border-purple-200 text-right">
            <div className="text-[10px] text-gray-500 font-semibold uppercase">Total Actions Logged</div>
            <div className="text-xl font-black text-[#531199]">{logs.length} Operations</div>
          </div>
        </div>

        {/* Search */}
        <div className="mt-4 flex items-center gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search audit trail by task or category..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-[#531199]"
            />
          </div>
        </div>
      </div>

      {/* Audit Log Entries List */}
      <div className="space-y-4">
        {filtered.map(log => (
          <div key={log.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-2xs space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="text-gray-500">{log.timestamp}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-[#531199] font-bold uppercase text-[10px]">{log.category}</span>
                </div>
                <h3 className="font-extrabold text-[#17131C] text-sm mt-0.5">
                  {log.taskName}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-purple-900 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                  {log.userApproval}
                </span>
              </div>
            </div>

            {/* Audit Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {/* Data Used */}
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                <div className="text-[10px] uppercase font-bold text-gray-500 mb-1 flex items-center gap-1">
                  <Database className="w-3 h-3 text-[#531199]" />
                  <span>Data Signals Used</span>
                </div>
                <ul className="space-y-1 text-gray-700 font-medium">
                  {log.dataUsed.map((d, i) => (
                    <li key={i} className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#531199]" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendation & Reason */}
              <div className="p-3 rounded-lg bg-purple-50/40 border border-purple-100 md:col-span-2">
                <div className="text-[10px] uppercase font-bold text-[#531199] mb-1">
                  Diagnosis & Strategic Reason
                </div>
                <div className="font-semibold text-gray-900 leading-snug">
                  {log.recommendation}
                </div>
                <div className="mt-1.5 text-gray-700 text-[11px] leading-relaxed">
                  <strong className="text-purple-950">Reason: </strong> {log.reason}
                </div>
              </div>
            </div>

            {/* Output Snippet */}
            <div className="p-3 rounded-lg bg-[#FAF8FC] border border-gray-200 text-xs text-gray-700 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#971199] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#2D0C57]">Generated Asset Summary: </strong>
                <span>{log.aiOutputSnippet}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

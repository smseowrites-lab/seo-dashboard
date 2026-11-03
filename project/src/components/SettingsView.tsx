import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  UserCheck, 
  Sliders, 
  CheckCircle2, 
  KeyRound, 
  Bell, 
  Database,
  Lock
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [autoTriage, setAutoTriage] = useState(true);
  const [notifyCompetitorDrop, setNotifyCompetitorDrop] = useState(true);
  const [requireExecutiveApproval, setRequireExecutiveApproval] = useState(true);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#531199] uppercase tracking-wider">
          <Settings className="w-4 h-4" />
          <span>System Governance & Guardrails</span>
        </div>
        <h2 className="text-2xl font-black text-[#2D0C57] tracking-tight mt-1">
          Platform Configuration & Approval Policies
        </h2>
        <p className="text-xs text-gray-600 mt-1">
          Configure autonomous agent triage rules, human-in-the-loop review mandates, and domain authorization.
        </p>
      </div>

      {/* Human Approval Mandate Policy */}
      <div className="bg-white rounded-xl border border-purple-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-sm font-extrabold text-[#2D0C57] uppercase tracking-wide">
          <ShieldCheck className="w-5 h-5 text-[#531199]" />
          Human Approval Guardrails (Zero-Blind-Publishing Rule)
        </div>
        <p className="text-xs text-gray-700 leading-relaxed">
          In compliance with mFilterIt governance standards, autonomous agents are strictly forbidden from publishing to production CMS, deploying live server redirects, or posting to external platforms without explicit user sign-off.
        </p>

        <div className="space-y-3 pt-2">
          <label className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-purple-200 cursor-pointer text-xs">
            <div>
              <div className="font-bold text-gray-900">Mandate Review for All Website CMS Updates</div>
              <div className="text-gray-500 text-[11px]">Require Minakshi approval before modifying live blog URLs or schemas.</div>
            </div>
            <input
              type="checkbox"
              checked={requireExecutiveApproval}
              onChange={e => setRequireExecutiveApproval(e.target.checked)}
              className="w-4 h-4 rounded text-[#531199] focus:ring-[#531199]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-purple-200 cursor-pointer text-xs">
            <div>
              <div className="font-bold text-gray-900">Autonomous GSC Decay Triage</div>
              <div className="text-gray-500 text-[11px]">Automatically generate diagnostic task cards when impressions drop &gt; 20%.</div>
            </div>
            <input
              type="checkbox"
              checked={autoTriage}
              onChange={e => setAutoTriage(e.target.checked)}
              className="w-4 h-4 rounded text-[#531199] focus:ring-[#531199]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-purple-200 cursor-pointer text-xs">
            <div>
              <div className="font-bold text-gray-900">Competitor Publication Radar Alerts</div>
              <div className="text-gray-500 text-[11px]">Notify when CHEQ, AppsFlyer, DoubleVerify publish competing articles.</div>
            </div>
            <input
              type="checkbox"
              checked={notifyCompetitorDrop}
              onChange={e => setNotifyCompetitorDrop(e.target.checked)}
              className="w-4 h-4 rounded text-[#531199] focus:ring-[#531199]"
            />
          </label>
        </div>
      </div>

      {/* Target Domain Configuration */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4">
        <h3 className="font-extrabold text-sm text-[#2D0C57] uppercase tracking-wide">
          Connected Domain Architecture
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 block mb-1">Primary Production Domain</label>
            <input
              type="text"
              readOnly
              value="https://www.mfilterit.com"
              className="w-full bg-gray-50 p-2.5 rounded-lg border border-gray-300 font-mono text-gray-800"
            />
          </div>
          <div>
            <label className="font-bold text-gray-700 block mb-1">XML Sitemap Hub</label>
            <input
              type="text"
              readOnly
              value="https://www.mfilterit.com/sitemap_index.xml"
              className="w-full bg-gray-50 p-2.5 rounded-lg border border-gray-300 font-mono text-gray-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

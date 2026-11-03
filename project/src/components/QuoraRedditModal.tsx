import React, { useState, useEffect } from 'react';
import { 
  X, 
  HelpCircle, 
  MessageSquare, 
  Sparkles, 
  Check, 
  Copy, 
  ShieldCheck, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Send,
  Edit3
} from 'lucide-react';
import { CompetitorPromptService, CompetitorPromptItem } from '../services/competitorPromptService';

interface QuoraRedditModalProps {
  isOpen: boolean;
  type: 'quora' | 'reddit';
  onClose: () => void;
}

export const QuoraRedditModal: React.FC<QuoraRedditModalProps> = ({
  isOpen,
  type,
  onClose
}) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'quora' | 'reddit'>(type);
  
  // Daily Quora Prompts State
  const [dailyQuoraPrompts, setDailyQuoraPrompts] = useState<CompetitorPromptItem[]>([]);
  const [activePromptIndex, setActivePromptIndex] = useState<number>(0);
  const [editedAnswer, setEditedAnswer] = useState<string>('');
  const [currentStatus, setCurrentStatus] = useState<'Pending' | 'In Progress' | 'Answered'>('Pending');

  useEffect(() => {
    loadDailyQuoraData();
  }, [isOpen]);

  const loadDailyQuoraData = () => {
    const recommended = CompetitorPromptService.getDailyQuoraPrompts();
    setDailyQuoraPrompts(recommended);
    if (recommended.length > 0) {
      setActivePromptIndex(0);
      setEditedAnswer(recommended[0].suggestedAnswer);
      setCurrentStatus(recommended[0].status === 'Unused' ? 'Pending' : recommended[0].status);
    }
  };

  const handlePromptChangeIndex = (index: number) => {
    if (index >= 0 && index < dailyQuoraPrompts.length) {
      setActivePromptIndex(index);
      const current = dailyQuoraPrompts[index];
      setEditedAnswer(current.suggestedAnswer);
      setCurrentStatus(current.status === 'Unused' ? 'Pending' : current.status);
    }
  };

  const currentPrompt = dailyQuoraPrompts[activePromptIndex];

  // Reddit Controlled Risk Assessment Data
  const redditSubreddit = 'r/PPC (184k members)';
  const redditThread = 'High conversion rates on Performance Max leads, but sales team says 70% of phone numbers are fake/disconnected? Anyone else?';
  const redditRecommendation = 'ANSWER (Strictly Non-Promotional)';
  const redditResponse = `This is a textbook automated lead injection pattern common in Performance Max when asset group placements expand into untracked display networks.

Here is what's typically happening and how to fix it:

1. The Loop: Bots scrape your form fields, input realistic names with invalid/burner phone numbers, and trigger the conversion pixel. Google's algorithm sees a "successful conversion" and optimizes by bidding on more bot traffic from the same placement source.
2. Immediate Fix: Temporarily disable enhanced conversions until you implement server-side validation.
3. Offline Conversion Hygiene: Do not fire the lead conversion on simple form submit. Instead, pass conversions back to Google Ads via the Offline Conversions API only after phone verification (e.g. OTP or initial CRM sales stage validation).
4. Exclusions: Audit your placement report and aggressively exclude low-quality mobile app domains in your account content settings.

Hope this helps isolate the budget bleed!`;

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    // Save status as In Progress or Answered upon copy
    if (activeTab === 'quora' && currentPrompt) {
      CompetitorPromptService.updatePrompt(currentPrompt.id, {
        suggestedAnswer: editedAnswer,
        status: currentStatus === 'Pending' ? 'In Progress' : currentStatus,
        lastUsedDate: new Date().toLocaleDateString()
      });
    }
  };

  const handleSaveStatusChange = (newStatus: 'Pending' | 'In Progress' | 'Answered') => {
    setCurrentStatus(newStatus);
    if (currentPrompt) {
      CompetitorPromptService.updatePrompt(currentPrompt.id, {
        status: newStatus,
        suggestedAnswer: editedAnswer
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-purple-200 relative my-6 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 pb-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${activeTab === 'quora' ? 'bg-red-50 text-red-700' : 'bg-orange-50 text-orange-700'}`}>
              {activeTab === 'quora' ? <HelpCircle className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border bg-purple-50 text-[#531199] border-purple-200">
                  {activeTab === 'quora' ? 'Competitor Prompt Quora Agent' : 'Controlled Reddit Risk Triage'}
                </span>
              </div>
              <h2 className="text-lg font-black text-[#2D0C57] tracking-tight mt-0.5">
                {activeTab === 'quora' ? 'Daily Competitor Prompt Answer Creation' : 'Strict Non-Promotional Community Contribution'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-between py-2 border-b border-gray-100 shrink-0 text-xs font-bold">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('quora')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'quora' ? 'bg-[#531199] text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Quora Prompts ({dailyQuoraPrompts.length})
            </button>
            <button
              onClick={() => setActiveTab('reddit')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'reddit' ? 'bg-[#531199] text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Reddit Guardrail Agent
            </button>
          </div>

          {/* Prompt Selector if multiple daily Quora prompts exist */}
          {activeTab === 'quora' && dailyQuoraPrompts.length > 1 && (
            <div className="flex items-center gap-1.5 bg-purple-50 p-1 rounded-xl border border-purple-200 text-xs">
              <span className="text-[11px] font-bold text-purple-900 px-1">
                Prompt {activePromptIndex + 1} of {dailyQuoraPrompts.length}
              </span>
              <button
                disabled={activePromptIndex === 0}
                onClick={() => handlePromptChangeIndex(activePromptIndex - 1)}
                className="p-1 rounded bg-white hover:bg-purple-100 disabled:opacity-40"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                disabled={activePromptIndex === dailyQuoraPrompts.length - 1}
                onClick={() => handlePromptChangeIndex(activePromptIndex + 1)}
                className="p-1 rounded bg-white hover:bg-purple-100 disabled:opacity-40"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs">
          {activeTab === 'quora' ? (
            dailyQuoraPrompts.length === 0 ? (
              <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                <HelpCircle className="w-8 h-8 text-gray-400 mx-auto" />
                <h3 className="font-extrabold text-gray-800 text-sm">No Suitable Unused Prompts Available</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Upload a sample Word document (.docx) or CSV file in the AEO Optimization module to add new competitor prompts to your library.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Prompt Metadata Card */}
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-purple-100 text-[#531199] border border-purple-200 font-extrabold text-[11px]">
                        {currentPrompt.product}
                      </span>
                      <span className="text-xs font-semibold text-gray-600">
                        Topic: {currentPrompt.topic}
                      </span>
                    </div>

                    {/* Status Toggle */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-gray-500">Status:</span>
                      <select
                        value={currentStatus}
                        onChange={(e) => handleSaveStatusChange(e.target.value as any)}
                        className="px-2.5 py-1 rounded-lg border border-purple-300 text-xs font-bold bg-white text-purple-900 focus:outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Answered">Answered</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Target Competitor Prompt / Question:
                    </span>
                    <h3 className="font-black text-[#2D0C57] text-sm mt-0.5">
                      "{currentPrompt.prompt}"
                    </h3>
                  </div>

                  <p className="text-[11px] text-gray-600 pt-1">
                    <strong>Relevance Context:</strong> {currentPrompt.relevanceReason}
                  </p>
                </div>

                {/* Draft Answer Editor */}
                <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-extrabold text-[#531199] uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#E3B624]" />
                      <span>Optimized Direct Answer (Editable & Ready to Post)</span>
                    </span>
                    <span className="text-[10px] text-gray-500 lowercase font-medium">natural practitioner style</span>
                  </div>

                  <textarea
                    rows={8}
                    value={editedAnswer}
                    onChange={(e) => setEditedAnswer(e.target.value)}
                    className="w-full bg-white p-3.5 rounded-lg border border-purple-200 text-xs text-gray-900 leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#531199]"
                  />
                </div>

                {/* Verified Source URL */}
                <div className="p-3 rounded-xl bg-[#F5F0FA] border border-purple-100 text-xs flex items-center justify-between">
                  <span className="font-bold text-[#2D0C57] text-[11px] uppercase">Verified Source URL:</span>
                  <a
                    href={currentPrompt.verifiedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[#531199] hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>{currentPrompt.verifiedUrl}</span>
                    <ExternalLink className="w-3 h-3 text-purple-400" />
                  </a>
                </div>
              </div>
            )
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-orange-50 to-white border border-orange-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-orange-900 uppercase text-[11px] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Reddit Anti-Spam Guardrail Evaluation
                  </span>
                  <span className="font-black text-xs text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    OUTPUT: {redditRecommendation}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div><strong>Subreddit: </strong> {redditSubreddit}</div>
                  <div><strong>Promotional Risk: </strong> Minimal (Zero backlink insertion)</div>
                  <div><strong>Rule Check: </strong> Strictly complies with No-Self-Promotion policy</div>
                  <div><strong>Genuine Value: </strong> Step-by-step engineering troubleshoot</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                <div className="text-[10px] uppercase font-bold text-gray-500 mb-1">Target Discussion Thread:</div>
                <h3 className="font-bold text-gray-900 text-xs leading-snug">"{redditThread}"</h3>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                <div className="text-[11px] font-bold text-gray-700 uppercase">
                  Approved Non-Promotional Community Response:
                </div>
                <textarea
                  rows={8}
                  defaultValue={redditResponse}
                  className="w-full bg-white p-3 rounded-lg border border-gray-300 text-xs text-gray-900 leading-relaxed focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between shrink-0">
          <button
            disabled={activeTab === 'quora' && dailyQuoraPrompts.length === 0}
            onClick={() => copyText(activeTab === 'quora' ? editedAnswer : redditResponse)}
            className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 bg-[#531199] hover:bg-[#6F1FB3] text-white rounded-xl transition-all shadow-sm disabled:opacity-50"
          >
            {copied ? <Check className="w-4 h-4 text-[#E3B624]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Answer to Clipboard' : 'Copy Answer for Manual Posting'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-100"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

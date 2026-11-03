import React, { useState } from 'react';
import { TaskRecommendation, InternalLinkOpportunity } from '../types';
import { INTERNAL_LINKS_DATA } from '../data/mockData';
import { 
  REPHRASE_STYLES, 
  RephraseOption, 
  generateRephrasedText 
} from '../services/aiService';
import { 
  X, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Copy, 
  RotateCcw, 
  ExternalLink, 
  HelpCircle, 
  Cpu, 
  FileText, 
  Share2, 
  CheckCircle2,
  Sliders,
  Layers,
  Link2
} from 'lucide-react';

interface ExecutionModalProps {
  task: TaskRecommendation | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (taskId: string, outputSummary: string) => void;
}

export const ExecutionModal: React.FC<ExecutionModalProps> = ({
  task,
  isOpen,
  onClose,
  onComplete
}) => {
  if (!isOpen || !task) return null;

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedStyle, setSelectedStyle] = useState<RephraseOption['style']>('Professional');
  const [internalLinks, setInternalLinks] = useState<InternalLinkOpportunity[]>(INTERNAL_LINKS_DATA);
  const [copied, setCopied] = useState(false);
  const [revisedContentText, setRevisedContentText] = useState<string>(
    `In 2026, over 22% of clicks from automated Advantage+ campaigns originate from sophisticated bot networks mimicking real buyer intent. To safeguard advertising investments, enterprise marketing leadership must implement third-party verification protocols that independently audit impressions, clicks, and post-click conversion events across both web and mobile environments.`
  );

  const originalContentText = `In today's fast-paced digital marketing landscape, click fraud on Meta ads is becoming a severe problem. Many businesses use Meta ads to reach potential customers. However, fraudulent clicks by competitors and bots waste your ad budget and hurt your return on investment. Our cutting-edge AI platform stops fraud effectively.`;

  const handleApplyLink = (linkId: string) => {
    setInternalLinks(prev => prev.map(l => l.id === linkId ? { ...l, status: 'applied' } : l));
  };

  const handleRejectLink = (linkId: string) => {
    setInternalLinks(prev => prev.map(l => l.id === linkId ? { ...l, status: 'rejected' } : l));
  };

  const handleRephraseStyle = (style: RephraseOption['style']) => {
    setSelectedStyle(style);
    setRevisedContentText(generateRephrasedText(originalContentText, style));
  };

  const handleFinish = () => {
    onComplete(task.id, 'Optimized content refreshed + 3 internal links mapped + AEO/GEO injected.');
    onClose();
  };

  const copyFinal = () => {
    navigator.clipboard.writeText(revisedContentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { num: 1, title: 'Diagnosis & Gaps' },
    { num: 2, title: 'Drafted Content' },
    { num: 3, title: 'Rephrase & Humanize' },
    { num: 4, title: 'Internal Links' },
    {num: 5, title: 'AEO & Citation Injection'},
    { num: 6, title: 'Final Approval' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-purple-200 relative my-6 max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-gray-100 pb-4 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#531199] text-white uppercase">
                {task.category} Execution Agent
              </span>
              <span className="text-xs text-gray-400">Task ID: {task.id}</span>
            </div>
            <h2 className="text-lg font-black text-[#2D0C57] tracking-tight mt-1">
              {task.taskName}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progression Bar */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100 shrink-0 overflow-x-auto text-xs">
          {steps.map(s => (
            <div
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`flex items-center gap-1.5 cursor-pointer px-2 py-1 rounded-md transition-all whitespace-nowrap ${
                currentStep === s.num
                  ? 'bg-purple-50 text-[#531199] font-bold'
                  : currentStep > s.num
                  ? 'text-emerald-700 font-semibold'
                  : 'text-gray-400'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                currentStep === s.num ? 'bg-[#531199] text-white' :
                currentStep > s.num ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > s.num ? '✓' : s.num}
              </span>
              <span>{s.title}</span>
            </div>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs">
          {/* STEP 1: Diagnosis & Gaps */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#F5F0FA] border border-purple-200">
                <h3 className="font-extrabold text-[#2D0C57] text-sm mb-2">
                  Unified Intelligence Findings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <strong className="text-[#531199]">1. Signal: </strong>
                    <span className="text-gray-800">{task.signal}</span>
                  </div>
                  <div>
                    <strong className="text-[#531199]">2. Evidence: </strong>
                    <span className="text-gray-800">{task.evidence}</span>
                  </div>
                  <div>
                    <strong className="text-amber-800">3. Diagnosis: </strong>
                    <span className="text-gray-800">{task.diagnosis}</span>
                  </div>
                  <div>
                    <strong className="text-purple-900">4. Strategic Reason: </strong>
                    <span className="text-gray-800">{task.reason}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-white">
                <h4 className="font-bold text-[#17131C] text-xs uppercase mb-2">
                  AI Prescribed Optimization Plan
                </h4>
                <ul className="space-y-2 text-gray-700 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Incorporate Meta Advantage+ 2026 bot vector case study (headless browser pixel triggering).</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Inject 3 modular direct answer blocks for Google Featured Snippet and PAA queries.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Connect 3 thematic internal links to high-intent conversion hubs.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Include structured FAQPage and Organization Schema JSON-LD.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* STEP 2: Drafted Content Creation */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-200">
                <div className="text-[10px] uppercase font-bold text-[#531199]">Target H1 Heading</div>
                <h3 className="text-base font-black text-[#17131C] mt-0.5">
                  Meta Ads Click Fraud Detection: How Advantage+ Campaigns Bleed Budget to Bot Networks in 2026
                </h3>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-3">
                <div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Meta Title & Description</div>
                  <div className="font-bold text-[#2D0C57] mt-0.5">Meta Ads Click Fraud Detection & Protection Guide (2026) | mFilterIt</div>
                  <p className="text-gray-600 text-[11px] mt-0.5">
                    Learn how automated Advantage+ algorithms are gamed by invalid traffic, and discover 3 proven verification steps to recover wasted ROAS.
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <div className="text-[10px] uppercase font-bold text-gray-400">H2: The Advantage+ Black Box Vulnerability</div>
                  <p className="text-gray-800 leading-relaxed mt-1">
                    Meta algorithms are engineered to allocate budget where early conversions happen fastest. When bot networks trigger synthetic micro-conversions (add-to-cart, initiate checkout, fake leads), Meta automated bidding machine learning assumes it found high-value buyer clusters and redirects up to 40% of media spend into bot-dominated placements.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Rephrase & Humanize */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <div className="text-xs font-bold text-[#2D0C57] mb-2 uppercase">
                  Select Desired Rephrase Tone / Persona:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {REPHRASE_STYLES.map(s => (
                    <button
                      key={s.style}
                      onClick={() => handleRephraseStyle(s.style)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedStyle === s.style
                          ? 'bg-[#531199] text-white shadow-xs'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {s.style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">Original Draft</div>
                  <p className="text-gray-700 leading-relaxed font-mono text-[11px]">
                    {originalContentText}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200">
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold text-[#531199] mb-1">
                    <span>AI Revised ({selectedStyle} Tone)</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#971199]" />
                  </div>
                  <textarea
                    rows={6}
                    value={revisedContentText}
                    onChange={e => setRevisedContentText(e.target.value)}
                    className="w-full bg-white p-2.5 rounded-lg border border-purple-200 text-xs font-medium text-gray-900 leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#531199]"
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">Edit freely above or click regenerate</span>
                    <button
                      onClick={() => handleRephraseStyle(selectedStyle)}
                      className="text-xs text-purple-700 hover:text-[#531199] font-bold flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Regenerate Variant</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Internal Linking Agent */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="text-xs font-semibold text-gray-600">
                AI analyzed 84 published mFilterIt URLs and detected 3 high-authority semantic bridge opportunities:
              </div>

              <div className="space-y-3">
                {internalLinks.map(link => (
                  <div key={link.id} className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-extrabold text-[#2D0C57] text-xs">
                        Target Page: <span className="text-[#531199]">{link.targetPageTitle}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        link.status === 'applied' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        link.status === 'rejected' ? 'bg-gray-100 text-gray-500' :
                        'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {link.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <strong className="text-gray-700">Suggested Anchor: </strong>
                        <span className="bg-purple-100 text-[#531199] px-1.5 py-0.2 rounded font-bold">"{link.suggestedAnchor}"</span>
                      </div>
                      <div>
                        <strong className="text-gray-700">Target URL: </strong>
                        <span className="text-purple-700 underline truncate">{link.targetUrl}</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-gray-600 bg-[#F5F0FA] p-2 rounded">
                      <strong>Contextual Reason: </strong> {link.reason}
                    </div>

                    <div className="flex items-center gap-2 pt-1 justify-end">
                      <button
                        onClick={() => handleRejectLink(link.id)}
                        className="px-2.5 py-1 rounded text-[11px] font-semibold text-gray-600 hover:bg-gray-100"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleApplyLink(link.id)}
                        className="px-3 py-1 rounded bg-[#531199] text-white text-[11px] font-bold hover:bg-[#6F1FB3]"
                      >
                        Apply Recommendation
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: AEO & Citation Injection */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-2">
                <div className="font-bold text-[#531199] uppercase text-[11px] flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>AEO Direct Answer Block (Featured Snippet Targeting)</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 bg-white p-3 rounded-lg border border-purple-200">
                  "Fraudsters fake Meta Advantage+ conversions using automated headless browsers that trigger synthetic Add-to-Cart and Lead events, tricking Meta algorithmic machine learning into allocating ad budget toward bot-infested placements rather than genuine buyers."
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <div className="font-bold text-emerald-900 uppercase text-[11px] flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>AI Engine Citation & Perplexity Reference Block</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 bg-white p-3 rounded-lg border border-emerald-200">
                  "According to mFilterIt 2026 Ad Traffic Verification benchmarks, automated social media campaigns experience an average invalid traffic (IVT) rate of 18.4%, with headless browser emulations accounting for 64% of total fraudulent impressions."
                </p>
              </div>
            </div>
          )}

          {/* STEP 6: Final Review & Approval */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-white border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Task Ready For Final Human Sign-off</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  All signals have been reconciled. The optimized content contains modern 2026 Advantage+ bot vectors, 
                  crisp 45-word direct answer blocks for AEO snippet capture, verified statistical entity benchmarks for Perplexity GEO citation, 
                  and 3 approved contextual internal links.
                </p>

                <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-emerald-900">
                  <span className="bg-white px-2.5 py-1 rounded border border-emerald-200">✓ SEO Refreshed</span>
                  <span className="bg-white px-2.5 py-1 rounded border border-emerald-200">✓ AEO Blocks Injected</span>
                  <span className="bg-white px-2.5 py-1 rounded border border-emerald-200">✓ Entity Benchmarks Verified</span>
                  <span className="bg-white px-2.5 py-1 rounded border border-emerald-200">✓ Internal Links Mapped</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between shrink-0">
          <button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-100 disabled:opacity-30"
          >
            Previous Step
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={copyFinal}
              className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Output'}</span>
            </button>

            {currentStep < 6 ? (
              <button
                onClick={() => setCurrentStep(prev => Math.min(6, prev + 1))}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#531199] text-white text-xs font-bold hover:bg-[#6F1FB3] transition-all shadow-xs"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-black hover:bg-emerald-700 transition-all shadow-md active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>APPROVE & COMPLETE TASK</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

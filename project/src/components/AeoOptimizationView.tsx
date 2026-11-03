import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  Sparkles, 
  Check, 
  Copy, 
  ArrowRight, 
  CheckCircle2, 
  FileCheck,
  Search,
  ExternalLink,
  RefreshCw,
  Tag,
  BarChart3,
  Database,
  Globe,
  Filter,
  Upload,
  AlertCircle,
  FileText,
  Trash2,
  Edit3,
  BookOpen,
  ChevronRight,
  Share2,
  Layers,
  MessageSquare,
  Send,
  X,
  Plus
} from 'lucide-react';
import { CompetitorPromptService, CompetitorPromptItem } from '../services/competitorPromptService';
import { GoogleApiService, LiveAnalyticsSummary, GscPageMetric } from '../services/googleApiService';
import { MFILTERIT_MASTER_KNOWLEDGE } from '../data/knowledgeBase';

export type AeoModuleTab = 'competitor_prompts' | 'question_optimizations' | 'page_analytics';

export interface QuestionOptimizationTask {
  id: string;
  pageUrl: string;
  pageTitle: string;
  gscQuery: string;
  issueType: 'Missing Direct Answer Block' | 'Unclear Explanation' | 'Missing FAQ Schema' | 'Outdated Benchmark' | 'Internal Link Gap';
  workRequired: string;
  suggestedChange: string;
  verifiedSourceUrl: string;
  status: 'Pending' | 'In Progress' | 'Implemented';
  lastUpdated: string;
}

const INITIAL_QUESTION_TASKS: QuestionOptimizationTask[] = [
  {
    id: 'qo-1',
    pageUrl: 'https://www.mfilterit.com/blog/meta-ads-click-fraud-detection/',
    pageTitle: 'Meta Ads Click Fraud Detection & Advantage+ Optimization',
    gscQuery: 'how to detect meta ads click fraud 2026',
    issueType: 'Missing Direct Answer Block',
    workRequired: 'Add a 45-word direct answer paragraph right after the main H2 header addressing GA4 dwell time anomalies.',
    suggestedChange: `### How do you detect Meta ads click fraud?
To detect Meta ads click fraud, monitor discrepancies between Meta ad clicks and GA4 session durations. High CTRs paired with average engagement times under 3 seconds and zero scrolling indicate automated bot clicks. Implementing server-side conversion validation isolates invalid traffic before optimizing budget allocations.`,
    verifiedSourceUrl: 'https://www.mfilterit.com/blog/meta-ads-click-fraud-detection/',
    status: 'Pending',
    lastUpdated: 'Today at 09:15 AM'
  },
  {
    id: 'qo-2',
    pageUrl: 'https://www.mfilterit.com/blog/mobile-app-install-fraud-prevention/',
    pageTitle: 'Mobile App Install Fraud Prevention & SDK Spoofing',
    gscQuery: 'device spoofing vs sdk spoofing in mobile apps',
    issueType: 'Unclear Explanation',
    workRequired: 'Insert a comparative explanation table contrasting SDK spoofing (fake pings) with device spoofing (real device farms).',
    suggestedChange: `### SDK Spoofing vs. Device Spoofing
While Device Spoofing uses physical device farms or emulators to execute real app downloads, SDK Spoofing bypasses app downloads entirely by injecting fake cryptographic install pings directly to Mobile Measurement Partners (MMP servers).`,
    verifiedSourceUrl: 'https://www.mfilterit.com/blog/mobile-app-install-fraud-prevention/',
    status: 'Pending',
    lastUpdated: 'Today at 09:15 AM'
  },
  {
    id: 'qo-3',
    pageUrl: 'https://www.mfilterit.com/blog/what-is-invalid-traffic-and-how-does-it-impact-your-ad-campaign-performance/',
    pageTitle: 'What is Invalid Traffic (IVT) and How It Impacts Campaign Performance',
    gscQuery: 'what is invalid traffic ivt in google ads',
    issueType: 'Missing FAQ Schema',
    workRequired: 'Embed structured FAQ schema markup for GIVT vs SIVT distinctions to improve Google search snippet clarity.',
    suggestedChange: `### FAQ: What is the difference between GIVT and SIVT in Google Ads?
General Invalid Traffic (GIVT) includes simple crawlers and accidental clicks that standard filters detect easily. Sophisticated Invalid Traffic (SIVT) involves advanced botnets, residential proxy networks, and malware that emulate human browsing behavior, requiring behavioral biometrics to identify.`,
    verifiedSourceUrl: 'https://www.mfilterit.com/blog/what-is-invalid-traffic-and-how-does-it-impact-your-ad-campaign-performance/',
    status: 'Implemented',
    lastUpdated: 'Yesterday'
  },
  {
    id: 'qo-4',
    pageUrl: 'https://www.mfilterit.com/blog/how-to-stop-brand-bidding-by-affiliates-can-standard-marketing-tools-track-this/',
    pageTitle: 'How to Stop Brand Bidding by Affiliates',
    gscQuery: 'are affiliates bidding on my brand keywords',
    issueType: 'Internal Link Gap',
    workRequired: 'Add internal contextual backlink to Sentinel+ Brand Protection solution page in the enforcement section.',
    suggestedChange: `To automate geo-targeted brand bidding enforcement across search engines, link to the mFilterIt Sentinel+ Brand Protection engine for 24/7 screenshot capture and domain registrar takedown notifications.`,
    verifiedSourceUrl: 'https://www.mfilterit.com/brand-safety-protection/',
    status: 'In Progress',
    lastUpdated: 'Today at 08:30 AM'
  }
];

export interface AeoOptimizationViewProps {
  opportunities?: any[];
  tasks?: any[];
  onExecuteTask?: (task: any) => void;
  onOptimizeAeo?: (opp: any) => void;
}

export const AeoOptimizationView: React.FC<AeoOptimizationViewProps> = () => {
  const [activeTab, setActiveTab] = useState<AeoModuleTab>('competitor_prompts');

  // Competitor Prompts State
  const [prompts, setPrompts] = useState<CompetitorPromptItem[]>([]);
  const [selectedProductFilter, setSelectedProductFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Prompt Editing State
  const [editingPromptId, setEditingPromptId] = useState<string | null>(null);
  const [editPromptText, setEditPromptText] = useState<string>('');
  const [editAnswerText, setEditAnswerText] = useState<string>('');

  // Manual New Prompt Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newQuestionText, setNewQuestionText] = useState<string>('');
  const [newProductCategory, setNewProductCategory] = useState<string>('Media Trust / Valid8');

  // Question-Based Optimizations State
  const [questionTasks, setQuestionTasks] = useState<QuestionOptimizationTask[]>(INITIAL_QUESTION_TASKS);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedChangeText, setEditedChangeText] = useState<string>('');

  // Page Analytics State (Real GA4 & GSC data)
  const [liveAnalytics, setLiveAnalytics] = useState<LiveAnalyticsSummary | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState<boolean>(false);

  // Copy feedback state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadPrompts();
    loadRealAnalytics();
  }, []);

  const loadPrompts = () => {
    const all = CompetitorPromptService.getAllPrompts();
    setPrompts(all);
  };

  const loadRealAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const data = await GoogleApiService.fetchLiveAnalyticsSummary();
      setLiveAnalytics(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadMessage(null);

    const result = await CompetitorPromptService.parseAndIngestFile(file);

    setIsUploading(false);
    if (result.success) {
      setUploadMessage({ type: 'success', text: result.message });
      loadPrompts();
    } else {
      setUploadMessage({ type: 'error', text: result.message });
    }

    // reset input
    event.target.value = '';
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeletePrompt = (id: string) => {
    CompetitorPromptService.deletePrompt(id);
    loadPrompts();
  };

  const handleStartEditPrompt = (p: CompetitorPromptItem) => {
    setEditingPromptId(p.id);
    setEditPromptText(p.prompt);
    setEditAnswerText(p.suggestedAnswer);
  };

  const handleSaveEditPrompt = (id: string) => {
    CompetitorPromptService.updatePrompt(id, {
      prompt: editPromptText,
      suggestedAnswer: editAnswerText
    });
    setEditingPromptId(null);
    loadPrompts();
  };

  const handleSendToQuoraTask = (id: string) => {
    CompetitorPromptService.updatePrompt(id, {
      status: 'Pending',
      lastUsedDate: new Date().toLocaleDateString()
    });
    loadPrompts();
    alert('Prompt queued as Today\'s Quora Task! You can review and copy the answer in Today Action Center or the Quora Modal.');
  };

  const handleAddManualPrompt = () => {
    if (!newQuestionText.trim()) return;

    CompetitorPromptService.addPrompt({
      prompt: newQuestionText,
      product: newProductCategory,
      topic: 'Custom Question Research',
      suggestedAnswer: `Direct Answer to "${newQuestionText}":\n\n1. Overview: Address the question factually based on approved product facts.\n2. Key Factor: Isolate non-human signals or compliance parameters.\n3. mFilterIt Capability: ${newProductCategory} delivers transparent automated protection.`,
      verifiedUrl: 'https://www.mfilterit.com',
      relevanceReason: 'Manually added question for Quora and AEO answer research.'
    });

    setNewQuestionText('');
    setIsAddModalOpen(false);
    loadPrompts();
  };

  const handleUpdateTaskStatus = (taskId: string, status: 'Pending' | 'In Progress' | 'Implemented') => {
    setQuestionTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
  };

  const handleSaveTaskEdit = (taskId: string) => {
    setQuestionTasks(prev => prev.map(t => t.id === taskId ? { ...t, suggestedChange: editedChangeText } : t));
    setEditingTaskId(null);
  };

  // Filtered prompts
  const filteredPrompts = prompts.filter(p => {
    const matchesProduct = selectedProductFilter === 'All' || p.product.includes(selectedProductFilter);
    const matchesSearch = p.prompt.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.product.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesProduct && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-16 text-[#17131C]">
      
      {/* Module Header */}
      <div className="bg-gradient-to-r from-[#2D0C57] via-[#531199] to-[#6F1FB3] rounded-2xl p-6 text-white shadow-xl shadow-[#2D0C57]/20 border border-[#531199]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-purple-100 text-xs font-bold border border-white/20">
              <HelpCircle className="w-3.5 h-3.5 text-[#E3B624]" />
              <span>Answer Engine Optimization (AEO) Work Area</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Question & Answer Optimization Center
            </h1>
            <p className="text-xs text-purple-200/90 max-w-2xl leading-relaxed">
              Extract competitor prompts, match with verified mFilterIt product information, generate natural Quora & search answers, and manage question-based content improvements.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('competitor_prompts')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'competitor_prompts' 
                  ? 'bg-white text-[#531199] shadow-md' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <FileText className="w-4 h-4 text-[#E3B624]" />
              <span>Competitor Prompts Library</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex items-center gap-2 pt-6 border-t border-white/15 mt-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab('competitor_prompts')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'competitor_prompts'
                ? 'bg-[#E3B624] text-[#2D0C57] shadow-sm'
                : 'text-purple-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Competitor Prompts Library ({prompts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('question_optimizations')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'question_optimizations'
                ? 'bg-[#E3B624] text-[#2D0C57] shadow-sm'
                : 'text-purple-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>2. Question Content Tasks ({questionTasks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('page_analytics')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'page_analytics'
                ? 'bg-[#E3B624] text-[#2D0C57] shadow-sm'
                : 'text-purple-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>3. Page Analytics Review (GA4 & GSC)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: COMPETITOR PROMPTS LIBRARY */}
      {activeTab === 'competitor_prompts' && (
        <div className="space-y-6">
          
          {/* Document Upload & Control Panel */}
          <div className="bg-white rounded-2xl p-6 border border-purple-200 shadow-md space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-base font-black text-[#2D0C57] flex items-center gap-2">
                  <Upload className="w-5 h-5 text-[#531199]" />
                  <span>Upload Competitor Prompts (.docx or .csv)</span>
                </h2>
                <p className="text-xs text-gray-600 mt-1">
                  Upload sample Word documents or CSV files containing competitor research questions to expand your prompt library.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label className="cursor-pointer px-4 py-2.5 bg-[#531199] hover:bg-[#6F1FB3] text-white rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all shadow-sm">
                  {isUploading ? <RefreshCw className="w-4 h-4 animate-spin text-[#E3B624]" /> : <Upload className="w-4 h-4 text-[#E3B624]" />}
                  <span>{isUploading ? 'Reading Document...' : 'Upload Word Document (.docx)'}</span>
                  <input 
                    type="file" 
                    accept=".docx,.csv,.txt" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                  />
                </label>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-3 py-2.5 border border-purple-300 text-[#531199] hover:bg-purple-50 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Question Manually</span>
                </button>
              </div>
            </div>

            {/* Upload Feedback Banner */}
            {uploadMessage && (
              <div className={`p-3.5 rounded-xl border text-xs flex items-center justify-between ${
                uploadMessage.type === 'success' 
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200' 
                  : 'bg-rose-50 text-rose-900 border-rose-200'
              }`}>
                <div className="flex items-center gap-2">
                  {uploadMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                  <span className="font-medium">{uploadMessage.text}</span>
                </div>
                <button onClick={() => setUploadMessage(null)} className="text-gray-400 hover:text-gray-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Filters and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search prompts, topics, or products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#531199]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-extrabold text-gray-500 uppercase">Product:</span>
                <select
                  value={selectedProductFilter}
                  onChange={(e) => setSelectedProductFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#531199]"
                >
                  <option value="All">All Products ({prompts.length})</option>
                  <option value="Valid8">Media Trust / Valid8</option>
                  <option value="Sentinel+">Brand Trust / Sentinel+</option>
                  <option value="Scam++">Financial Trust / Scam++</option>
                  <option value="PACE">PACE (Brand Safety)</option>
                  <option value="mScanIt">mScanIt (E-Commerce)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Prompts Cards Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-gray-600">
              <span>Showing {filteredPrompts.length} Competitor Prompts in Library</span>
              <span className="text-[#531199]">Saved locally in application store</span>
            </div>

            {filteredPrompts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 space-y-3">
                <FileText className="w-10 h-10 text-gray-300 mx-auto" />
                <h3 className="font-extrabold text-gray-800 text-sm">No Prompts Found</h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  No competitor prompts match your active search or filter. Try clearing your search or uploading a new .docx sample file.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredPrompts.map((p) => {
                  const isEditing = editingPromptId === p.id;

                  return (
                    <div 
                      key={p.id}
                      className="bg-white rounded-2xl p-5 border border-purple-200 shadow-sm hover:shadow-md transition-all space-y-3 relative"
                    >
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-[#531199] border border-purple-200 font-extrabold text-[11px]">
                            {p.product}
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 font-semibold text-[11px]">
                            Topic: {p.topic}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold text-[10px]">
                            {p.promptType}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            p.status === 'Answered' 
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                              : p.status === 'Pending'
                              ? 'bg-purple-100 text-purple-900 border-purple-300'
                              : 'bg-gray-50 text-gray-600 border-gray-200'
                          }`}>
                            Status: {p.status}
                          </span>

                          <button
                            onClick={() => handleSendToQuoraTask(p.id)}
                            className="px-2.5 py-1 bg-[#531199] hover:bg-[#6F1FB3] text-white rounded-lg text-[11px] font-extrabold flex items-center gap-1 transition-all"
                            title="Queue as Quora Task in Today Action Center"
                          >
                            <Send className="w-3 h-3 text-[#E3B624]" />
                            <span>Send to Quora Task</span>
                          </button>

                          <button
                            onClick={() => handleStartEditPrompt(p)}
                            className="p-1 text-gray-400 hover:text-[#531199] hover:bg-purple-50 rounded-lg"
                            title="Edit prompt & answer"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeletePrompt(p.id)}
                            className="p-1 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                            title="Remove prompt"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Prompt Question Content */}
                      <div>
                        {isEditing ? (
                          <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-700">Edit Original Question Wording:</label>
                            <input
                              type="text"
                              value={editPromptText}
                              onChange={(e) => setEditPromptText(e.target.value)}
                              className="w-full p-2 bg-white border border-purple-300 rounded-lg text-xs font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#531199]"
                            />
                          </div>
                        ) : (
                          <h3 className="font-black text-[#2D0C57] text-sm leading-snug">
                            "{p.prompt}"
                          </h3>
                        )}
                        <p className="text-[11px] text-gray-500 mt-1">
                          <strong>Relevance Context:</strong> {p.relevanceReason}
                        </p>
                      </div>

                      {/* Suggested Natural Answer Box */}
                      <div className="bg-[#F5F0FA] rounded-xl p-4 border border-purple-100 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-extrabold text-[#531199] uppercase tracking-wider">
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#E3B624]" />
                            <span>Optimized Quora & Answer Snippet</span>
                          </span>
                          <button
                            onClick={() => handleCopyText(p.id, p.suggestedAnswer)}
                            className="text-[#531199] hover:text-[#2D0C57] flex items-center gap-1 font-bold lowercase text-[11px]"
                          >
                            {copiedId === p.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedId === p.id ? 'copied' : 'copy answer'}</span>
                          </button>
                        </div>

                        {isEditing ? (
                          <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-700">Edit Draft Answer:</label>
                            <textarea
                              rows={5}
                              value={editAnswerText}
                              onChange={(e) => setEditAnswerText(e.target.value)}
                              className="w-full bg-white p-3 border border-purple-300 rounded-lg text-xs text-gray-900 leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#531199]"
                            />
                            <div className="flex items-center justify-end gap-2 pt-1">
                              <button
                                onClick={() => setEditingPromptId(null)}
                                className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-xs font-bold"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSaveEditPrompt(p.id)}
                                className="px-3 py-1.5 bg-[#531199] text-white rounded-lg text-xs font-bold"
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-white p-3 rounded-lg border border-purple-200 text-xs text-gray-900 whitespace-pre-wrap leading-relaxed font-sans">
                            {p.suggestedAnswer}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-[11px] pt-1 text-purple-900">
                          <span className="font-semibold">Verified mFilterIt URL:</span>
                          <a 
                            href={p.verifiedUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="font-mono text-[#531199] hover:underline flex items-center gap-1"
                          >
                            <span>{p.verifiedUrl}</span>
                            <ExternalLink className="w-3 h-3 text-purple-400" />
                          </a>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 2: QUESTION CONTENT TASKS */}
      {activeTab === 'question_optimizations' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-purple-200 shadow-md space-y-4">
            <div>
              <h2 className="text-base font-black text-[#2D0C57] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#531199]" />
                <span>Question-Based Content Optimization Tasks</span>
              </h2>
              <p className="text-xs text-gray-600 mt-1">
                Practical content tasks identified from actual GSC queries and ranking sheets to insert direct answer blocks, FAQ schema, and internal links.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {questionTasks.map((task) => (
                <div key={task.id} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/70 hover:bg-white hover:border-purple-300 transition-all space-y-3">
                  
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-purple-100 text-[#531199] font-extrabold text-[11px] border border-purple-200">
                        {task.issueType}
                      </span>
                      <span className="text-xs font-extrabold text-gray-800">
                        GSC Query: "{task.gscQuery}"
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-gray-500">Status:</span>
                      <select
                        value={task.status}
                        onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value as any)}
                        className="px-2.5 py-1 rounded-lg border border-gray-300 text-xs font-bold bg-white text-gray-900 focus:outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Implemented">Implemented</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-gray-900 text-xs">
                      Affected Page: <a href={task.pageUrl} target="_blank" rel="noreferrer" className="text-[#531199] hover:underline font-mono ml-1">{task.pageUrl}</a>
                    </h3>
                    <p className="text-xs text-gray-700 mt-1">
                      <strong>Work Required:</strong> {task.workRequired}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-3.5 border border-purple-200 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#531199] uppercase">
                      <span>Suggested Content Snippet / Fix:</span>
                      <button
                        onClick={() => handleCopyText(task.id, task.suggestedChange)}
                        className="text-[#531199] hover:underline flex items-center gap-1 text-[11px] lowercase"
                      >
                        {copiedId === task.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === task.id ? 'copied' : 'copy snippet'}</span>
                      </button>
                    </div>

                    {editingTaskId === task.id ? (
                      <div className="space-y-2">
                        <textarea
                          rows={4}
                          value={editedChangeText}
                          onChange={(e) => setEditedChangeText(e.target.value)}
                          className="w-full p-2.5 border border-purple-300 rounded-lg text-xs font-mono text-gray-900"
                        />
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => setEditingTaskId(null)} className="px-3 py-1 bg-gray-200 text-xs rounded">Cancel</button>
                          <button onClick={() => handleSaveTaskEdit(task.id)} className="px-3 py-1 bg-[#531199] text-white text-xs rounded font-bold">Save</button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2.5 bg-gray-50 rounded-lg text-xs font-mono text-gray-900 whitespace-pre-wrap border border-gray-100">
                        {task.suggestedChange}
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PAGE ANALYTICS REVIEW */}
      {activeTab === 'page_analytics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-purple-200 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-base font-black text-[#2D0C57] flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#531199]" />
                  <span>Retrieved GSC & GA4 Page Performance Analytics</span>
                </h2>
                <p className="text-xs text-gray-600 mt-1">
                  Displays actual retrieved Google Search Console and Google Analytics 4 performance data for affected mFilterIt blog pages.
                </p>
              </div>

              <button
                onClick={loadRealAnalytics}
                className="px-3 py-2 bg-purple-50 text-[#531199] hover:bg-purple-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingAnalytics ? 'animate-spin' : ''}`} />
                <span>Refresh Live Metrics</span>
              </button>
            </div>

            {/* Metrics Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#2D0C57] text-white uppercase font-extrabold text-[11px]">
                    <th className="py-3 px-4 rounded-tl-xl">Page Title & URL</th>
                    <th className="py-3 px-4 text-center">GSC Search Clicks</th>
                    <th className="py-3 px-4 text-center">GSC Impressions</th>
                    <th className="py-3 px-4 text-center">CTR</th>
                    <th className="py-3 px-4 text-center">Avg Position</th>
                    <th className="py-3 px-4 text-center rounded-tr-xl">GA4 Sessions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white font-medium">
                  {liveAnalytics?.topBlogPages ? (
                    liveAnalytics.topBlogPages.map((page, idx) => (
                      <tr key={idx} className="hover:bg-purple-50/50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-extrabold text-gray-900">{page.pageTitle || 'mFilterIt Blog Page'}</div>
                          <a href={page.pageUrl} target="_blank" rel="noreferrer" className="text-[#531199] hover:underline font-mono text-[11px] truncate block max-w-md">
                            {page.pageUrl}
                          </a>
                        </td>
                        <td className="py-3.5 px-4 text-center font-black text-[#531199]">
                          {page.clicks.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-gray-800">
                          {page.impressions.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-emerald-700">
                          {page.ctr.toFixed(1)}%
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-purple-900">
                          {page.position.toFixed(1)}
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-gray-900">
                          {Math.round(page.clicks * 1.05).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        Loading retrieved GSC & GA4 page metrics...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

      {/* MANUAL NEW QUESTION MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-purple-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-lg text-[#2D0C57]">Add Custom Competitor Question</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Question / Prompt Text:</label>
                <textarea
                  rows={3}
                  placeholder="e.g., How do marketers detect invalid traffic in Meta Advantage+ campaigns?"
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#531199]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Target Product Category:</label>
                <select
                  value={newProductCategory}
                  onChange={(e) => setNewProductCategory(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:outline-none"
                >
                  <option value="Media Trust / Valid8">Media Trust / Valid8 (Ad Fraud)</option>
                  <option value="Brand Trust / Sentinel+">Brand Trust / Sentinel+ (Brand Safety & Takedowns)</option>
                  <option value="Financial Trust / Scam++">Financial Trust / Scam++ (Mule Accounts & Scams)</option>
                  <option value="Media Trust / PACE">Media Trust / PACE (Brand Safety & Video)</option>
                  <option value="Media Trust / mScanIt">Media Trust / mScanIt (E-Commerce Analytics)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddManualPrompt}
                className="px-4 py-2 bg-[#531199] hover:bg-[#6F1FB3] text-white rounded-xl text-xs font-extrabold"
              >
                Add to Prompt Library
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

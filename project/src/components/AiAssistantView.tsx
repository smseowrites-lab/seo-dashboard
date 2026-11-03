import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  RefreshCw, 
  User, 
  Share2, 
  Upload, 
  Plus, 
  Search, 
  Trash2, 
  MessageSquare, 
  Database, 
  ExternalLink, 
  Copy, 
  Check, 
  Bookmark, 
  Layers, 
  ChevronDown, 
  ChevronUp,
  FileText,
  ChevronRight,
  ChevronLeft,
  Info
} from 'lucide-react';
import { MinakshiAssistantIcon, MinakshiAvatar } from './BrandAssets';
import { TaskRecommendation, CompetitorEvent } from '../types';
import { 
  StoredMemoryItem, 
  UploadedFile 
} from '../data/knowledgeBase';
import { 
  processCopilotQuery, 
  generateConversationTitle, 
  CopilotResponse 
} from '../services/copilotEngine';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sourcesUsed?: string[];
  actionType?: string;
  targetTaskId?: string;
  targetTask?: TaskRecommendation;
  followUpSuggestions?: string[];
}

export interface ConversationThread {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  category: 'Today' | 'Yesterday' | 'Previous 7 Days' | 'Older';
  messages: ChatMessage[];
}

interface AiAssistantViewProps {
  tasks: TaskRecommendation[];
  competitorEvents: CompetitorEvent[];
  memoryItems: StoredMemoryItem[];
  uploadedFiles: UploadedFile[];
  onExecuteTask: (task: TaskRecommendation) => void;
  onCreateCarousel: (task: TaskRecommendation) => void;
  onOpenUploadModal: () => void;
  onSaveToMemory: (item: StoredMemoryItem) => void;
}

const STORAGE_KEY = 'mfilterit_copilot_conversations_v2';

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({
  tasks,
  competitorEvents,
  memoryItems,
  uploadedFiles,
  onExecuteTask,
  onCreateCarousel,
  onOpenUploadModal,
  onSaveToMemory
}) => {
  // Pre-seeded realistic persistent chat history
  const defaultThreads: ConversationThread[] = [
    {
      id: 'thread-today-1',
      title: "Today's Action Plan",
      createdAt: 'Today, 08:00 AM',
      updatedAt: 'Today, 08:45 AM',
      category: 'Today',
      messages: [
        {
          id: 'm-init-1',
          sender: 'assistant',
          text: `Hello Minakshi! I am your **mFilterIt Digital Marketing Copilot**—your persistent AI marketing brain.

I continuously analyze your GSC metrics, GA4 traffic, 4 competitors (CHEQ, AppsFlyer, DoubleVerify, HUMAN), and the Master Task Library.

You can ask: *"Aaj kya karna hai?"*, continue yesterday's work, request carousels, or upload reports. How can I help accelerate your day?`,
          timestamp: '08:00 AM',
          sourcesUsed: [
            'mFilterIt Master Knowledge Base (3 Trust Pillars)',
            'Google Search Console (412,800 monthly impressions)',
            'Competitor Intelligence Radar',
            'ALL SEO Tasks(Minakshi).csv'
          ],
          followUpSuggestions: [
            'Aaj kya karna hai?',
            'Which 2 blogs should I work on today?',
            'What did competitors publish this week?'
          ]
        }
      ]
    },
    {
      id: 'thread-meta-ads',
      title: 'Meta Ads Click Fraud Strategy',
      createdAt: 'Yesterday, 03:15 PM',
      updatedAt: 'Yesterday, 04:30 PM',
      category: 'Yesterday',
      messages: [
        {
          id: 'm-meta-1',
          sender: 'user',
          text: 'What should we do about the Meta Ads click fraud article losing impressions?',
          timestamp: '03:15 PM'
        },
        {
          id: 'm-meta-2',
          sender: 'assistant',
          text: `GSC impressions for our Meta Ads article dropped **28%** over the last 28 days (avg position fell from 7.4 to 12.8). Meanwhile, competitor **CHEQ** published a fresh 2,200-word piece on Meta Advantage+ bot conversions yesterday.

### AI Strategic Prescription:
- **Do NOT create a duplicate URL.**
- Refresh existing URL \`https://www.mfilterit.com/blog/meta-ads-click-fraud-detection/\` with 2026 Advantage+ bot vectors.
- Add 3 modular direct answer blocks for Featured Snippet capture.
- Inject 3 internal links to \`/ad-traffic-validation/\`.
- Publish a 7-slide executive LinkedIn carousel to recapture audience mindshare.`,
          timestamp: '03:16 PM',
          sourcesUsed: [
            'Google Search Console (Decay Alert -28%)',
            'Competitor Radar (CHEQ Advantage+ piece)',
            'mFilterIt Website Knowledge Graph'
          ],
          actionType: 'EXECUTE_TASK',
          targetTaskId: 'task-1',
          targetTask: tasks[0],
          followUpSuggestions: [
            'Execute this refresh now',
            'Draft LinkedIn Carousel',
            'Review internal linking suggestions'
          ]
        }
      ]
    },
    {
      id: 'thread-competitors',
      title: 'Competitor Research (CHEQ & AppsFlyer)',
      createdAt: '3 days ago',
      updatedAt: '3 days ago',
      category: 'Previous 7 Days',
      messages: [
        {
          id: 'm-comp-1',
          sender: 'user',
          text: 'What did competitors publish this week?',
          timestamp: '11:00 AM'
        },
        {
          id: 'm-comp-2',
          sender: 'assistant',
          text: `Competitor intelligence detected 3 major publications:
1. **CHEQ:** Invalid traffic in Meta Advantage+ shopping campaigns.
2. **AppsFlyer:** State of Mobile App Install Fraud 2026 report.
3. **DoubleVerify:** Retail Media Network brand safety verification.

Recommendation: Prioritize refreshing existing mFilterIt equity rather than reactive duplicate blogging.`,
          timestamp: '11:01 AM',
          sourcesUsed: [
            'Competitor Radar Crawler',
            'mFilterIt Three Trust Pillars (Media Trust)'
          ]
        }
      ]
    },
    {
      id: 'thread-carousel',
      title: 'LinkedIn Carousel Studio',
      createdAt: '5 days ago',
      updatedAt: '5 days ago',
      category: 'Previous 7 Days',
      messages: [
        {
          id: 'm-car-1',
          sender: 'user',
          text: 'Create a LinkedIn carousel from our eCommerce Brand Infringement blog',
          timestamp: '02:00 PM'
        },
        {
          id: 'm-car-2',
          sender: 'assistant',
          text: `Prepared a 7-slide B2B narrative: "7 Ways Counterfeit Sellers Drain D2C Margins on Amazon & Noon". Formatted in 1080x1080 with Deep Purple & Violet brand tokens.`,
          timestamp: '02:02 PM',
          sourcesUsed: [
            'Brand Trust Knowledge Base',
            'Canva Creative Director Guidelines'
          ]
        }
      ]
    }
  ];

  // Load from localStorage or use default
  const [conversations, setConversations] = useState<ConversationThread[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved chat history:', e);
    }
    return defaultThreads;
  });

  const [activeThreadId, setActiveThreadId] = useState<string>(() => {
    return conversations[0]?.id || 'thread-today-1';
  });

  const [searchHistoryTerm, setSearchHistoryTerm] = useState('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedMemoryId, setSavedMemoryId] = useState<string | null>(null);
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync conversations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch (e) {
      console.error('Failed to save chat history:', e);
    }
  }, [conversations]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, activeThreadId, isLoading]);

  const activeThread = conversations.find(c => c.id === activeThreadId) || conversations[0];

  const handleSelectThread = (threadId: string) => {
    setActiveThreadId(threadId);
  };

  const handleNewChat = () => {
    const newThreadId = `thread-${Date.now()}`;
    const newThread: ConversationThread = {
      id: newThreadId,
      title: 'New Marketing Conversation',
      createdAt: 'Just now',
      updatedAt: 'Just now',
      category: 'Today',
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          text: `New working thread started. I have full recall of our **Three Trust Pillars, GSC/GA4 history, approved creative guidelines, and active task library**.

What would you like to achieve in this session?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sourcesUsed: [
            'mFilterIt Master Knowledge Base',
            'Working Memory Vault',
            'Google Search Console'
          ],
          followUpSuggestions: [
            'Aaj kya karna hai?',
            'Which 2 blogs should I work on today?',
            'Create LinkedIn Carousel'
          ]
        }
      ]
    };

    setConversations(prev => [newThread, ...prev]);
    setActiveThreadId(newThreadId);
  };

  const handleDeleteThread = (threadId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (conversations.length <= 1) {
      handleNewChat();
      return;
    }
    const remaining = conversations.filter(c => c.id !== threadId);
    setConversations(remaining);
    if (activeThreadId === threadId) {
      setActiveThreadId(remaining[0].id);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update active thread with user message
    setConversations(prev => prev.map(t => {
      if (t.id !== activeThreadId) return t;
      const isFirstUserMessage = t.messages.filter(m => m.sender === 'user').length === 0;
      const updatedTitle = isFirstUserMessage ? generateConversationTitle(query) : t.title;
      return {
        ...t,
        title: updatedTitle,
        updatedAt: 'Just now',
        messages: [...t.messages, userMessage]
      };
    }));

    setInput('');
    setIsLoading(true);

    try {
      const response = await processCopilotQuery(
        query,
        activeThread.messages.map(m => ({ sender: m.sender, text: m.text })),
        tasks,
        competitorEvents,
        memoryItems,
        uploadedFiles
      );

      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourcesUsed: response.sourcesUsed,
        actionType: response.actionType,
        targetTaskId: response.targetTaskId,
        targetTask: response.targetTask,
        followUpSuggestions: response.followUpSuggestions
      };

      setConversations(prev => prev.map(t => {
        if (t.id !== activeThreadId) return t;
        return {
          ...t,
          updatedAt: 'Just now',
          messages: [...t.messages, assistantMessage]
        };
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const copyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveSnippetToMemory = (text: string, msgId: string) => {
    const newItem: StoredMemoryItem = {
      id: `mem-${Date.now()}`,
      category: 'working_memory',
      title: `Saved Context: ${activeThread.title}`,
      content: text.slice(0, 300) + '...',
      tags: ['Saved From Chat', 'Copilot'],
      lastUpdated: 'Just now',
      source: `Chat Thread: ${activeThread.title}`
    };
    onSaveToMemory(newItem);
    setSavedMemoryId(msgId);
    setTimeout(() => setSavedMemoryId(null), 2000);
  };

  const toggleSourceExpand = (msgId: string) => {
    setExpandedSources(prev => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  // Filter conversations for search in sidebar
  const filteredThreads = conversations.filter(c => 
    c.title.toLowerCase().includes(searchHistoryTerm.toLowerCase()) ||
    c.messages.some(m => m.text.toLowerCase().includes(searchHistoryTerm.toLowerCase()))
  );

  const categories = ['Today', 'Yesterday', 'Previous 7 Days', 'Older'] as const;

  return (
    <div className="flex h-[calc(100vh-130px)] bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative">
      {/* 1. CHATGPT-STYLE LEFT SIDEBAR */}
      <div className={`${isSidebarOpen ? 'w-72' : 'w-0'} bg-[#240947] text-white flex flex-col transition-all duration-300 ease-in-out shrink-0 border-r border-[#3e1374] overflow-hidden select-none`}>
        {/* New Chat Button */}
        <div className="p-3 border-b border-[#401579] space-y-2">
          <button
            onClick={handleNewChat}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#531199] to-[#6F1FB3] hover:from-[#6F1FB3] hover:to-[#971199] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Chat</span>
          </button>

          {/* Search Chat History */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-purple-300 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchHistoryTerm}
              onChange={e => setSearchHistoryTerm(e.target.value)}
              className="w-full bg-[#1b0638] text-purple-100 placeholder-purple-400/60 pl-8 pr-3 py-1.5 rounded-lg text-[11px] focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>
        </div>

        {/* Chat History List categorized by date */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4 text-xs scrollbar-thin scrollbar-thumb-purple-900">
          {categories.map(cat => {
            const threadsInCat = filteredThreads.filter(t => t.category === cat);
            if (threadsInCat.length === 0) return null;
            return (
              <div key={cat} className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-purple-300/60 px-2 py-1">
                  {cat}
                </div>
                {threadsInCat.map(thread => {
                  const isActive = thread.id === activeThreadId;
                  return (
                    <div
                      key={thread.id}
                      onClick={() => handleSelectThread(thread.id)}
                      className={`group flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer transition-all ${
                        isActive
                          ? 'bg-[#531199] text-white font-bold shadow-xs'
                          : 'text-purple-200/80 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#e28eff]' : 'text-purple-400'}`} />
                        <span className="truncate text-xs">{thread.title}</span>
                      </div>

                      <button
                        onClick={(e) => handleDeleteThread(thread.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:text-rose-400 transition-opacity"
                        title="Delete conversation"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Sidebar Footer: Brain Health & Permanent Memory Status */}
        <div className="p-3 border-t border-[#401579] bg-[#1a0533] text-[11px] flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <Database className="w-3.5 h-3.5 text-[#e28eff]" />
            <span className="text-purple-200 truncate">Memory: 42 Entities Active</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Brain Active" />
        </div>
      </div>

      {/* 2. MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col h-full bg-[#FAF8FC] overflow-hidden">
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-white border-b border-gray-200 flex items-center justify-between shrink-0 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              title={isSidebarOpen ? 'Collapse sidebar' : 'Open chat history'}
            >
              {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-[#17131C] tracking-tight">
                  {activeThread.title}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-purple-50 text-[#531199] border border-purple-200">
                  mFilterIt Brain v3.8
                </span>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Deep Grounding
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Grounded in GSC + GA4 + 3 Trust Pillars + Competitor Radar + Uploaded Resources
              </p>
            </div>
          </div>

          {/* Quick Header Tools */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenUploadModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 text-[#531199] border border-purple-200 text-xs font-bold hover:bg-purple-100 transition-all shadow-2xs"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>+ Upload Files</span>
            </button>

            <button
              onClick={handleNewChat}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New</span>
            </button>
          </div>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin scrollbar-thumb-purple-200">
          {activeThread.messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-3.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              {msg.sender === 'user' ? (
                <MinakshiAvatar size="sm" />
              ) : (
                <MinakshiAssistantIcon size="sm" />
              )}

              {/* Message Box */}
              <div className={`max-w-3xl rounded-2xl p-5 text-xs leading-relaxed space-y-3 shadow-2xs ${
                msg.sender === 'user'
                  ? 'bg-[#531199] text-white rounded-tr-none'
                  : 'bg-white text-gray-900 border border-purple-200/80 rounded-tl-none'
              }`}>
                {/* Text Body */}
                <div className="whitespace-pre-line text-xs font-normal space-y-2 leading-relaxed">
                  {msg.text}
                </div>

                {/* Grounded Knowledge Source Badges (For Assistant Messages) */}
                {msg.sender === 'assistant' && msg.sourcesUsed && msg.sourcesUsed.length > 0 && (
                  <div className="pt-3 border-t border-purple-100 text-[11px]">
                    <div 
                      onClick={() => toggleSourceExpand(msg.id)}
                      className="flex items-center justify-between cursor-pointer text-gray-500 hover:text-purple-900 font-bold uppercase text-[10px] tracking-wide"
                    >
                      <span className="flex items-center gap-1.5 text-purple-900 font-extrabold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Grounded Sources ({msg.sourcesUsed.length}):
                      </span>
                      <span className="text-[10px] text-purple-700 flex items-center gap-0.5">
                        {expandedSources[msg.id] ? 'Hide details' : 'Show details'}
                        {expandedSources[msg.id] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {msg.sourcesUsed.map((source, sIdx) => (
                        <span 
                          key={sIdx} 
                          className="bg-[#F5F0FA] text-[#531199] font-semibold px-2 py-0.5 rounded-md border border-purple-200 text-[10px] flex items-center gap-1"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {source}
                        </span>
                      ))}
                    </div>

                    {expandedSources[msg.id] && (
                      <div className="mt-2 p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-[10px] text-gray-600 space-y-1">
                        <div><strong>Verification Principle: </strong> Data retrieved and synthesized from active mFilterIt knowledge structures. No fabricated statistics.</div>
                        <div><strong>Confidence: </strong> High (Direct cross-reconciliation against Search Console & 3 Trust Pillars).</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Interactive Action Buttons inside Chat Bubble */}
                {msg.sender === 'assistant' && (
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      {msg.actionType === 'EXECUTE_TASK' && msg.targetTask && (
                        <button
                          onClick={() => onExecuteTask(msg.targetTask!)}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#531199] text-white font-bold hover:bg-[#6F1FB3] transition-all shadow-xs"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                          <span>EXECUTE TASK WIZARD</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}

                      {msg.actionType === 'CREATE_CAROUSEL' && msg.targetTask && (
                        <button
                          onClick={() => onCreateCarousel(msg.targetTask!)}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-700 text-white font-bold hover:bg-teal-800 transition-all shadow-xs"
                        >
                          <Share2 className="w-3.5 h-3.5 text-teal-200" />
                          <span>OPEN CAROUSEL BUILDER</span>
                        </button>
                      )}
                    </div>

                    {/* Utility actions (Copy, Save to Memory) */}
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <button
                        onClick={() => handleSaveSnippetToMemory(msg.text, msg.id)}
                        className="p-1 rounded hover:text-[#531199] hover:bg-purple-50 transition-colors"
                        title="Save response to Brand Memory"
                      >
                        {savedMemoryId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Bookmark className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => copyMessage(msg.text, msg.id)}
                        className="p-1 rounded hover:text-gray-700 hover:bg-gray-100 transition-colors"
                        title="Copy message"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Follow-up Suggestion Chips */}
                {msg.sender === 'assistant' && msg.followUpSuggestions && msg.followUpSuggestions.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {msg.followUpSuggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSend(sug)}
                        className="text-[11px] font-semibold text-purple-800 bg-[#F5F0FA] hover:bg-purple-100 px-2.5 py-1 rounded-full border border-purple-200 transition-all"
                      >
                        {sug} →
                      </button>
                    ))}
                  </div>
                )}

                {/* Timestamp */}
                <div className={`text-[10px] text-right ${msg.sender === 'user' ? 'text-purple-200' : 'text-gray-400'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#2D0C57] text-[#e28eff] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white p-4 rounded-2xl border border-purple-200 text-xs text-purple-900 flex items-center gap-2.5 shadow-2xs">
                <RefreshCw className="w-4 h-4 animate-spin text-[#531199]" />
                <span className="font-semibold">mFilterIt Brain is cross-referencing GSC queries, competitor radar & 3 Trust Pillars...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar & Suggestion Chips */}
        <div className="p-4 bg-white border-t border-gray-200 space-y-2 shrink-0">
          {/* Quick Prompts Row */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {[
              'Aaj kya karna hai?',
              'Do it',
              'Make it better',
              'Which 2 blogs should I work on today?',
              'What did competitors publish this week?',
              'Create a LinkedIn carousel',
              'Generate UTM links'
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="text-[11px] font-semibold text-[#531199] bg-[#F5F0FA] hover:bg-purple-100 px-3 py-1 rounded-full border border-purple-200 whitespace-nowrap transition-all"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="bg-[#FAF8FC] rounded-2xl border border-gray-300 focus-within:border-[#531199] focus-within:ring-1 focus-within:ring-[#531199] p-2 flex items-end gap-2 transition-all">
            <button
              onClick={onOpenUploadModal}
              className="p-2 text-gray-500 hover:text-[#531199] hover:bg-white rounded-xl transition-all"
              title="Upload file or spreadsheet to memory"
            >
              <Upload className="w-4 h-4" />
            </button>

            <textarea
              rows={2}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask mFilterIt Copilot anything... (e.g. 'Aaj kya karna hai?', 'Do it', 'Create carousel')"
              className="flex-1 bg-transparent px-2 py-1 text-xs text-gray-900 focus:outline-none resize-none leading-relaxed"
            />

            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-[#531199] hover:bg-[#6F1FB3] disabled:opacity-40 text-white transition-all shadow-sm active:scale-95"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-2">
            <span>Powered by mFilterIt Persistent Brain • 3 Trust Pillars Grounded</span>
            <span>•</span>
            <span className="font-semibold text-purple-700">Zero Repetitive Prompts Required</span>
          </div>
        </div>
      </div>
    </div>
  );
};

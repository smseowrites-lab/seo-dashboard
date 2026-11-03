import React, { useState, useEffect, useRef } from 'react';
import { 
  Palette, 
  Sparkles, 
  Share2, 
  ExternalLink, 
  Copy, 
  Check, 
  Image as ImageIcon, 
  Layout, 
  FileText, 
  CheckCircle2, 
  Layers, 
  Download,
  Plus,
  Search,
  Trash2,
  RotateCcw,
  Edit3,
  Send,
  MessageSquare,
  History,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Filter,
  ArrowRight,
  BookOpen,
  Eye,
  CopyPlus,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { TaskRecommendation } from '../types';
import { 
  CreativeProject, 
  CreativeVersion, 
  CreativeSlide, 
  ApprovedCreativeStyle, 
  ReferenceItem, 
  CreativeChatMessage 
} from '../types/creative';
import { 
  INITIAL_CREATIVE_PROJECTS, 
  INITIAL_APPROVED_STYLES, 
  INITIAL_REFERENCE_ITEMS 
} from '../data/creativeData';

const CREATIVE_PROJECTS_STORAGE_KEY = 'mfilterit_creative_projects_v2';
const APPROVED_STYLES_STORAGE_KEY = 'mfilterit_approved_styles_v2';
const REFERENCE_LIBRARY_STORAGE_KEY = 'mfilterit_reference_library_v2';

interface CreativeStudioViewProps {
  tasks: TaskRecommendation[];
  onCreateCarousel: (task: TaskRecommendation) => void;
}

export const CreativeStudioView: React.FC<CreativeStudioViewProps> = ({
  tasks,
  onCreateCarousel
}) => {
  // Persistent Projects State
  const [projects, setProjects] = useState<CreativeProject[]>(() => {
    try {
      const saved = localStorage.getItem(CREATIVE_PROJECTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load creative projects from storage:', e);
    }
    return INITIAL_CREATIVE_PROJECTS;
  });

  const [approvedStyles, setApprovedStyles] = useState<ApprovedCreativeStyle[]>(() => {
    try {
      const saved = localStorage.getItem(APPROVED_STYLES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load approved styles:', e);
    }
    return INITIAL_APPROVED_STYLES;
  });

  const [referenceLibrary, setReferenceLibrary] = useState<ReferenceItem[]>(() => {
    try {
      const saved = localStorage.getItem(REFERENCE_LIBRARY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load reference library:', e);
    }
    return INITIAL_REFERENCE_ITEMS;
  });

  // Active Project & Navigation
  const [activeProjectId, setActiveProjectId] = useState<string>(() => projects[0]?.id || 'proj-1');
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState<'All' | 'LinkedIn Carousel' | 'Website Blog Image' | 'Infographic'>('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'workspace' | 'memory' | 'references'>('workspace');

  // Active Project Data
  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0];
  const activeVersion = activeProject.versions.find(v => v.id === activeProject.currentVersionId) || activeProject.versions[activeProject.versions.length - 1];

  // Slide Preview State
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [editingSlideIndex, setEditingSlideIndex] = useState<number | null>(null);
  const [slideEditBody, setSlideEditBody] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Sync projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CREATIVE_PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save creative projects:', e);
    }
  }, [projects]);

  // Sync approved styles to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(APPROVED_STYLES_STORAGE_KEY, JSON.stringify(approvedStyles));
    } catch (e) {
      console.error('Failed to save approved styles:', e);
    }
  }, [approvedStyles]);

  // Sync reference library to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(REFERENCE_LIBRARY_STORAGE_KEY, JSON.stringify(referenceLibrary));
    } catch (e) {
      console.error('Failed to save reference library:', e);
    }
  }, [referenceLibrary]);

  useEffect(() => {
    // Reset slide index if current version slide count is less
    if (activeSlideIndex >= activeVersion.slides.length) {
      setActiveSlideIndex(0);
    }
  }, [activeVersion]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeProject.conversation, isGenerating]);

  // Handlers
  const handleSelectProject = (projectId: string) => {
    setActiveProjectId(projectId);
    setActiveSlideIndex(0);
    setEditingSlideIndex(null);
  };

  const handleCreateNewProject = () => {
    const newId = `proj-${Date.now()}`;
    const newVersionId = `v1`;
    const newProject: CreativeProject = {
      id: newId,
      name: 'Untitled Creative Concept',
      aiTitle: 'New Creative Concept Session',
      originalPrompt: 'Create a new B2B creative asset for mFilterIt',
      platform: 'LinkedIn Carousel',
      dimensions: '1080 × 1080',
      category: 'carousel',
      targetAudience: 'Enterprise Marketing & Growth Leadership',
      createdAt: 'Just now',
      updatedAt: 'Just now',
      status: 'draft',
      canvaStatus: 'Ready to Sync',
      selectedTemplate: 'mFilterIt B2B Executive Carousel Style',
      stylePreset: 'Deep Purple & Violet Minimalist',
      usedReferences: ['ref-1'],
      currentVersionId: newVersionId,
      versions: [
        {
          id: newVersionId,
          versionNumber: 1,
          label: 'Initial Generation',
          createdAt: 'Just now',
          dimensions: '1080 × 1080',
          colorPalette: 'Deep Purple (#2D0C57) + Magenta Purple (#971199) + White',
          designNotes: 'Fresh canvas created. Provide a prompt or blog URL to generate.',
          isApproved: false,
          slides: [
            {
              slideNumber: 1,
              type: 'Hook',
              headline: 'New Creative Concept (Slide 1 Hook)',
              body: 'Enter your prompt below (e.g. "Create carousel from Meta Ads blog" or "Make a blog image for PMax fraud").',
              bulletPoints: [
                'Context preserved across sessions',
                'Approved styles automatically reused',
                'Ready for Canva packaging'
              ],
              visualPrompt: 'Deep Purple background with clean white typography and violet accent pills.',
              status: 'pending'
            }
          ]
        }
      ],
      conversation: [
        {
          id: `cmsg-${Date.now()}`,
          sender: 'assistant',
          text: `New Creative Project workspace initiated. I have full memory of our **Approved Creative Styles** (B2B Executive Carousel, Section 23 Blog Header, Diagnostic Infographic) and brand color tokens (#2D0C57, #531199).

What visual asset are we designing today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    setProjects(prev => [newProject, ...prev]);
    setActiveProjectId(newId);
    setActiveSlideIndex(0);
  };

  const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (projects.length <= 1) return;
    const remaining = projects.filter(p => p.id !== projectId);
    setProjects(remaining);
    if (activeProjectId === projectId) {
      setActiveProjectId(remaining[0].id);
    }
  };

  const handleDuplicateProject = () => {
    const copyId = `proj-${Date.now()}`;
    const duplicated: CreativeProject = {
      ...activeProject,
      id: copyId,
      name: `${activeProject.name} (Copy)`,
      createdAt: 'Just now',
      updatedAt: 'Just now',
      status: 'draft'
    };
    setProjects(prev => [duplicated, ...prev]);
    setActiveProjectId(copyId);
  };

  // Chat-driven revision & version creation
  const handleSendCreativePrompt = (overridePrompt?: string) => {
    const query = overridePrompt || chatInput;
    if (!query.trim()) return;

    const userMessage: CreativeChatMessage = {
      id: `cmsg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const nextVersionNumber = activeProject.versions.length + 1;
    const newVersionId = `v${nextVersionNumber}`;

    setIsGenerating(true);
    setChatInput('');

    setTimeout(() => {
      let updatedSlides: CreativeSlide[] = [...activeVersion.slides];
      let versionLabel = `Version ${nextVersionNumber}`;
      let assistantText = '';
      const lower = query.toLowerCase();

      if (lower.includes('make slide 3 better') || lower.includes('slide 3')) {
        versionLabel = `Refined Slide 3 (Technical Biometrics)`;
        updatedSlides = updatedSlides.map(s => {
          if (s.slideNumber !== 3) return s;
          return {
            ...s,
            headline: 'Why Legacy Filters Fail: The Rise of 5G Residential Proxies',
            body: 'Fraud rings bypass simplistic IP blacklists by cycling millions of real mobile 5G device connections with synthetic biometric emulation.',
            bulletPoints: [
              'Rotating residential IP pools mimicking real cellular carriers',
              'Synthetic browser touch trajectories and viewport scrolling',
              'Aged browser cookies simulating authentic shopper intent'
            ],
            visualPrompt: 'Comparison matrix: Traditional Rules-Based vs AI Behavioral Biometrics with glowing violet nodes.'
          };
        });
        assistantText = `I upgraded Slide 3 with concrete technical depth (5G residential proxies & behavioral biometrics) and added a sharper comparison matrix prompt. Created ${versionLabel}.`;
      } else if (lower.includes('keep same design') || lower.includes('change content')) {
        versionLabel = `Content Refresh (Preserved Layout & Colors)`;
        updatedSlides = updatedSlides.map(s => ({
          ...s,
          headline: `${s.headline} [Refined B2B Angle]`,
          body: `${s.body} [Rephrased for executive clarity while maintaining approved layout]`
        }));
        assistantText = `Preserved the exact approved Deep Purple & Violet visual structure while updating the content copy. Created ${versionLabel}.`;
      } else if (lower.includes('make it better') || lower.includes('more premium')) {
        versionLabel = `More Premium B2B Contrast`;
        updatedSlides = updatedSlides.map((s, idx) => ({
          ...s,
          headline: idx === 0 ? 'Your Paid Media ROAS Is Lying To You (Here Is Why)' : s.headline,
          bulletPoints: s.bulletPoints || [
            'Independent third-party verification without code injection',
            'Cleanses retargeting data pools and machine learning models',
            'Recovers up to 24% of wasted media budget within 48 hours'
          ]
        }));
        assistantText = `Enhanced typographic contrast, sharpened the hook, and added 3 high-impact executive bullet points per slide. Created ${versionLabel}.`;
      } else if (lower.includes('blog image') || lower.includes('make this into a blog image')) {
        versionLabel = `Converted to 800×500 Blog Editorial Header`;
        updatedSlides = [
          {
            slideNumber: 1,
            type: 'Hero',
            headline: activeProject.name,
            body: 'Understanding algorithmic invalid traffic and protecting paid media investments with independent verification.',
            bulletPoints: [
              '800 × 500 px standard blog aspect ratio',
              'Left-aligned typography hierarchy with yellow highlight',
              'Right-aligned 3D sticker-style illustration'
            ],
            visualPrompt: '800x500px canvas. Strong white/yellow headline on left over #2D0C57 background. Minimalist 3D isometric vector illustration on right emitting a protective violet glow. Clean B2B SaaS finish.',
            status: 'approved'
          }
        ];
        assistantText = `Transformed the carousel into an official **800 × 500 px Blog Featured Image** complying with Section 23 of mFilterIt brand guidelines (Headline on left, 3D illustration on right). Created ${versionLabel}.`;
      } else {
        versionLabel = `Iteration ${nextVersionNumber}: ${query.slice(0, 30)}`;
        assistantText = `Processed instruction: "${query}". Generated ${versionLabel} with updated visual directions and copy refinements.`;
      }

      const newVersion: CreativeVersion = {
        id: newVersionId,
        versionNumber: nextVersionNumber,
        label: versionLabel,
        createdAt: 'Just now',
        dimensions: activeVersion.dimensions,
        colorPalette: activeVersion.colorPalette,
        designNotes: `Generated from prompt: "${query}"`,
        isApproved: false,
        slides: updatedSlides
      };

      const assistantMessage: CreativeChatMessage = {
        id: `cmsg-${Date.now()}`,
        sender: 'assistant',
        text: assistantText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        versionGeneratedId: newVersionId
      };

      setProjects(prev => prev.map(p => {
        if (p.id !== activeProject.id) return p;
        return {
          ...p,
          updatedAt: 'Just now',
          currentVersionId: newVersionId,
          versions: [...p.versions, newVersion],
          conversation: [...p.conversation, userMessage, assistantMessage]
        };
      }));

      setIsGenerating(false);
    }, 900);
  };

  // Approve Version & Save to Memory
  const handleApproveCurrentVersion = () => {
    setProjects(prev => prev.map(p => {
      if (p.id !== activeProject.id) return p;
      return {
        ...p,
        status: 'approved',
        canvaStatus: 'Layout Packaged',
        versions: p.versions.map(v => v.id === activeVersion.id ? { ...v, isApproved: true } : v)
      };
    }));

    // Save approved characteristics to memory
    const newStyle: ApprovedCreativeStyle = {
      id: `style-${Date.now()}`,
      name: `${activeProject.name} (Approved Style)`,
      platform: activeProject.platform,
      dimensions: activeVersion.dimensions,
      colorPalette: activeVersion.colorPalette,
      typographyStyle: 'Plus Jakarta Sans Bold, Left-aligned, High Contrast',
      illustrationStyle: 'Minimalist 3D vector diagram with isometric depth and glowing violet aura',
      textDensity: 'Maximum 35 words per slide + 3 punchy bullet points',
      cardStyle: 'Deep purple canvas with subtle 20% opacity geometric grid and white text',
      approvedDate: 'Just now',
      sourceProjectName: activeProject.name
    };

    setApprovedStyles(prev => [newStyle, ...prev]);
    setCopiedNotification('Version Approved & Saved to Creative Memory!');
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  // Restore previous version
  const handleRestoreVersion = (versionId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== activeProject.id) return p;
      return {
        ...p,
        currentVersionId: versionId
      };
    }));
  };

  // Copy slide copy
  const handleCopyAllSlideCopy = () => {
    const text = activeVersion.slides.map(s => `--- SLIDE ${s.slideNumber}: ${s.type.toUpperCase()} ---\nHeadline: ${s.headline}\nBody: ${s.body}\n${s.bulletPoints ? s.bulletPoints.map(b => `• ${b}`).join('\n') : ''}\nVisual Direction: ${s.visualPrompt}\n`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedNotification('All Slide Copy Copied to Clipboard!');
    setTimeout(() => setCopiedNotification(null), 2000);
  };

  // Apply an approved style to current project
  const handleApplyApprovedStyle = (style: ApprovedCreativeStyle) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== activeProject.id) return p;
      const nextVNum = p.versions.length + 1;
      const newVId = `v${nextVNum}`;
      const newV: CreativeVersion = {
        id: newVId,
        versionNumber: nextVNum,
        label: `Applied: ${style.name}`,
        createdAt: 'Just now',
        dimensions: style.dimensions,
        colorPalette: style.colorPalette,
        designNotes: `Inherited style tokens from approved project: ${style.sourceProjectName}`,
        isApproved: false,
        slides: activeVersion.slides.map(s => ({
          ...s,
          visualPrompt: `${s.visualPrompt} [Styled in ${style.name}: ${style.colorPalette}, ${style.typographyStyle}]`
        }))
      };
      return {
        ...p,
        selectedTemplate: style.name,
        currentVersionId: newVId,
        versions: [...p.versions, newV]
      };
    }));
    setActiveTab('workspace');
    setCopiedNotification(`Applied "${style.name}" to active project!`);
    setTimeout(() => setCopiedNotification(null), 2000);
  };

  // Filtered projects for sidebar
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.aiTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.originalPrompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.platform.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (platformFilter === 'All') return true;
    if (platformFilter === 'LinkedIn Carousel') return p.category === 'carousel';
    if (platformFilter === 'Website Blog Image') return p.category === 'blog_image';
    if (platformFilter === 'Infographic') return p.category === 'infographic';
    return true;
  });

  const currentSlide = activeVersion.slides[activeSlideIndex] || activeVersion.slides[0];

  return (
    <div className="flex h-[calc(100vh-130px)] bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative">
      {/* 1. CHATGPT-STYLE CREATIVE HISTORY SIDEBAR */}
      <div className={`${isSidebarOpen ? 'w-80' : 'w-0'} bg-[#240947] text-white flex flex-col transition-all duration-300 ease-in-out shrink-0 border-r border-[#3e1374] overflow-hidden select-none`}>
        {/* Header & New Project */}
        <div className="p-3 border-b border-[#401579] space-y-2">
          <button
            onClick={handleCreateNewProject}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#531199] to-[#6F1FB3] hover:from-[#6F1FB3] hover:to-[#971199] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Creative Project</span>
          </button>

          {/* Search Across Creative History */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-purple-300 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search by topic, prompt, blog, platform..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#1b0638] text-purple-100 placeholder-purple-400/60 pl-8 pr-3 py-1.5 rounded-lg text-[11px] focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* Platform Quick Filter */}
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5 text-[10px] font-bold scrollbar-none">
            {['All', 'LinkedIn Carousel', 'Website Blog Image', 'Infographic'].map(f => (
              <button
                key={f}
                onClick={() => setPlatformFilter(f as any)}
                className={`px-2 py-0.5 rounded-md whitespace-nowrap transition-all ${
                  platformFilter === f
                    ? 'bg-[#531199] text-white'
                    : 'text-purple-300/70 hover:bg-white/5'
                }`}
              >
                {f.replace(' Carousel', '').replace('Website ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Project List */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1.5 text-xs scrollbar-thin scrollbar-thumb-purple-900">
          <div className="text-[10px] font-bold uppercase tracking-wider text-purple-300/60 px-2 py-1 flex items-center justify-between">
            <span>Creative History ({filteredProjects.length})</span>
            <span className="text-[9px] text-[#b5ffce]">Persistent</span>
          </div>

          {filteredProjects.map(proj => {
            const isActive = proj.id === activeProject.id;
            return (
              <div
                key={proj.id}
                onClick={() => handleSelectProject(proj.id)}
                className={`group p-2.5 rounded-xl cursor-pointer transition-all space-y-1 ${
                  isActive
                    ? 'bg-[#531199] text-white font-bold shadow-xs'
                    : 'text-purple-200/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase ${
                    isActive ? 'bg-white/20 text-white' : 'bg-purple-900/60 text-purple-300'
                  }`}>
                    {proj.platform.replace(' Carousel', '').replace('Website ', '')}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      proj.status === 'approved' ? 'bg-emerald-500/30 text-emerald-200' : 'bg-amber-500/30 text-amber-200'
                    }`}>
                      {proj.status === 'approved' ? '✓ Approved' : 'Draft'}
                    </span>
                    <button
                      onClick={(e) => handleDeleteProject(proj.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:text-rose-400 transition-opacity"
                      title="Archive creative project"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="font-extrabold text-xs truncate">
                  {proj.name}
                </div>

                <div className="flex items-center justify-between text-[10px] text-purple-300/70 pt-0.5">
                  <span className="truncate max-w-[140px]">{proj.versions.length} versions</span>
                  <span>{proj.updatedAt}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Footer: Reusable Memory Shortcut */}
        <div className="p-3 border-t border-[#401579] bg-[#1a0533] text-[11px] flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <Bookmark className="w-3.5 h-3.5 text-[#e28eff]" />
            <span className="text-purple-200 truncate">{approvedStyles.length} Approved Styles Memory</span>
          </div>
          <button
            onClick={() => setActiveTab('memory')}
            className="text-[10px] text-[#e28eff] hover:underline font-bold"
          >
            Browse
          </button>
        </div>
      </div>

      {/* 2. MAIN CREATIVE WORKSPACE */}
      <div className="flex-1 flex flex-col h-full bg-[#FAF8FC] overflow-hidden">
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-white border-b border-gray-200 flex items-center justify-between shrink-0 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              title={isSidebarOpen ? 'Collapse sidebar' : 'Open creative history'}
            >
              {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-[#17131C] tracking-tight">
                  {activeProject.name}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-purple-50 text-[#531199] border border-purple-200">
                  {activeProject.platform}
                </span>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  {activeVersion.dimensions}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5 truncate max-w-xl">
                {activeProject.aiTitle}
              </p>
            </div>
          </div>

          {/* Tab Navigation: Workspace vs Memory vs Reference Library */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-100 p-0.5 rounded-xl text-xs font-bold">
              <button
                onClick={() => setActiveTab('workspace')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === 'workspace' ? 'bg-[#531199] text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Workspace & Canvas
              </button>
              <button
                onClick={() => setActiveTab('memory')}
                className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  activeTab === 'memory' ? 'bg-[#531199] text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Bookmark className="w-3 h-3" />
                <span>Approved Styles ({approvedStyles.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('references')}
                className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  activeTab === 'references' ? 'bg-[#531199] text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BookOpen className="w-3 h-3" />
                <span>Reference Library</span>
              </button>
            </div>

            <button
              onClick={handleDuplicateProject}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-[#531199] hover:bg-purple-50"
              title="Duplicate creative project"
            >
              <CopyPlus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Success/Copied Toast */}
        {copiedNotification && (
          <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-1.5 text-center transition-all animate-fadeIn">
            ✓ {copiedNotification}
          </div>
        )}

        {/* TAB 1: WORKSPACE & CANVAS */}
        {activeTab === 'workspace' && (
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Left/Main Column: Canvas + Version History Navigator */}
            <div className="flex-1 flex flex-col overflow-y-auto p-5 space-y-4 border-r border-gray-200 scrollbar-thin scrollbar-thumb-purple-200">
              {/* VERSION CONTROL BAR */}
              <div className="bg-white p-3 rounded-xl border border-gray-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2 overflow-x-auto">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1">
                    <History className="w-3.5 h-3.5 text-[#531199]" />
                    Versions:
                  </span>
                  {activeProject.versions.map((ver) => (
                    <button
                      key={ver.id}
                      onClick={() => handleRestoreVersion(ver.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        ver.id === activeVersion.id
                          ? 'bg-[#531199] text-white shadow-xs'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span>v{ver.versionNumber}</span>
                      {ver.isApproved && <span className="text-[10px] text-emerald-300">✓</span>}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-500 font-medium hidden sm:inline">
                    {activeVersion.label}
                  </span>
                  <button
                    onClick={handleApproveCurrentVersion}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 text-white font-extrabold text-xs hover:bg-emerald-700 transition-all shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve Version & Save Style</span>
                  </button>
                </div>
              </div>

              {/* SLIDE NUMBER SELECTOR (FOR CAROUSEL) */}
              {activeVersion.slides.length > 1 && (
                <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold gap-2 overflow-x-auto shadow-2xs">
                  <div className="flex items-center gap-1.5">
                    {activeVersion.slides.map((s, idx) => (
                      <button
                        key={s.slideNumber}
                        onClick={() => {
                          setActiveSlideIndex(idx);
                          setEditingSlideIndex(null);
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          activeSlideIndex === idx
                            ? 'bg-[#531199] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Slide {s.slideNumber}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleCopyAllSlideCopy}
                      className="text-[11px] font-bold text-purple-700 hover:text-[#531199] flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy All Slides Copy</span>
                    </button>
                  </div>
                </div>
              )}

              {/* LIVE VISUAL PREVIEW CANVAS */}
              <div className="bg-gradient-to-tr from-[#2D0C57] to-[#531199] rounded-2xl p-7 text-white aspect-square max-h-[420px] flex flex-col justify-between shadow-lg relative overflow-hidden mx-auto w-full max-w-[500px]">
                {/* Canvas Watermark/Header */}
                <div className="flex items-center justify-between text-[11px] text-purple-200 border-b border-white/20 pb-2.5">
                  <span className="font-extrabold tracking-wide text-white text-xs">mFilterIt Digital Marketing</span>
                  <span className="bg-white/20 px-2.5 py-0.5 rounded text-[10px] font-bold text-white uppercase">
                    {currentSlide.type} • {activeVersion.dimensions}
                  </span>
                </div>

                {/* Main Slide Content */}
                <div className="my-auto py-3">
                  <h3 className="text-xl lg:text-2xl font-black text-white leading-tight tracking-tight">
                    {currentSlide.headline}
                  </h3>
                  <p className="text-purple-100 text-xs mt-3 leading-relaxed font-normal">
                    {currentSlide.body}
                  </p>

                  {currentSlide.bulletPoints && (
                    <ul className="mt-3.5 space-y-2 text-xs text-purple-200">
                      {currentSlide.bulletPoints.map((b, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#e28eff]" />
                          <span className="text-white font-medium">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Canvas Footer */}
                <div className="text-[10px] text-purple-300 border-t border-white/20 pt-2.5 flex items-center justify-between">
                  <span>{activeVersion.slides.length > 1 ? 'Swipe for next insight →' : 'mFilterIt Verified Content'}</span>
                  <span className="font-bold text-white">mfilterit.com</span>
                </div>
              </div>

              {/* VISUAL DIRECTIVE FOR CANVA */}
              <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-bold text-[#2D0C57]">
                  <span className="flex items-center gap-1.5 uppercase text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-[#971199]" />
                    Canva Layout & Illustration Directive:
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(currentSlide.visualPrompt);
                      setCopiedNotification('Visual Directive Copied!');
                      setTimeout(() => setCopiedNotification(null), 2000);
                    }}
                    className="text-purple-700 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Directive</span>
                  </button>
                </div>
                <p className="text-xs text-gray-700 italic leading-relaxed bg-[#F5F0FA] p-3 rounded-lg border border-purple-100">
                  "{currentSlide.visualPrompt}"
                </p>
                <div className="flex items-center justify-between pt-1 text-[11px] text-gray-500">
                  <span>Color Tokens: {activeVersion.colorPalette}</span>
                  <button
                    onClick={() => {
                      const task = tasks.find(t => t.id === 'task-1') || tasks[0];
                      onCreateCarousel(task);
                    }}
                    className="font-bold text-[#531199] hover:underline flex items-center gap-1"
                  >
                    <span>Open in Canva Slide Approval Modal</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: ChatGPT-Style Creative Conversation Workspace */}
            <div className="w-full lg:w-96 flex flex-col bg-white overflow-hidden shrink-0">
              {/* Chat Header */}
              <div className="p-3.5 border-b border-gray-200 bg-gray-50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#531199]" />
                  <span className="font-extrabold text-[#2D0C57]">Creative Conversation Workspace</span>
                </div>
                <span className="text-[10px] text-gray-400">Context Preserved</span>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs scrollbar-thin scrollbar-thumb-purple-200">
                {activeProject.conversation.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 ${
                      msg.sender === 'user' ? 'bg-[#531199] text-white' : 'bg-purple-100 text-[#2D0C57]'
                    }`}>
                      {msg.sender === 'user' ? 'MK' : <Palette className="w-3.5 h-3.5 text-[#531199]" />}
                    </div>

                    <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed space-y-1.5 shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-[#531199] text-white rounded-tr-none'
                        : 'bg-[#F5F0FA] text-gray-900 border border-purple-100 rounded-tl-none'
                    }`}>
                      <p className="whitespace-pre-line font-normal">{msg.text}</p>
                      {msg.versionGeneratedId && (
                        <div className="pt-1 border-t border-purple-200/40 text-[10px] font-bold text-purple-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Generated Version {msg.versionGeneratedId}</span>
                        </div>
                      )}
                      <div className={`text-[9px] text-right ${msg.sender === 'user' ? 'text-purple-200' : 'text-gray-400'}`}>
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                ))}

                {isGenerating && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-purple-50 text-purple-900 text-xs">
                    <Sparkles className="w-3.5 h-3.5 animate-spin text-[#531199]" />
                    <span>AI Creative Director is revising layout and generating new version...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input & Context-Aware Quick Prompt Chips */}
              <div className="p-3 border-t border-gray-200 bg-[#FAF8FC] space-y-2">
                {/* Context-aware suggestions */}
                <div className="flex items-center gap-1 overflow-x-auto pb-0.5 text-[10px] font-bold scrollbar-none">
                  {[
                    'Make slide 3 better',
                    'Keep same design but change content',
                    'Make it more premium B2B',
                    'Make this into a blog image',
                    'Use the same approved style'
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendCreativePrompt(chip)}
                      className="px-2 py-0.5 rounded-full bg-white hover:bg-purple-100 text-[#531199] border border-purple-200 whitespace-nowrap transition-all shadow-2xs"
                    >
                      {chip} →
                    </button>
                  ))}
                </div>

                <div className="bg-white rounded-xl border border-gray-300 focus-within:border-[#531199] p-1.5 flex items-end gap-1.5 transition-all">
                  <textarea
                    rows={2}
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendCreativePrompt();
                      }
                    }}
                    placeholder="Ask creative changes (e.g. 'Make slide 3 sharper', 'Change background to dark violet')..."
                    className="flex-1 bg-transparent px-2 py-1 text-xs text-gray-900 focus:outline-none resize-none leading-relaxed"
                  />
                  <button
                    onClick={() => handleSendCreativePrompt()}
                    disabled={!chatInput.trim() || isGenerating}
                    className="p-2 rounded-lg bg-[#531199] hover:bg-[#6F1FB3] disabled:opacity-40 text-white transition-all shadow-2xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: APPROVED CREATIVE MEMORY */}
        {activeTab === 'memory' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin scrollbar-thumb-purple-200">
            <div className="bg-white p-5 rounded-xl border border-purple-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#531199] uppercase tracking-wider">
                  <Bookmark className="w-4 h-4" />
                  <span>Approved Creative Design Memory</span>
                </div>
                <h3 className="text-xl font-black text-[#2D0C57] tracking-tight mt-1">
                  Reusable Brand Design Tokens & Layouts
                </h3>
                <p className="text-xs text-gray-600 mt-1 max-w-2xl">
                  When you approve a creative, its exact layout, typography hierarchy, dimensions, illustration style, and color palettes are remembered here. 
                  Say <strong>"Create another carousel in the same style"</strong> and Creative Studio retrieves it automatically!
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  ✓ {approvedStyles.length} Styles Memorized
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {approvedStyles.map((style) => (
                <div key={style.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-2xs space-y-3.5 hover:border-purple-300 transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase bg-purple-50 text-[#531199] px-2 py-0.5 rounded border border-purple-200">
                        {style.platform}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        Approved: {style.approvedDate}
                      </span>
                    </div>

                    <h4 className="font-black text-sm text-[#17131C]">
                      {style.name}
                    </h4>

                    <div className="space-y-1 text-xs text-gray-600 pt-1">
                      <div><strong className="text-gray-900">Dimensions: </strong>{style.dimensions}</div>
                      <div><strong className="text-gray-900">Colors: </strong>{style.colorPalette}</div>
                      <div><strong className="text-gray-900">Typography: </strong>{style.typographyStyle}</div>
                      <div><strong className="text-gray-900">Illustration: </strong>{style.illustrationStyle}</div>
                      <div><strong className="text-gray-900">Text Density: </strong>{style.textDensity}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 truncate max-w-[130px]">
                      From: {style.sourceProjectName}
                    </span>
                    <button
                      onClick={() => handleApplyApprovedStyle(style)}
                      className="px-3 py-1.5 rounded-lg bg-[#531199] text-white text-xs font-bold hover:bg-[#6F1FB3] transition-all shadow-2xs flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-purple-200" />
                      <span>Use This Style</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: REFERENCE LIBRARY */}
        {activeTab === 'references' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin scrollbar-thumb-purple-200">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#531199] uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Approved Reference & Template Vault</span>
                </div>
                <h3 className="text-xl font-black text-[#2D0C57] tracking-tight mt-1">
                  Persistent Reference Library
                </h3>
                <p className="text-xs text-gray-600 mt-1 max-w-2xl">
                  Re-use previously uploaded design references and brand style templates without uploading them again. Select 
                  <strong> "Use Previous Reference"</strong> to attach them directly into any creative session.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const newRef: ReferenceItem = {
                      id: `ref-${Date.now()}`,
                      name: 'Custom User Reference Template',
                      category: 'Brand Styles',
                      dimensions: '1080 × 1080',
                      tags: ['Custom', 'User Added'],
                      thumbnailDescription: 'User uploaded reference layout with mFilterIt Deep Purple and Violet gradients.',
                      colorCodes: ['#2D0C57', '#531199', '#FFFFFF'],
                      promptGuide: 'Apply custom user uploaded B2B SaaS layout.'
                    };
                    setReferenceLibrary(prev => [newRef, ...prev]);
                    setCopiedNotification('Added new reference to library!');
                    setTimeout(() => setCopiedNotification(null), 2000);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#531199] text-white font-bold text-xs hover:bg-[#6F1FB3] transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Reference</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {referenceLibrary.map((ref) => (
                <div key={ref.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-2xs space-y-3 hover:border-purple-300 transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase bg-purple-50 text-[#531199] px-2 py-0.5 rounded border border-purple-200">
                        {ref.category}
                      </span>
                      <span className="text-[10px] text-gray-400">{ref.dimensions}</span>
                    </div>

                    <h4 className="font-black text-sm text-[#17131C]">
                      {ref.name}
                    </h4>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {ref.thumbnailDescription}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {ref.colorCodes.map((c, i) => (
                        <span key={i} className="text-[9px] font-mono px-1.5 py-0.2 rounded border bg-gray-50 text-gray-700">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Library Token</span>
                    <button
                      onClick={() => {
                        setProjects(prev => prev.map(p => {
                          if (p.id !== activeProject.id) return p;
                          return {
                            ...p,
                            usedReferences: Array.from(new Set([...p.usedReferences, ref.id]))
                          };
                        }));
                        setActiveTab('workspace');
                        setCopiedNotification(`Attached reference "${ref.name}" to current project!`);
                        setTimeout(() => setCopiedNotification(null), 2000);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-purple-50 text-[#531199] border border-purple-200 text-xs font-bold hover:bg-purple-100 transition-all flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Use Previous Reference</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

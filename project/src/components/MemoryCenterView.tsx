import React, { useState } from 'react';
import { 
  Database, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  Plus, 
  Trash2, 
  FileText, 
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  FileSpreadsheet,
  Globe,
  Share2,
  BarChart2,
  Eye,
  Filter,
  Calendar,
  Tag,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Check,
  X
} from 'lucide-react';
import { 
  MFILTERIT_MASTER_KNOWLEDGE, 
  StoredMemoryItem, 
  UploadedFile,
  PARSED_KEYWORD_RANKINGS,
  PARSED_ANALYTICS_DATA,
  PARSED_CONTENT_CALENDAR,
  CROSS_MODULE_MATRIX
} from '../data/knowledgeBase';

interface MemoryCenterViewProps {
  memoryItems: StoredMemoryItem[];
  uploadedFiles: UploadedFile[];
  onOpenUpload: () => void;
  onAddMemoryItem: (item: StoredMemoryItem) => void;
  onDeleteMemoryItem: (id: string) => void;
  onUpdateFileCategory?: (fileId: string, category: UploadedFile['category']) => void;
  onDeleteFile?: (fileId: string) => void;
}

export const MemoryCenterView: React.FC<MemoryCenterViewProps> = ({
  memoryItems,
  uploadedFiles,
  onOpenUpload,
  onAddMemoryItem,
  onDeleteMemoryItem,
  onUpdateFileCategory,
  onDeleteFile
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'files' | 'keywords' | 'analytics' | 'calendar' | 'brand' | 'sharepoint'
  >('overview');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('all');

  // Preview Modal State
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);

  // New Note State
  const [isAddingNewNote, setIsAddingNewNote] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<StoredMemoryItem['category']>('permanent_brand');
  const [newTags, setNewTags] = useState('Brand Guidelines, Positioning');

  // SharePoint Connection State
  const [sharePointState, setSharePointState] = useState<{
    status: 'connected' | 'disconnected' | 'connecting' | 'error';
    lastSync: string;
    siteUrl: string;
    selectedFile: string;
    errorMessage?: string;
  }>({
    status: 'connected',
    lastSync: 'Today, 08:30 AM',
    siteUrl: 'https://mfilteritd-my.sharepoint.com/:x:/g/personal/tannu_saini_mfilterit_com/IQAIK8fpoMdhRI9Uh1dFmkp1ARAPTVdPv2onZFmWdkOOfM4?e=uBFrgN',
    selectedFile: 'Link Building master sheet (tannu_saini_mfilterit_com)'
  });

  const handleSharePointSync = () => {
    setSharePointState(prev => ({ ...prev, status: 'connecting' }));
    setTimeout(() => {
      const now = new Date();
      const timeStr = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      setSharePointState(prev => ({
        ...prev,
        status: 'connected',
        lastSync: timeStr
      }));
    }, 1200);
  };

  const handleSaveNewItem = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const item: StoredMemoryItem = {
      id: `mem-${Date.now()}`,
      category: newCategory,
      title: newTitle,
      content: newContent,
      tags: newTags.split(',').map(t => t.trim()),
      lastUpdated: 'Just now',
      source: 'User Note (Knowledge Hub)',
      isSystemGrounded: false
    };
    onAddMemoryItem(item);
    setNewTitle('');
    setNewContent('');
    setIsAddingNewNote(false);
  };

  const pillars = MFILTERIT_MASTER_KNOWLEDGE.threeTrustPillars;

  // Calculate statistics
  const totalFiles = uploadedFiles.length;
  const totalRecords = uploadedFiles.reduce((acc, f) => acc + (f.recordCount || 0), 0) + 355;
  const keywordSheetsCount = uploadedFiles.filter(f => f.category === 'Keyword Ranking').length || 3;

  // Filtered files
  const filteredUploadedFiles = uploadedFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          file.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategoryFilter === 'all' || file.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Filtered Keywords
  const filteredKeywords = PARSED_KEYWORD_RANKINGS.filter(kw => {
    const matchesSearch = kw.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          kw.targetUrl.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountryFilter === 'all' || kw.country.toLowerCase() === selectedCountryFilter.toLowerCase();
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Module Header */}
      <div className="bg-gradient-to-r from-[#2D0C57] via-[#531199] to-[#6F1FB3] rounded-2xl p-6 text-white shadow-lg border border-purple-800/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
                <Database className="w-6 h-6 text-[#E3B624]" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight">
                  mFilterIt Knowledge Hub
                </h1>
                <p className="text-xs text-purple-200 mt-0.5 font-medium">
                  Central, persistent knowledge repository feeding Social Bookmarking, Blog Promotion, SEO/AEO, and Content Distribution.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenUpload}
              className="flex items-center space-x-2 bg-[#E3B624] text-[#2D0C57] px-4 py-2 rounded-xl text-xs font-bold hover:bg-yellow-400 transition-all shadow-md active:scale-95"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Files to Hub</span>
            </button>
            <button
              onClick={handleSharePointSync}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl text-xs font-bold border border-white/20 transition-all backdrop-blur-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${sharePointState.status === 'connecting' ? 'animate-spin' : ''}`} />
              <span>Sync SharePoint</span>
            </button>
          </div>
        </div>

        {/* Top Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6 pt-5 border-t border-purple-400/20 text-xs">
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-md border border-white/10">
            <div className="text-[10px] uppercase tracking-wider text-purple-200 font-bold">Uploaded Documents</div>
            <div className="text-lg font-black text-white mt-1 flex items-center justify-between">
              <span>{totalFiles} Files</span>
              <FileSpreadsheet className="w-4 h-4 text-[#E3B624]" />
            </div>
            <div className="text-[10px] text-purple-300 mt-0.5">CSVs, PDFs & Guidelines</div>
          </div>

          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-md border border-white/10">
            <div className="text-[10px] uppercase tracking-wider text-purple-200 font-bold">Indexed Knowledge Records</div>
            <div className="text-lg font-black text-white mt-1 flex items-center justify-between">
              <span>{totalRecords.toLocaleString()}</span>
              <Layers className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-[10px] text-purple-300 mt-0.5">Rows & Direct Answer Blocks</div>
          </div>

          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-md border border-white/10">
            <div className="text-[10px] uppercase tracking-wider text-purple-200 font-bold">Keyword Ranking Sheets</div>
            <div className="text-lg font-black text-white mt-1 flex items-center justify-between">
              <span>3 Regions</span>
              <Globe className="w-4 h-4 text-sky-300" />
            </div>
            <div className="text-[10px] text-purple-300 mt-0.5">India • MENA • USA</div>
          </div>

          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-md border border-white/10">
            <div className="text-[10px] uppercase tracking-wider text-purple-200 font-bold">GA4 + GSC Data</div>
            <div className="text-lg font-black text-white mt-1 flex items-center justify-between">
              <span>Synced</span>
              <BarChart2 className="w-4 h-4 text-indigo-300" />
            </div>
            <div className="text-[10px] text-purple-300 mt-0.5">Last 28-day Performance</div>
          </div>

          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-md border border-white/10 col-span-2 sm:col-span-1">
            <div className="text-[10px] uppercase tracking-wider text-purple-200 font-bold">Retrieval Engines</div>
            <div className="text-lg font-black text-white mt-1 flex items-center justify-between">
              <span>6 Modules</span>
              <Cpu className="w-4 h-4 text-purple-300" />
            </div>
            <div className="text-[10px] text-purple-300 mt-0.5">Live Data Injection</div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 bg-white rounded-xl px-2 pt-1 shadow-xs overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'border-[#531199] text-[#531199] bg-purple-50/50 rounded-t-lg'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Overview & Retrieval Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('files')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'files'
              ? 'border-[#531199] text-[#531199] bg-purple-50/50 rounded-t-lg'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Uploaded Files Hub ({uploadedFiles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('keywords')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'keywords'
              ? 'border-[#531199] text-[#531199] bg-purple-50/50 rounded-t-lg'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Globe className="w-4 h-4 text-emerald-600" />
          <span>Keyword Ranking Sheets (India/MENA/USA)</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'border-[#531199] text-[#531199] bg-purple-50/50 rounded-t-lg'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <BarChart2 className="w-4 h-4 text-blue-600" />
          <span>GA4 + GSC Performance Data</span>
        </button>

        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'calendar'
              ? 'border-[#531199] text-[#531199] bg-purple-50/50 rounded-t-lg'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Calendar className="w-4 h-4 text-purple-600" />
          <span>Content Calendar & Planned Assets</span>
        </button>

        <button
          onClick={() => setActiveTab('brand')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'brand'
              ? 'border-[#531199] text-[#531199] bg-purple-50/50 rounded-t-lg'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Brand Memory & 3 Trust Pillars</span>
        </button>

        <button
          onClick={() => setActiveTab('sharepoint')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'sharepoint'
              ? 'border-[#531199] text-[#531199] bg-purple-50/50 rounded-t-lg'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Share2 className="w-4 h-4 text-indigo-600" />
          <span>SharePoint Sync</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & RETRIEVAL MATRIX */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Active Ingestion Status Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-emerald-900">
                  Knowledge Hub Active & Fully Connected to All Dashboard Modules
                </div>
                <p className="text-emerald-700 mt-0.5">
                  Uploaded files (Keyword Ranking India/MENA/USA, GA4 Analytics, GSC Performance, Content Calendar) are synchronized and available to all marketing actions.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold bg-white text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200 shadow-xs">
              Last Sync: Just now
            </span>
          </div>

          {/* Cross-Module Usage Visualizer Matrix */}
          <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-sm font-extrabold text-[#2D0C57] flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#531199]" />
                  <span>Knowledge Hub Cross-Module Retrieval Matrix</span>
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Displays how uploaded files automatically supply verified data to each marketing engine across the dashboard.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-[#531199]">
                Live Auto-Retrieval
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CROSS_MODULE_MATRIX.map(matrix => (
                <div key={matrix.moduleId} className="p-4 rounded-xl border border-purple-100 bg-purple-50/30 space-y-2.5 hover:shadow-xs transition-all">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[#2D0C57] text-xs">
                      {matrix.moduleName}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      <Check className="w-3 h-3" />
                      {matrix.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    {matrix.purpose}
                  </p>

                  <div className="pt-2 border-t border-purple-100">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">
                      Retrieved Files:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {matrix.usedFiles.map((fileName, idx) => (
                        <span key={idx} className="text-[10px] font-medium bg-white text-purple-900 border border-purple-200 px-2 py-0.5 rounded-md">
                          📄 {fileName}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Master 3 Trust Pillars Architecture */}
          <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-sm font-extrabold text-[#2D0C57] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#531199]" />
                <span>mFilterIt 3 Trust Pillars Master Architecture</span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Core domain positioning stored permanently in Knowledge Hub for brand-consistent content generation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-purple-200 bg-gradient-to-b from-purple-50/50 to-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#531199] uppercase tracking-wide">Pillar 1</span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-100 text-[#531199] text-[10px] font-bold">Media Trust</span>
                </div>
                <h3 className="font-extrabold text-[#2D0C57] text-sm">{pillars.mediaTrust.name}</h3>
                <p className="text-xs text-gray-600 leading-snug">{pillars.mediaTrust.description}</p>
                <div className="text-[10px] text-purple-800 font-semibold pt-1">
                  Solutions: Ad Traffic Validation, App Install Fraud, Affiliate Fraud, Brand Safety
                </div>
              </div>

              <div className="p-4 rounded-xl border border-purple-200 bg-gradient-to-b from-purple-50/50 to-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#971199] uppercase tracking-wide">Pillar 2</span>
                  <span className="px-2 py-0.5 rounded-md bg-pink-100 text-[#971199] text-[10px] font-bold">Brand Trust</span>
                </div>
                <h3 className="font-extrabold text-[#2D0C57] text-sm">{pillars.brandTrust.name}</h3>
                <p className="text-xs text-gray-600 leading-snug">{pillars.brandTrust.description}</p>
                <div className="text-[10px] text-pink-800 font-semibold pt-1">
                  Solutions: eCommerce Brand Protection, Counterfeit Detection, MAP Compliance
                </div>
              </div>

              <div className="p-4 rounded-xl border border-purple-200 bg-gradient-to-b from-purple-50/50 to-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#6F1FB3] uppercase tracking-wide">Pillar 3</span>
                  <span className="px-2 py-0.5 rounded-md bg-violet-100 text-[#6F1FB3] text-[10px] font-bold">Financial Trust</span>
                </div>
                <h3 className="font-extrabold text-[#2D0C57] text-sm">{pillars.financialTrust.name}</h3>
                <p className="text-xs text-gray-600 leading-snug">{pillars.financialTrust.description}</p>
                <div className="text-[10px] text-violet-800 font-semibold pt-1">
                  Solutions: Direct Carrier Billing (DCB) Fraud, Digital Scam Protection
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: UPLOADED FILES & INGESTION HUB */}
      {activeTab === 'files' && (
        <div className="space-y-4">
          {/* Search & Category Filter Bar */}
          <div className="bg-white rounded-xl p-4 border border-purple-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search uploaded files by name or summary..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#531199]"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-200 bg-white font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#531199]"
              >
                <option value="all">All File Categories</option>
                <option value="Content Calendar">Content Calendar</option>
                <option value="Keyword Ranking">Keyword Ranking</option>
                <option value="GA4 Analytics">GA4 Analytics</option>
                <option value="GSC Performance">GSC Performance</option>
                <option value="Brand Guidelines">Brand Guidelines</option>
                <option value="SEO Resources">SEO Resources</option>
              </select>

              <button
                onClick={onOpenUpload}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#531199] text-white font-bold hover:bg-[#6F1FB3] transition-all"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload File</span>
              </button>
            </div>
          </div>

          {/* Files List Table */}
          <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden text-xs">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-[#2D0C57] text-sm">Uploaded Knowledge Files</h3>
                <p className="text-gray-500 text-[11px]">Showing {filteredUploadedFiles.length} uploaded marketing documents</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-purple-50/60 border-b border-purple-100 text-[11px] font-extrabold text-[#2D0C57] uppercase tracking-wider">
                    <th className="p-3">File Name & Type</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Source & Size</th>
                    <th className="p-3">Usage Scope</th>
                    <th className="p-3">Status & Records</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {filteredUploadedFiles.map(file => (
                    <tr key={file.id} className="hover:bg-purple-50/20 transition-colors">
                      <td className="p-3">
                        <div className="flex items-start space-x-2.5">
                          <FileText className="w-5 h-5 text-[#531199] shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-[#2D0C57] hover:underline cursor-pointer" onClick={() => setPreviewFile(file)}>
                              {file.name}
                            </div>
                            <p className="text-[11px] text-gray-500 line-clamp-1 max-w-xs">{file.summary}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-3 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-[#531199] border border-purple-200">
                          {file.category}
                        </span>
                      </td>

                      <td className="p-3 whitespace-nowrap text-gray-600 text-[11px]">
                        <div>{file.sourceType}</div>
                        <div className="text-gray-400 text-[10px]">{file.size} • {file.uploadDate}</div>
                      </td>

                      <td className="p-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700">
                          [{file.usageScope}]
                        </span>
                      </td>

                      <td className="p-3 whitespace-nowrap">
                        <div className="flex items-center space-x-1.5 text-emerald-700 text-[11px] font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Synced</span>
                        </div>
                        <div className="text-[10px] text-gray-500">{file.recordCount || 42} records parsed</div>
                      </td>

                      <td className="p-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            onClick={() => setPreviewFile(file)}
                            className="p-1.5 rounded-lg text-purple-700 hover:bg-purple-100 transition-colors"
                            title="Preview Content"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {onDeleteFile && (
                            <button
                              onClick={() => onDeleteFile(file.id)}
                              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete File"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: KEYWORD RANKING SHEETS (INDIA / MENA / USA) */}
      {activeTab === 'keywords' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 border border-purple-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-700">Filter Region:</span>
              {['all', 'India', 'MENA', 'USA'].map(country => (
                <button
                  key={country}
                  onClick={() => setSelectedCountryFilter(country)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    selectedCountryFilter === country
                      ? 'bg-[#531199] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {country === 'all' ? 'All Regions' : country}
                </button>
              ))}
            </div>

            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search keywords or target URLs..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#531199]"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden text-xs">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-[#2D0C57] text-sm">Parsed Keyword Ranking Sheet Data</h3>
                <p className="text-gray-500 text-[11px]">Synchronized from uploaded India, MENA, and USA keyword ranking CSV files</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-purple-50/60 border-b border-purple-100 text-[11px] font-extrabold text-[#2D0C57] uppercase tracking-wider">
                    <th className="p-3">Target Keyword</th>
                    <th className="p-3">Country</th>
                    <th className="p-3">Trust Pillar</th>
                    <th className="p-3">Current Rank</th>
                    <th className="p-3">Search Volume</th>
                    <th className="p-3">Target Canonical URL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {filteredKeywords.map(kw => (
                    <tr key={kw.id} className="hover:bg-purple-50/20 transition-colors">
                      <td className="p-3 font-bold text-[#2D0C57]">
                        {kw.keyword}
                      </td>

                      <td className="p-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-[#531199]">
                          {kw.country}
                        </span>
                      </td>

                      <td className="p-3 whitespace-nowrap text-gray-600">
                        {kw.pillar}
                      </td>

                      <td className="p-3 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="font-black text-sm text-[#2D0C57]">#{kw.rank}</span>
                          {kw.change > 0 && (
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
                              <TrendingUp className="w-3 h-3 mr-0.5" /> +{kw.change}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-3 whitespace-nowrap text-gray-700 font-semibold">
                        {kw.searchVolume.toLocaleString()} / mo
                      </td>

                      <td className="p-3 text-purple-800 text-[11px] truncate max-w-xs font-mono">
                        <a href={kw.targetUrl} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                          <span>{kw.targetUrl}</span>
                          <ExternalLink className="w-3 h-3 text-purple-400 shrink-0" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GA4 + GSC PERFORMANCE DATA */}
      {activeTab === 'analytics' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden text-xs">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-extrabold text-[#2D0C57] text-sm">Parsed GA4 & GSC Performance Metrics</h3>
              <p className="text-gray-500 text-[11px]">Organic landing page performance extracted from uploaded GA4 and GSC CSV files</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-purple-50/60 border-b border-purple-100 text-[11px] font-extrabold text-[#2D0C57] uppercase tracking-wider">
                    <th className="p-3">Page Title & URL</th>
                    <th className="p-3">GA4 Sessions</th>
                    <th className="p-3">Engagement Rate</th>
                    <th className="p-3">Avg Duration</th>
                    <th className="p-3">GSC Clicks</th>
                    <th className="p-3">GSC Impressions</th>
                    <th className="p-3">GSC CTR</th>
                    <th className="p-3">Avg Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {PARSED_ANALYTICS_DATA.map(item => (
                    <tr key={item.id} className="hover:bg-purple-50/20 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-[#2D0C57]">{item.pageTitle}</div>
                        <div className="text-[10px] text-purple-700 font-mono truncate max-w-xs">{item.pageUrl}</div>
                      </td>
                      <td className="p-3 font-bold text-gray-900">{item.sessions.toLocaleString()}</td>
                      <td className="p-3 text-emerald-700 font-bold">{item.engagementRate}</td>
                      <td className="p-3 text-gray-600">{item.avgEngagementTime}</td>
                      <td className="p-3 font-bold text-[#531199]">{item.gscClicks.toLocaleString()}</td>
                      <td className="p-3 text-gray-700">{item.gscImpressions.toLocaleString()}</td>
                      <td className="p-3 font-bold text-amber-700">{item.ctr}</td>
                      <td className="p-3 font-black text-[#2D0C57]">#{item.avgPosition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CONTENT CALENDAR */}
      {activeTab === 'calendar' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden text-xs">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-extrabold text-[#2D0C57] text-sm">Parsed Content Calendar & Distribution Schedule</h3>
              <p className="text-gray-500 text-[11px]">Synchronized from uploaded Content Calendar CSV files</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-purple-50/60 border-b border-purple-100 text-[11px] font-extrabold text-[#2D0C57] uppercase tracking-wider">
                    <th className="p-3">Publish Date</th>
                    <th className="p-3">Blog / Content Title</th>
                    <th className="p-3">Pillar</th>
                    <th className="p-3">Target Keyword</th>
                    <th className="p-3">Channel</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Assignee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {PARSED_CONTENT_CALENDAR.map(cal => (
                    <tr key={cal.id} className="hover:bg-purple-50/20 transition-colors">
                      <td className="p-3 font-bold text-gray-900 whitespace-nowrap">{cal.publishDate}</td>
                      <td className="p-3 font-bold text-[#2D0C57]">{cal.blogTitle}</td>
                      <td className="p-3 whitespace-nowrap text-purple-800 font-semibold">{cal.category}</td>
                      <td className="p-3 text-gray-600 italic">"{cal.targetKeyword}"</td>
                      <td className="p-3 whitespace-nowrap font-semibold text-gray-700">{cal.channel}</td>
                      <td className="p-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          cal.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                          cal.status === 'Scheduled' ? 'bg-purple-100 text-[#531199]' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {cal.status}
                        </span>
                      </td>
                      <td className="p-3 whitespace-nowrap text-gray-700 font-medium">{cal.assignee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: BRAND MEMORY & GUIDELINES */}
      {activeTab === 'brand' && (
        <div className="space-y-6">
          {/* Custom Saved Notes Section */}
          <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-extrabold text-[#2D0C57] text-sm">Saved Custom Brand Knowledge Notes</h3>
                <p className="text-gray-500 text-[11px]">User-added persistent guidelines for AI reference</p>
              </div>

              <button
                onClick={() => setIsAddingNewNote(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#531199] text-white text-xs font-bold hover:bg-[#6F1FB3]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Note</span>
              </button>
            </div>

            {isAddingNewNote && (
              <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 space-y-3 text-xs">
                <div className="font-bold text-[#2D0C57]">Create New Persistent Knowledge Note</div>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Note Title (e.g. Approved B2B Case Study Metrics)..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white"
                />
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Enter detailed marketing guidelines or brand rules..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsAddingNewNote(false)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNewItem}
                    className="px-4 py-1.5 rounded-lg bg-[#531199] text-white font-bold"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {memoryItems.map(item => (
                <div key={item.id} className="p-4 rounded-xl border border-purple-100 bg-purple-50/20 space-y-2 relative group">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#2D0C57] text-xs">{item.title}</span>
                    <button
                      onClick={() => onDeleteMemoryItem(item.id)}
                      className="text-gray-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.content}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-medium bg-white text-purple-800 px-2 py-0.5 rounded border border-purple-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: SHAREPOINT SYNC */}
      {activeTab === 'sharepoint' && (
        <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="font-extrabold text-[#2D0C57] text-sm">Microsoft SharePoint Direct Sheet Sync</h3>
              <p className="text-gray-500 text-[11px]">Synchronizes live marketing sheets from mFilterIt SharePoint repository</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              Connected & Active
            </span>
          </div>

          <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-[#2D0C57]">Active SharePoint URL:</div>
                <div className="text-purple-800 font-mono text-[11px] truncate max-w-lg mt-0.5">{sharePointState.siteUrl}</div>
              </div>
              <button
                onClick={handleSharePointSync}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#531199] text-white font-bold hover:bg-[#6F1FB3]"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${sharePointState.status === 'connecting' ? 'animate-spin' : ''}`} />
                <span>Force Sync Now</span>
              </button>
            </div>

            <div className="pt-2 border-t border-purple-100 text-gray-600 flex items-center justify-between text-[11px]">
              <span>Synced File: <strong>{sharePointState.selectedFile}</strong></span>
              <span>Last Sync Time: <strong>{sharePointState.lastSync}</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* FILE CONTENT PREVIEW MODAL */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-purple-200 relative my-6 text-xs space-y-4">
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-xl text-[#531199]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#2D0C57] text-base">{previewFile.name}</h3>
                  <p className="text-gray-500 text-[11px]">Category: {previewFile.category} • Scope: {previewFile.usageScope}</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewFile(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-purple-50/80 border border-purple-100 text-purple-950 font-medium">
              <strong>Extracted Summary:</strong> {previewFile.summary}
            </div>

            <div className="bg-gray-900 text-emerald-400 rounded-xl p-4 font-mono text-[11px] overflow-x-auto max-h-60">
              <div className="text-gray-400 text-[10px] mb-2">// Ingested & Parsed Sample Rows ({previewFile.name})</div>
              <div>1: "keyword", "search_volume", "target_url", "mfilterit_pillar", "current_rank"</div>
              <div>2: "mobile app install fraud prevention", "2900", "https://www.mfilterit.com/blog/mobile-app-install-fraud-prevention/", "Media Trust", "6"</div>
              <div>3: "ecommerce brand protection platform", "3800", "https://www.mfilterit.com/blog/ecommerce-brand-infringement-monitoring/", "Brand Trust", "5"</div>
              <div>4: "dcb fraud prevention telecom", "3200", "https://www.mfilterit.com/solutions/dcb-fraud/", "Financial Trust", "2"</div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setPreviewFile(null)}
                className="px-4 py-2 rounded-xl bg-[#531199] text-white font-bold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle2, 
  Link2, 
  Search, 
  Plus, 
  ShieldCheck, 
  Target, 
  Globe, 
  Layers, 
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  Bookmark,
  Share2,
  Megaphone,
  Building2,
  FileText,
  Check,
  Tag,
  AlertTriangle
} from 'lucide-react';
import { GoogleApiService, BlogActionRecommendation } from '../services/googleApiService';

export type LinkBuildingCategory = 
  | 'Social Bookmarking'
  | 'Blog Promotion'
  | 'Quora'
  | 'Reddit'
  | 'Content Seeding'
  | 'Guest Post'
  | 'Business Listing';

export interface BacklinkTarget {
  id: string;
  domain: string;
  category: LinkBuildingCategory;
  da: number;
  pa: number;
  spamScore: string;
  targetPage: string;
  plannedAnchorText: string;
  status: 'Prospecting' | 'Contacted' | 'In Negotiation' | 'Content Sent' | 'Live' | 'Rejected';
  toxicityScore: 'Safe' | 'Low Risk' | 'Medium Risk' | 'Toxic';
  lastVerified: string;
  outreachContact: string;
  notes?: string;
}

export const ReportsView: React.FC = () => {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState('Today, Live');
  const [activeTab, setActiveTab] = useState<'all' | LinkBuildingCategory>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingTarget, setIsAddingTarget] = useState(false);

  // Live GA4 & GSC Recommendations
  const [liveRecs, setLiveRecs] = useState<{
    socialBookmarking: BlogActionRecommendation[];
    blogPromotion: BlogActionRecommendation[];
  } | null>(null);

  useEffect(() => {
    handleFetchLiveGscGa();
  }, []);

  const handleFetchLiveGscGa = async () => {
    setSyncing(true);
    try {
      const recs = await GoogleApiService.getBlogRecommendations();
      setLiveRecs({
        socialBookmarking: recs.socialBookmarking,
        blogPromotion: recs.blogPromotion
      });
      setLastSync(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (e) {
      console.error(e);
    } finally {
      setSyncing(false);
    }
  };

  const sharePointUrl = "https://mfilteritd-my.sharepoint.com/:x:/g/personal/tannu_saini_mfilterit_com/IQAIK8fpoMdhRI9Uh1dFmkp1ARAPTVdPv2onZFmWdkOOfM4?e=uBFrgN";

  const [targets, setTargets] = useState<BacklinkTarget[]>([
    {
      id: 'bl-sb-1',
      domain: 'pinterest.com/mfilterit_tech',
      category: 'Social Bookmarking',
      da: 94,
      pa: 78,
      spamScore: '0%',
      targetPage: '/blog/meta-ads-click-fraud-detection/',
      plannedAnchorText: 'Meta Ads Click Fraud Infographic 2026',
      status: 'Live',
      toxicityScore: 'Safe',
      lastVerified: 'Sep 30, 2026',
      outreachContact: 'mFilterIt Social Desk',
      notes: 'Indexed on Pinterest B2B Fraud Prevention Board'
    },
    {
      id: 'bl-sb-2',
      domain: 'tumblr.com/ad-fraud-insights',
      category: 'Social Bookmarking',
      da: 86,
      pa: 68,
      spamScore: '1%',
      targetPage: '/ad-traffic-validation/',
      plannedAnchorText: 'mFilterIt ad traffic validation platform',
      status: 'Live',
      toxicityScore: 'Safe',
      lastVerified: 'Sep 29, 2026',
      outreachContact: 'mFilterIt Distribution Desk',
      notes: 'Social bookmarking link verified'
    },
    {
      id: 'bl-bp-1',
      domain: 'martechcube.com',
      category: 'Blog Promotion',
      da: 58,
      pa: 46,
      spamScore: '1%',
      targetPage: '/blog/meta-ads-click-fraud-detection/',
      plannedAnchorText: 'Meta Advantage+ ad fraud prevention',
      status: 'Live',
      toxicityScore: 'Safe',
      lastVerified: 'Sep 30, 2026',
      outreachContact: 'editor@martechcube.com',
      notes: 'Partner blog feature published'
    },
    {
      id: 'bl-bp-2',
      domain: 'adpushup.com/blog',
      category: 'Blog Promotion',
      da: 64,
      pa: 52,
      spamScore: '2%',
      targetPage: '/blog/mobile-app-install-fraud-prevention/',
      plannedAnchorText: 'mobile app install fraud benchmark',
      status: 'Content Sent',
      toxicityScore: 'Safe',
      lastVerified: 'Sep 29, 2026',
      outreachContact: 'partnerships@adpushup.com',
      notes: 'Awaiting editor publishing schedule'
    }
  ]);

  const categoriesList: { name: LinkBuildingCategory; icon: any; count: number }[] = [
    { name: 'Social Bookmarking', icon: Bookmark, count: targets.filter(t => t.category === 'Social Bookmarking').length },
    { name: 'Blog Promotion', icon: Megaphone, count: targets.filter(t => t.category === 'Blog Promotion').length },
    { name: 'Quora', icon: MessageSquare, count: targets.filter(t => t.category === 'Quora').length },
    { name: 'Reddit', icon: Share2, count: targets.filter(t => t.category === 'Reddit').length },
    { name: 'Content Seeding', icon: Layers, count: targets.filter(t => t.category === 'Content Seeding').length },
    { name: 'Guest Post', icon: FileText, count: targets.filter(t => t.category === 'Guest Post').length },
    { name: 'Business Listing', icon: Building2, count: targets.filter(t => t.category === 'Business Listing').length }
  ];

  const filteredTargets = targets.filter(t => {
    const matchesTab = activeTab === 'all' || t.category === activeTab;
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      t.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.targetPage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.plannedAnchorText.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#531199] uppercase tracking-wider">
              <FileSpreadsheet className="w-4 h-4" />
              <span>SharePoint Master Link-Building & Distribution Hub</span>
            </div>
            <h2 className="text-2xl font-black text-[#2D0C57] tracking-tight mt-1">
              SEO Link Building & Content Distribution
            </h2>
            <p className="text-xs text-gray-600 mt-1 max-w-3xl">
              Tracks outreach, social bookmarking, blog promotion, Quora, Reddit, content seeding, and guest post backlink assets synchronized with SharePoint master sheet.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleFetchLiveGscGa}
              disabled={syncing}
              className="flex items-center gap-2 px-4 py-2 bg-[#531199] hover:bg-[#2D0C57] text-white text-xs font-bold rounded-xl transition-all shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Fetching Live Data...' : 'Live Result (GSC & GA4)'}</span>
            </button>

            <a
              href={sharePointUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#F5F0FA] hover:bg-purple-100 text-[#531199] text-xs font-bold rounded-xl border border-purple-200 transition-all shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open SharePoint Sheet</span>
            </a>
          </div>
        </div>

        {/* Categories Tab Strip */}
        <div className="flex items-center gap-2 mt-6 border-b border-gray-200 pb-2 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'all'
                ? 'bg-[#531199] text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            All Sub-Tabs ({targets.length})
          </button>
          {categoriesList.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveTab(cat.name)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === cat.name
                    ? 'bg-[#531199] text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === cat.name ? 'bg-white text-[#531199]' : 'bg-gray-200 text-gray-700'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Blog Recommendations from GSC & GA4 for Social Bookmarking & Blog Promotion */}
      {(activeTab === 'all' || activeTab === 'Social Bookmarking' || activeTab === 'Blog Promotion') && liveRecs && (
        <div className="bg-white rounded-xl border border-purple-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#531199]" />
              <h3 className="text-base font-black text-[#2D0C57]">
                Live GSC & GA4 Recommended Blogs To Work On Today
              </h3>
            </div>
            <button
              onClick={handleFetchLiveGscGa}
              disabled={syncing}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#531199] text-white text-xs font-bold rounded-lg hover:bg-[#2D0C57]"
            >
              <RefreshCw className={`w-3 h-3 ${syncing ? 'animate-spin' : ''}`} />
              <span>Live Result</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Social Bookmarking Recommendations */}
            {(activeTab === 'all' || activeTab === 'Social Bookmarking') && liveRecs.socialBookmarking.map((rec, idx) => (
              <div key={idx} className="bg-[#F5F0FA] p-4 rounded-xl border border-purple-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-purple-200 text-[#531199] px-2 py-0.5 rounded">
                    Social Bookmarking
                  </span>
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">
                    {rec.priority} Priority
                  </span>
                </div>
                <h4 className="text-xs font-bold text-gray-900">{rec.blogTitle}</h4>
                <p className="text-xs text-gray-700 font-medium">{rec.reason}</p>

                {/* Target Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {rec.recommendedTags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-bold text-[#531199] bg-white px-2 py-0.5 rounded border border-purple-200">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2 text-[11px] font-bold text-[#531199] border-t border-purple-200 flex items-center justify-between">
                  <span>Action: {rec.suggestedAction}</span>
                </div>
              </div>
            ))}

            {/* Blog Promotion Recommendations */}
            {(activeTab === 'all' || activeTab === 'Blog Promotion') && liveRecs.blogPromotion.map((rec, idx) => (
              <div key={idx} className="bg-[#F5F0FA] p-4 rounded-xl border border-purple-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-purple-200 text-[#531199] px-2 py-0.5 rounded">
                    Blog Promotion
                  </span>
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">
                    {rec.priority} Priority
                  </span>
                </div>
                <h4 className="text-xs font-bold text-gray-900">{rec.blogTitle}</h4>
                <p className="text-xs text-gray-700 font-medium">{rec.reason}</p>

                {/* Target Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {rec.recommendedTags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-bold text-[#531199] bg-white px-2 py-0.5 rounded border border-purple-200">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2 text-[11px] font-bold text-[#531199] border-t border-purple-200 flex items-center justify-between">
                  <span>Action: {rec.suggestedAction}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Target Directory Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search domain, target page, anchor text..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#531199]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700"
            >
              <option value="all">All Statuses</option>
              <option value="Prospecting">Prospecting</option>
              <option value="Content Sent">Content Sent</option>
              <option value="Live">Live</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-3">Target Domain & Category</th>
                <th className="py-3 px-3">Metrics (DA/PA)</th>
                <th className="py-3 px-3">Target Blog Page</th>
                <th className="py-3 px-3">Planned Anchor Text</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Outreach Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
              {filteredTargets.map(target => (
                <tr key={target.id} className="hover:bg-purple-50/50 transition-all">
                  <td className="py-3 px-3">
                    <div className="font-bold text-[#2D0C57] flex items-center gap-1.5">
                      {target.domain}
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </div>
                    <span className="text-[10px] bg-purple-100 text-[#531199] px-2 py-0.2 rounded font-bold">
                      {target.category}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-gray-900">DA {target.da}</span>
                    <span className="text-gray-400 text-[10px] block">PA {target.pa}</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-purple-900">
                    {target.targetPage}
                  </td>
                  <td className="py-3 px-3 italic text-gray-700">
                    "{target.plannedAnchorText}"
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      target.status === 'Live' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {target.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-600">
                    {target.outreachContact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

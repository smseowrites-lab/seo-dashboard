import React, { useState, useEffect } from 'react';
import { TaskRecommendation } from '../types';
import { TaskCard } from './TaskCard';
import { SyncAndUploadBar } from './SyncAndUploadBar';
import { UploadedFile } from '../data/knowledgeBase';
import { 
  Search, 
  Wrench, 
  FileText, 
  Share2, 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  Tag 
} from 'lucide-react';
import { GoogleApiService, BlogActionRecommendation } from '../services/googleApiService';

interface SeoOptimizationViewProps {
  tasks: TaskRecommendation[];
  onExecuteTask: (task: TaskRecommendation) => void;
  onApproveTask: (taskId: string) => void;
  onSkipTask: (taskId: string) => void;
  onCreateCarousel: (task: TaskRecommendation) => void;
  onFileUpload?: (file: UploadedFile) => void;
  onNavigateToView?: (view: any) => void;
}

export const SeoOptimizationView: React.FC<SeoOptimizationViewProps> = ({
  tasks,
  onExecuteTask,
  onApproveTask,
  onSkipTask,
  onCreateCarousel,
  onFileUpload,
  onNavigateToView
}) => {
  // Exactly 3 Major Sections: On-Page SEO, Off-Page SEO, Technical SEO
  const [activeSection, setActiveSection] = useState<'onpage' | 'offpage' | 'technical'>('onpage');
  const [isSyncingGsc, setIsSyncingGsc] = useState(false);
  const [lastGscSync, setLastGscSync] = useState('Just now (Live)');
  const [seoRecs, setSeoRecs] = useState<BlogActionRecommendation[]>([]);

  useEffect(() => {
    handleGscSync();
  }, []);

  const handleGscSync = async () => {
    setIsSyncingGsc(true);
    try {
      const recs = await GoogleApiService.getBlogRecommendations();
      setSeoRecs(recs.seoOptimization);
      setLastGscSync(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsSyncingGsc(false);
    }
  };

  // Sample On-Page Audit Items
  const onPageItems = [
    {
      id: 'onpage-1',
      title: 'Meta Title & Description Optimization',
      page: '/blog/meta-ads-click-fraud-detection/',
      currentTitle: 'Click Fraud on Meta Ads Guide - mFilterIt',
      recommendedTitle: 'Meta Ads Click Fraud Detection & Advantage+ Optimization (2026)',
      status: 'Optimization Drafted',
      reason: '2026 CTR decay of -28% due to generic title. Updated title targets Advantage+ bot keywords.'
    },
    {
      id: 'onpage-2',
      title: 'Heading Hierarchy & H1-H3 Structure',
      page: '/blog/mobile-app-install-fraud-prevention/',
      currentTitle: 'Missing H2 subheadings for SDK Spoofing vs Device Spoofing',
      recommendedTitle: 'Inject H2: "How SDK Spoofing Fakes App Installs" + FAQ Block',
      status: 'Recommendation Ready',
      reason: 'Improves answer engine snippet extraction for mobile app install queries.'
    },
    {
      id: 'onpage-3',
      title: 'Contextual Internal Link Mapping',
      page: '/ad-traffic-validation/',
      currentTitle: 'Anchor: "click fraud detection"',
      recommendedTitle: 'Bridge 3 orphan articles to /ad-traffic-validation/',
      status: '3 Bridges Ready',
      reason: 'Passes PageRank equity from high-traffic blogs to core commercial conversion hub.'
    }
  ];

  // Sample Off-Page Audit Items
  const offPageItems = [
    {
      id: 'offpage-1',
      title: 'Social Bookmarking Opportunities',
      description: 'Submit refreshed Meta Ads guide to LinkedIn B2B carousel hub and Quora ad fraud threads.',
      actionLabel: 'Open Social Bookmarking',
      viewTarget: 'reports'
    },
    {
      id: 'offpage-2',
      title: 'Blog Promotion Campaign',
      description: 'Distribute Performance Max (PMax) click fraud breakdown across Reddit r/PPC and D2C eCommerce communities.',
      actionLabel: 'Open Blog Promotion',
      viewTarget: 'reports'
    }
  ];

  // Sample Technical Audit Items
  const technicalItems = [
    {
      id: 'tech-1',
      title: 'Core Web Vitals & Page Speed Audit',
      score: '92/100 Mobile Speed',
      lcp: '1.8s (Good)',
      cls: '0.04 (Good)',
      status: 'Passed',
      issue: 'Image compression required on 4 blog hero banners (convert JPG to WebP).'
    },
    {
      id: 'tech-2',
      title: 'Robots.txt & XML Sitemap Health',
      score: 'Valid',
      status: 'Passed',
      issue: '2 orphan URLs found outside sitemap index. Auto-republished.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#531199] uppercase tracking-wider">
              <Search className="w-4 h-4" />
              <span>Search Engine Optimization Operations</span>
            </div>
            <h2 className="text-2xl font-black text-[#2D0C57] tracking-tight mt-1">
              SEO Optimization Control Hub
            </h2>
            <p className="text-xs text-gray-600 mt-1 max-w-3xl">
              Organized into On-Page SEO, Off-Page SEO, and Technical SEO with direct live Search Console synchronization for blog keywords, CTR improvements, and page optimizations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleGscSync}
              disabled={isSyncingGsc}
              className="flex items-center gap-2 px-4 py-2 bg-[#531199] hover:bg-[#2D0C57] text-white text-xs font-bold rounded-xl transition-all shadow-xs disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncingGsc ? 'animate-spin' : ''}`} />
              <span>{isSyncingGsc ? 'Syncing Search Console...' : 'Sync Google Search Console'}</span>
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs (Exactly 3) */}
        <div className="flex items-center gap-2 mt-6 border-b border-gray-200 pb-2 text-xs font-bold">
          <button
            onClick={() => setActiveSection('onpage')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeSection === 'onpage'
                ? 'bg-[#531199] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>A. On-Page SEO</span>
          </button>
          <button
            onClick={() => setActiveSection('offpage')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeSection === 'offpage'
                ? 'bg-[#531199] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>B. Off-Page SEO</span>
          </button>
          <button
            onClick={() => setActiveSection('technical')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeSection === 'technical'
                ? 'bg-[#531199] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>C. Technical SEO</span>
          </button>
        </div>
      </div>

      {/* Sync Status Bar */}
      <SyncAndUploadBar
        mode="seo_optimization"
        syncButtonLabel="Sync Google Search Console"
        onSyncComplete={() => handleGscSync()}
        onFileUpload={onFileUpload}
      />

      {/* Live GSC Blog Target Recommendations */}
      {seoRecs.length > 0 && (
        <div className="bg-white rounded-xl border border-purple-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#531199]" />
              <h3 className="text-base font-black text-[#2D0C57]">
                Live GSC Identified Blogs To Optimize Today
              </h3>
            </div>
            <span className="text-xs font-bold text-[#531199] bg-[#F5F0FA] px-2.5 py-1 rounded-full border border-purple-200">
              Synced: {lastGscSync}
            </span>
          </div>

          <div className="space-y-3">
            {seoRecs.map((rec, idx) => (
              <div key={idx} className="bg-[#F5F0FA] p-4 rounded-xl border border-purple-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#531199] truncate max-w-xl">
                    {rec.blogTitle}
                  </span>
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">
                    {rec.priority} SEO Priority
                  </span>
                </div>
                <p className="text-xs text-gray-700 font-medium">{rec.reason}</p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                  <div className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-[#531199]" />
                    <span className="font-bold text-gray-600">Target Keyword Tags:</span>
                    {rec.recommendedTags.map((tag, tIdx) => (
                      <span key={tIdx} className="bg-white text-[#531199] font-bold px-2 py-0.5 rounded border border-purple-200 text-[10px]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="font-bold text-[#531199]">Suggested Fix: {rec.suggestedAction}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section A: On-Page SEO */}
      {activeSection === 'onpage' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-black text-[#2D0C57]">On-Page Optimization Recommendations</h3>
            <div className="divide-y divide-gray-100">
              {onPageItems.map(item => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2D0C57]">{item.title}</span>
                    <span className="text-[10px] font-bold bg-purple-100 text-[#531199] px-2 py-0.5 rounded">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 font-mono">{item.page}</p>
                  <div className="text-xs text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-200 space-y-1">
                    <div><span className="font-bold text-gray-500">Current:</span> {item.currentTitle}</div>
                    <div className="text-[#531199] font-bold">
                      <span className="text-gray-500 font-normal">Recommended:</span> {item.recommendedTitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section B: Off-Page SEO */}
      {activeSection === 'offpage' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4">
          <h3 className="text-base font-black text-[#2D0C57]">Off-Page SEO & Distribution Channels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offPageItems.map(item => (
              <div key={item.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                <h4 className="text-xs font-bold text-[#2D0C57]">{item.title}</h4>
                <p className="text-xs text-gray-600">{item.description}</p>
                <button
                  onClick={() => onNavigateToView && onNavigateToView('reports')}
                  className="mt-2 text-xs font-bold text-[#531199] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{item.actionLabel}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section C: Technical SEO */}
      {activeSection === 'technical' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4">
          <h3 className="text-base font-black text-[#2D0C57]">Technical Infrastructure Audit</h3>
          <div className="space-y-3">
            {technicalItems.map(item => (
              <div key={item.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#2D0C57]">{item.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{item.issue}</p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                  {item.score}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

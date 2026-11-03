import React, { useState } from 'react';
import { TaskRecommendation } from '../types';
import { SyncAndUploadBar, SyncStatusState } from './SyncAndUploadBar';
import { UploadedFile } from '../data/knowledgeBase';
import { 
  Megaphone, 
  Search, 
  HelpCircle, 
  Sparkles, 
  CheckSquare, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Layers,
  Share2,
  ExternalLink,
  BarChart2,
  TrendingDown,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';

interface CrossIntelligenceViewProps {
  tasks: TaskRecommendation[];
  onExecuteFullOptimization: (task: TaskRecommendation) => void;
  onFileUpload?: (file: UploadedFile) => void;
}

export const CrossIntelligenceView: React.FC<CrossIntelligenceViewProps> = ({
  tasks,
  onExecuteFullOptimization,
  onFileUpload
}) => {
  const primaryTask = tasks[0]; // Meta Ads Fraud Detection
  const [syncStatus, setSyncStatus] = useState<SyncStatusState | null>(null);

  // Blogs identified by GA4/GSC data that require targeted promotion / refresh
  const blogPromotionCandidates = [
    {
      id: 'blog-prom-1',
      title: 'Meta Ads Click Fraud Detection & Advantage+ Optimization',
      url: 'https://www.mfilterit.com/blog/meta-ads-click-fraud-detection/',
      category: 'Media Trust',
      signals: 'GSC Impressions -28% (pos 7.4 → 12.8) | CHEQ published competing Advantage+ article',
      ga4Metrics: '3,840 clicks, 30,450 impressions (CTR: 12.6%)',
      reason: 'Losing organic search position to competitor CHEQ. Requires content refresh, AEO answer injection, and 7-slide LinkedIn Carousel promotion.',
      recommendation: 'Full Content Refresh + 7-Slide LinkedIn Carousel + Quora Answer',
      needsPromotion: true,
      priority: 'High'
    },
    {
      id: 'blog-prom-2',
      title: 'Mobile App Install Fraud Prevention (Fintech & Gaming)',
      url: 'https://www.mfilterit.com/blog/mobile-app-install-fraud-prevention/',
      category: 'App Fraud',
      signals: 'GA4 organic session growth +4.2% | High Quora query volume for "SDK spoofing"',
      ga4Metrics: '2,920 clicks, 42,100 impressions (CTR: 6.9%)',
      reason: 'Strong organic impressions but low CTR. Capturing PAA boxes and pinning an authoritative Quora answer will boost click-through rates by ~35%.',
      recommendation: 'Quora Practitioner Answer + Side-by-Side SDK Comparison Table',
      needsPromotion: true,
      priority: 'Medium'
    },
    {
      id: 'blog-prom-3',
      title: 'Click Fraud in Performance Max (PMax) Campaigns Optimization',
      url: 'https://www.mfilterit.com/blog/google-performance-max-fraud-prevention/',
      category: 'E-Commerce Trust',
      signals: 'GSC impression surge +140% in GCC | High Reddit r/PPC activity on PMax spam lead forms',
      ga4Metrics: '980 clicks, 24,200 impressions (CTR: 4.0%)',
      reason: 'Rapidly rising query volume around Google Performance Max click fraud. Non-promotional Reddit guidance will establish engineering trust.',
      recommendation: 'Reddit Troubleshooting Guide + Internal Link to Hub',
      needsPromotion: true,
      priority: 'High'
    },
    {
      id: 'blog-prom-4',
      title: 'Enterprise Ad Traffic Validation Solution Hub',
      url: 'https://www.mfilterit.com/ad-traffic-validation/',
      category: 'Core Solution',
      signals: 'GA4 Dwell Time 4m 12s | High Conversion Rate (18.2% CTR)',
      ga4Metrics: '5,180 clicks, 28,400 impressions (CTR: 18.2%)',
      reason: 'Page performs exceptionally well organically. No reactive promotion needed—maintain citation table and Schema.org Product markup.',
      recommendation: 'Maintain Current Baseline (No Promotion Required)',
      needsPromotion: false,
      priority: 'Low'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#2D0C57] via-[#531199] to-[#6F1FB3] rounded-2xl p-6 text-white shadow-lg shadow-purple-950/20 space-y-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-purple-100 text-xs font-semibold backdrop-blur-xs mb-2 border border-white/20">
            <Megaphone className="w-3.5 h-3.5 text-[#e28eff]" />
            Data-Driven Organic Content Expansion
          </div>
          <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-white">
            Blog Promotion
          </h2>
          <p className="text-purple-100 text-xs mt-1 max-w-3xl leading-relaxed">
            Uses GA4 and Google Search Console performance data to evaluate published blogs. Identifies which articles require promotion, content refreshes, or multi-channel distribution based on clear organic evidence.
          </p>
        </div>

        {/* Sync GA4 / GSC Button & Upload Bar */}
        <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs border border-white/20">
          <SyncAndUploadBar 
            mode="blog_promotion"
            syncButtonLabel="Sync GA4 / GSC — Last 28 Days"
            onSyncComplete={setSyncStatus}
            onFileUpload={onFileUpload}
          />
        </div>
      </div>

      {/* Blog Promotion Candidates Table / Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-[#2D0C57] text-base flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#971199]" />
            <span>GA4 / GSC Evaluated Blog Promotion Opportunities</span>
          </h3>
          <span className="text-xs font-semibold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
            {blogPromotionCandidates.filter(b => b.needsPromotion).length} Require Promotion
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {blogPromotionCandidates.map(blog => (
            <div 
              key={blog.id} 
              className={`bg-white rounded-2xl border ${
                blog.needsPromotion ? 'border-purple-300 shadow-sm' : 'border-gray-200 opacity-80'
              } p-5 space-y-3 transition-all hover:border-[#531199]`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <span className="text-[#531199] uppercase">{blog.category}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500 font-mono text-[11px]">{blog.ga4Metrics}</span>
                  </div>
                  <h4 className="font-black text-[#17131C] text-sm mt-0.5">
                    {blog.title}
                  </h4>
                  <a 
                    href={blog.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs text-purple-700 hover:underline flex items-center gap-1 font-medium mt-0.5"
                  >
                    <span>{blog.url}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    blog.needsPromotion 
                      ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {blog.needsPromotion ? `● Promotion Needed (${blog.priority})` : '✓ Stable Performance'}
                  </span>
                </div>
              </div>

              {/* Signals & Reason */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100">
                  <div className="font-bold text-[#531199] uppercase text-[10px] mb-1">
                    GA4 / GSC Evidence Signal:
                  </div>
                  <div className="font-medium text-gray-800 leading-relaxed">
                    {blog.signals}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="font-bold text-gray-700 uppercase text-[10px] mb-1">
                    Strategic Diagnosis & Reason:
                  </div>
                  <div className="text-gray-700 leading-relaxed">
                    {blog.reason}
                  </div>
                </div>
              </div>

              {/* Suggested Action */}
              <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="font-semibold text-gray-800">
                  <strong className="text-[#531199]">Suggested Next Action: </strong>
                  <span>{blog.recommendation}</span>
                </div>

                {blog.needsPromotion && (
                  <button
                    onClick={() => onExecuteFullOptimization(primaryTask)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#531199] text-white font-bold hover:bg-[#6F1FB3] transition-all shadow-xs shrink-0 active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                    <span>PROMOTIONAL EXECUTION</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

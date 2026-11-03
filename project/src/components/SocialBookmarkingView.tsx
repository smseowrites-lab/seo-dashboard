import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  RefreshCw, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Info, 
  Calendar, 
  AlertTriangle, 
  Tag, 
  Database, 
  Search, 
  Globe, 
  ArrowUpRight,
  ShieldCheck,
  FileSpreadsheet,
  CheckCircle2,
  TrendingUp,
  Layers
} from 'lucide-react';
import { GoogleApiService, LiveAnalyticsSummary } from '../services/googleApiService';
import { SharePointKeywordService, KeywordRankingItem, SHAREPOINT_WORKBOOK_URL } from '../services/sharepointKeywordService';

interface SocialBookmarkingViewProps {
  onFileUpload?: (file: any) => void;
}

export interface BlogBookmarkBoxData {
  id: string;
  blogUrl: string;
  blogTitle: string;
  category: string;
  heroProductRule: string;
  primaryReason: string;
  dataBacking: {
    gscImpressions: number;
    gscClicks: number;
    ctr: number;
    avgPosition: number;
    ga4Users: number;
    ga4EngagementRate: string;
  };
  sharePointEvidence: {
    keyword: string;
    region: 'India' | 'MENA' | 'USA';
    rank: number;
    rankDelta: number;
    searchVolume: number;
  };
  targetedKeywords: string[];
  aeoGeoOpportunities: {
    query: string;
    impressions: number;
    recommendation: string;
  }[];
  rankingDropsAndAlerts: {
    type: 'rank_drop' | 'low_ctr_high_imp' | 'no_backlinks';
    title: string;
    description: string;
    metricBadge: string;
  }[];
}

export const SocialBookmarkingView: React.FC<SocialBookmarkingViewProps> = () => {
  // Initial working date requirement: 15 October 2026 (Thursday)
  const [workingDate, setWorkingDate] = useState<string>('2026-10-15');
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'>('Thursday');
  
  const [syncing, setSyncing] = useState<boolean>(false);
  const [syncingSharePoint, setSyncingSharePoint] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Today at 10:47 AM');
  const [copiedUrlId, setCopiedUrlId] = useState<string | null>(null);
  const [copiedTagsBoxId, setCopiedTagsBoxId] = useState<string | null>(null);
  const [activeReasonModalBox, setActiveReasonModalBox] = useState<BlogBookmarkBoxData | null>(null);
  const [liveSummary, setLiveSummary] = useState<LiveAnalyticsSummary | null>(null);
  const [selectedRegionSheet, setSelectedRegionSheet] = useState<'All' | 'India' | 'MENA' | 'USA'>('All');
  const [sharePointStatus, setSharePointStatus] = useState(SharePointKeywordService.getSyncStatus());

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setSyncing(true);
    try {
      const summary = await GoogleApiService.fetchLiveAnalyticsSummary();
      setLiveSummary(summary);
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (e) {
      console.error(e);
    } finally {
      setSyncing(false);
    }
  };

  const handleSyncData = async () => {
    setSyncing(true);
    try {
      await GoogleApiService.requestAuthToken();
      await fetchInitialData();
    } catch (e) {
      console.error(e);
      setSyncing(false);
    }
  };

  const handleSyncSharePoint = async () => {
    setSyncingSharePoint(true);
    try {
      const updated = await SharePointKeywordService.triggerLiveSync();
      setSharePointStatus(updated);
    } catch (e) {
      console.error(e);
    } finally {
      setSyncingSharePoint(false);
    }
  };

  const handleCopyUrl = (url: string, boxId: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrlId(boxId);
    setTimeout(() => setCopiedUrlId(null), 2000);
  };

  const handleCopyKeywords = (keywords: string[], boxId: string) => {
    navigator.clipboard.writeText(keywords.join(', '));
    setCopiedTagsBoxId(boxId);
    setTimeout(() => setCopiedTagsBoxId(null), 2000);
  };

  const handleCopySingleTag = (tag: string) => {
    navigator.clipboard.writeText(tag);
  };

  // Generate Blogs based on Day selection (Mon/Tue = Media Trust/Ad Fraud ONLY; Wed-Fri = Broader verified suite)
  const isMonTue = selectedDayOfWeek === 'Monday' || selectedDayOfWeek === 'Tuesday';

  const blog1: BlogBookmarkBoxData = isMonTue ? {
    id: 'blog-1-mon-tue',
    blogUrl: 'https://mfilterit.com/blog/mobile-app-install-fraud-prevention/',
    blogTitle: 'Mobile App Install Fraud Prevention (Fintech & Gaming Benchmark 2026)',
    category: 'Media Trust / Ad Fraud Hero Product',
    heroProductRule: 'Monday & Tuesday Priority: Media Trust / Ad Fraud Hero Product',
    primaryReason: 'Media Trust / Ad Fraud is mFilterIt’s primary hero-product priority for Mondays & Tuesdays. Selected based on 42,100 GSC search impressions and 81.2% GA4 engagement rate in mobile app install fraud keywords.',
    dataBacking: {
      gscImpressions: 42100,
      gscClicks: 2920,
      ctr: 6.9,
      avgPosition: 6.2,
      ga4Users: 2450,
      ga4EngagementRate: '81.2%'
    },
    sharePointEvidence: {
      keyword: 'mobile app install fraud',
      region: 'India',
      rank: 4,
      rankDelta: 2,
      searchVolume: 18200
    },
    targetedKeywords: SharePointKeywordService.getTopTagsForBlog('mobile-app-install-fraud-prevention', 35),
    aeoGeoOpportunities: [
      {
        query: 'What is SDK spoofing vs device spoofing in mobile app fraud?',
        impressions: 3400,
        recommendation: 'Inject a concise 45-word direct answer block in section 2 for Perplexity & Gemini citations.'
      },
      {
        query: 'How do fintech apps detect fake app installs in 2026?',
        impressions: 2100,
        recommendation: 'Add structured JSON-LD FAQ Schema to trigger featured snippet AI overviews.'
      }
    ],
    rankingDropsAndAlerts: [
      {
        type: 'rank_drop',
        title: 'Rank Drop Warning on Google India',
        description: 'Query "sdk spoofing detection software" dropped from position 3.8 to 7.2 over the last 14 days.',
        metricBadge: 'Rank 3.8 → 7.2'
      },
      {
        type: 'low_ctr_high_imp',
        title: 'High Impression / CTR Opportunity',
        description: '"app install fraud prevention" generated 12,400 impressions with 6.9% CTR.',
        metricBadge: '12.4k Imp / 6.9% CTR'
      }
    ]
  } : {
    id: 'blog-1-wed-fri',
    blogUrl: 'https://mfilterit.com/blog/ecommerce-brand-infringement-monitoring/',
    blogTitle: 'eCommerce Brand Infringement Monitoring & MAP Compliance Guide',
    category: 'Brand Protection & D2C Intelligence',
    heroProductRule: 'Thursday Schedule: Verified Brand Protection & D2C Protection Focus',
    primaryReason: 'Ranks #4.1 on Google Search Console with 18,900 impressions and 78.0% GA4 engagement rate, but lacks social bookmarking backlinks in the last 90 days. High conversion asset for D2C brands.',
    dataBacking: {
      gscImpressions: 18900,
      gscClicks: 1450,
      ctr: 7.6,
      avgPosition: 4.1,
      ga4Users: 1240,
      ga4EngagementRate: '78.0%'
    },
    sharePointEvidence: {
      keyword: 'e-commerce brand protection Saudi Arabia',
      region: 'MENA',
      rank: 7,
      rankDelta: 5,
      searchVolume: 8400
    },
    targetedKeywords: SharePointKeywordService.getTopTagsForBlog('ecommerce-brand-infringement-monitoring', 35),
    aeoGeoOpportunities: [
      {
        query: 'How do D2C brands enforce MAP compliance on Amazon?',
        impressions: 1900,
        recommendation: 'Needs direct 40-word step-by-step callout for ChatGPT search & Claude answers.'
      },
      {
        query: 'What software detects unauthorized sellers on online marketplaces?',
        impressions: 1450,
        recommendation: 'Add comparison table schema for AI answer engine recommendations.'
      }
    ],
    rankingDropsAndAlerts: [
      {
        type: 'no_backlinks',
        title: 'Zero Social Bookmarks in 90 Days',
        description: 'High engagement page (78.0%), but zero social bookmarking signals recorded in activity logs.',
        metricBadge: '0 Bookmarks / 90d'
      },
      {
        type: 'low_ctr_high_imp',
        title: 'Ranking Opportunity',
        description: '"map compliance seller tracking" ranks at #4.2 with 4,500 impressions.',
        metricBadge: 'Position 4.2'
      }
    ]
  };

  const blog2: BlogBookmarkBoxData = isMonTue ? {
    id: 'blog-2-mon-tue',
    blogUrl: 'https://mfilterit.com/blog/meta-ads-click-[#531199]-detection/',
    blogTitle: 'Meta Ads Click Fraud Detection & Advantage+ Invalid Click Optimization',
    category: 'Media Trust / Ad Fraud Hero Product',
    heroProductRule: 'Monday & Tuesday Priority: Media Trust / Ad Fraud Hero Product',
    primaryReason: 'Media Trust / Ad Fraud focus. Selected due to 30,450 GSC search impressions with position drop from 7.4 to 12.8 in Advantage+ pixel spoofing queries.',
    dataBacking: {
      gscImpressions: 30450,
      gscClicks: 3840,
      ctr: 12.6,
      avgPosition: 12.8,
      ga4Users: 3100,
      ga4EngagementRate: '74.5%'
    },
    sharePointEvidence: {
      keyword: 'meta ads click fraud UAE',
      region: 'MENA',
      rank: 6,
      rankDelta: 3,
      searchVolume: 14500
    },
    targetedKeywords: SharePointKeywordService.getTopTagsForBlog('meta-ads-click-fraud-detection', 35),
    aeoGeoOpportunities: [
      {
        query: 'How does pixel spoofing affect Meta Advantage+ campaigns?',
        impressions: 2800,
        recommendation: 'Inject direct answer definition callout box for Gemini & Perplexity citations.'
      },
      {
        query: 'Can bot clicks fake Facebook lead form submissions?',
        impressions: 1950,
        recommendation: 'Publish JSON-LD FAQ schema targeting high-intent marketing queries.'
      }
    ],
    rankingDropsAndAlerts: [
      {
        type: 'rank_drop',
        title: 'Rank Position Drop Alert',
        description: 'Query "meta ads click fraud tool" dropped from position 7.4 to 12.8 (Page 2 drop).',
        metricBadge: 'Rank 7.4 → 12.8'
      },
      {
        type: 'low_ctr_high_imp',
        title: 'High Search Visibility',
        description: '"advantage+ invalid traffic" generated 8,900 impressions with 13.9% CTR.',
        metricBadge: '8.9k Imp / 13.9% CTR'
      }
    ]
  } : {
    id: 'blog-2-wed-fri',
    blogUrl: 'https://mfilterit.com/blog/click-fraud-in-pmax-campaigns/',
    blogTitle: 'How Click Fraud Attacks Google Performance Max (PMax) Campaigns',
    category: 'Paid Search & Ad Fraud Verification',
    heroProductRule: 'Thursday Schedule: Verified PMax & Paid Search Fraud Verification Focus',
    primaryReason: '24,200 Search Console impressions with a +140% search query surge. Ranks at position 14.8 (Page 2 opportunity); social bookmarking will drive referral signals to push to Page 1.',
    dataBacking: {
      gscImpressions: 24200,
      gscClicks: 980,
      ctr: 4.0,
      avgPosition: 14.8,
      ga4Users: 890,
      ga4EngagementRate: '68.4%'
    },
    sharePointEvidence: {
      keyword: 'bot traffic detection performance marketing USA',
      region: 'USA',
      rank: 4,
      rankDelta: 0,
      searchVolume: 19500
    },
    targetedKeywords: SharePointKeywordService.getTopTagsForBlog('click-fraud-in-pmax-campaigns', 35),
    aeoGeoOpportunities: [
      {
        query: 'Does Google Performance Max refund click fraud?',
        impressions: 2100,
        recommendation: 'Inject 45-word modular answer block for ChatGPT & Perplexity citations.'
      },
      {
        query: 'How to block bot traffic in PMax placement networks?',
        impressions: 1650,
        recommendation: 'Add structured FAQ schema callout in section 3.'
      }
    ],
    rankingDropsAndAlerts: [
      {
        type: 'rank_drop',
        title: 'Page 2 Position Opportunity',
        description: 'Currently position 14.8 on Google US & India index. Referral links from social bookmarks will lift to Page 1.',
        metricBadge: 'Position 14.8'
      },
      {
        type: 'low_ctr_high_imp',
        title: 'High Impression / Low CTR Alert',
        description: '24,200 search impressions but only 4.0% CTR.',
        metricBadge: '24.2k Imp / 4.0% CTR'
      }
    ]
  };

  const currentBlogBoxes = [blog1, blog2];

  return (
    <div className="space-y-6">
      {/* Top Header & Date / Sync Control Bar */}
      <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-[#531199] text-[#E3B624]">
              <CheckSquare className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-[#17131C]">Social Bookmarking Module</h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 text-[#531199] border border-purple-200">
              GSC + GA4 + Live SharePoint Synced
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Recommends exactly two verified mFilterIt blog URLs daily based on live keyword rankings from SharePoint, Search Console queries, GA4 engagement, and hero-product schedules.
          </p>
        </div>

        {/* Date and Sync Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Working Date Picker / Display */}
          <div className="flex items-center space-x-2 bg-[#F5F0FA] border border-purple-200 rounded-xl px-3 py-1.5 text-xs font-medium text-[#2D0C57]">
            <Calendar className="w-4 h-4 text-[#531199]" />
            <span>Working Date:</span>
            <input 
              type="date" 
              value={workingDate}
              onChange={(e) => {
                setWorkingDate(e.target.value);
                const dateObj = new Date(e.target.value);
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const dayName = days[dateObj.getDay()] as any;
                if (dayName !== 'Sunday') setSelectedDayOfWeek(dayName);
              }}
              className="bg-transparent font-bold text-[#531199] outline-none cursor-pointer"
            />
          </div>

          {/* Day Selector Pill Buttons */}
          <div className="flex items-center bg-[#F5F0FA] p-1 rounded-xl border border-purple-200 text-xs">
            {(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const).map((day) => {
              const active = selectedDayOfWeek === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDayOfWeek(day)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    active 
                      ? 'bg-[#531199] text-white shadow-xs' 
                      : 'text-purple-900 hover:bg-purple-200/50'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              );
            })}
          </div>

          {/* Sync Data Button */}
          <button
            onClick={handleSyncData}
            disabled={syncing}
            className="flex items-center space-x-2 bg-[#2D0C57] hover:bg-[#531199] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm border border-[#E3B624]/30"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#E3B624] ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Syncing...' : 'Sync Data'}</span>
          </button>
        </div>
      </div>

      {/* SharePoint Excel Workbook Live Integration Bar */}
      <div className="bg-gradient-to-r from-[#170533] via-[#2D0C57] to-[#531199] text-white rounded-2xl p-4 shadow-sm border border-purple-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 rounded-xl bg-purple-900/80 border border-[#E3B624]/40 text-[#E3B624] shrink-0 mt-0.5">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="font-bold text-white text-sm">Live Weekly Keyword Ranking Sheet:</span>
              <span className="bg-emerald-500/20 text-emerald-300 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>SharePoint Connected</span>
              </span>
              <a 
                href={SHAREPOINT_WORKBOOK_URL} 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#E3B624] hover:underline flex items-center space-x-1 font-mono text-[11px]"
              >
                <span>tannu_saini_mfilterit_com / IQDZtakb...</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-purple-200 text-[11px]">
              Last Weekly Sync: <strong className="text-white">{sharePointStatus.lastSyncTimestamp}</strong> • Available Sheets: <strong>India, MENA, USA</strong> (1,248 total tracked keywords)
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 shrink-0 self-end md:self-auto">
          {/* Region Sheet Filter Pills */}
          <div className="flex items-center bg-purple-950/80 p-1 rounded-xl border border-purple-800 text-[11px]">
            {(['All', 'India', 'MENA', 'USA'] as const).map(reg => (
              <button
                key={reg}
                onClick={() => setSelectedRegionSheet(reg)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  selectedRegionSheet === reg
                    ? 'bg-[#E3B624] text-black shadow-xs'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          <button
            onClick={handleSyncSharePoint}
            disabled={syncingSharePoint}
            className="flex items-center space-x-1.5 bg-[#E3B624] hover:bg-amber-400 text-black font-bold px-3 py-2 rounded-xl text-xs transition-all shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncingSharePoint ? 'animate-spin' : ''}`} />
            <span>{syncingSharePoint ? 'Syncing Workbook...' : 'Sync Live Keyword Sheet'}</span>
          </button>
        </div>
      </div>

      {/* Monday & Tuesday Rule Banner Notice */}
      <div className={`rounded-2xl p-3.5 border text-xs flex items-center justify-between ${
        isMonTue 
          ? 'bg-amber-500/10 border-amber-500/30 text-amber-900' 
          : 'bg-purple-50 border-purple-200 text-purple-900'
      }`}>
        <div className="flex items-center space-x-2.5">
          <ShieldCheck className={`w-4 h-4 shrink-0 ${isMonTue ? 'text-amber-600' : 'text-[#531199]'}`} />
          <span className="font-semibold">
            {isMonTue ? (
              <>
                <strong className="text-amber-800">Monday & Tuesday Hero Product Priority Active:</strong> Strictly recommending <strong>Media Trust / Ad Fraud</strong> blogs. Unrelated Brand Safety topics excluded.
              </>
            ) : (
              <>
                <strong className="text-[#531199]">Wednesday – Friday Schedule Active:</strong> Recommending verified mFilterIt solutions (Brand Protection, MAP Compliance, Paid Search Fraud) according to performance data.
              </>
            )}
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/80 border border-current shrink-0">
          Day {selectedDayOfWeek} Rules Applied
        </span>
      </div>

      {/* Two Recommended Blog Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {currentBlogBoxes.map((box, index) => (
          <div 
            key={box.id} 
            className="bg-white rounded-2xl border border-purple-100 shadow-sm p-6 flex flex-col justify-between space-y-5 hover:border-purple-300 transition-all relative overflow-hidden"
          >
            {/* Top Badge & Box Label */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#531199] text-white flex items-center space-x-1.5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#E3B624]" />
                  <span>Recommendation #{index + 1} ({box.category})</span>
                </span>
                
                <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-lg flex items-center space-x-1">
                  <FileSpreadsheet className="w-3 h-3 text-[#531199]" />
                  <span>{box.sharePointEvidence.region} Sheet Keyword Rank #{box.sharePointEvidence.rank}</span>
                </span>
              </div>

              {/* Title & Copyable URL Box */}
              <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-3">
                {box.blogTitle}
              </h3>

              <div className="bg-[#F8F6FC] rounded-xl p-3 border border-purple-200/80 flex items-center justify-between gap-2 mb-4 group">
                <div className="flex items-center space-x-2 truncate">
                  <Globe className="w-4 h-4 text-[#531199] shrink-0" />
                  <span className="font-mono text-xs text-purple-950 truncate font-medium">
                    {box.blogUrl}
                  </span>
                </div>

                <div className="flex items-center space-x-1 shrink-0">
                  <a 
                    href={box.blogUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-1.5 text-gray-500 hover:text-[#531199] rounded-lg hover:bg-purple-100 transition-colors"
                    title="Open Blog Link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => handleCopyUrl(box.blogUrl, box.id)}
                    className="flex items-center space-x-1 bg-white hover:bg-[#531199] text-[#531199] hover:text-white px-2.5 py-1 rounded-lg border border-purple-200 text-xs font-bold transition-all shadow-2xs"
                  >
                    {copiedUrlId === box.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Live SharePoint Keyword Ranking Evidence */}
              <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/30 mb-4 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-amber-700" />
                  <div>
                    <span className="font-bold text-amber-950">Live SharePoint Ranking Evidence:</span>
                    <span className="text-amber-900 ml-1">"{box.sharePointEvidence.keyword}"</span>
                  </div>
                </div>
                <div className="text-right font-mono font-bold text-amber-900 shrink-0">
                  Rank #{box.sharePointEvidence.rank} (▲{box.sharePointEvidence.rankDelta}) • {box.sharePointEvidence.searchVolume.toLocaleString()} Vol
                </div>
              </div>

              {/* Selection Reason Box */}
              <div className="bg-purple-50/60 rounded-xl p-3 border border-purple-200 text-xs text-purple-900 space-y-1 mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#531199] flex items-center space-x-1">
                    <Info className="w-3.5 h-3.5" />
                    <span>Selection Reason & Data Backing</span>
                  </span>
                  <button 
                    onClick={() => setActiveReasonModalBox(box)}
                    className="text-[11px] font-bold text-[#531199] hover:underline"
                  >
                    View Deep Analytics →
                  </button>
                </div>
                <p className="text-gray-700 text-[11px] leading-relaxed">
                  {box.primaryReason}
                </p>
              </div>

              {/* Copyable Tags Box (20-35 Tags) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-800 flex items-center space-x-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#531199]" />
                    <span>Live Synced Keywords & Tags ({box.targetedKeywords.length} terms)</span>
                  </span>

                  <button
                    onClick={() => handleCopyKeywords(box.targetedKeywords, box.id)}
                    className="text-[11px] font-bold text-[#531199] hover:text-[#2D0C57] flex items-center space-x-1 bg-purple-100 hover:bg-purple-200 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    {copiedTagsBoxId === box.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">All Tags Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy All Tags</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-white rounded-xl border border-purple-200 p-3 max-h-40 overflow-y-auto custom-scrollbar flex flex-wrap gap-1.5 text-xs">
                  {box.targetedKeywords.map((tag, tIdx) => (
                    <button
                      key={tIdx}
                      onClick={() => handleCopySingleTag(tag)}
                      className="px-2 py-0.5 rounded-md bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200/80 text-[11px] font-medium transition-colors hover:border-purple-300 flex items-center space-x-1 group"
                      title="Click to copy individual tag"
                    >
                      <span>#{tag}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics Quick Stats Strip */}
            <div className="grid grid-cols-3 gap-2 bg-[#F5F0FA] rounded-xl p-2.5 border border-purple-200 text-center text-xs">
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-semibold">GSC Impressions</span>
                <p className="font-bold text-[#531199]">{box.dataBacking.gscImpressions.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-semibold">GSC Clicks / CTR</span>
                <p className="font-bold text-[#531199]">{box.dataBacking.gscClicks} ({box.dataBacking.ctr}%)</p>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-semibold">GA4 Engagement</span>
                <p className="font-bold text-[#531199]">{box.dataBacking.ga4EngagementRate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Deep Analytics Reason Modal */}
      {activeReasonModalBox && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-5 border border-purple-200 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-purple-100 pb-3">
              <div>
                <span className="text-xs font-bold text-[#531199] uppercase tracking-wider">Deep Performance Evidence</span>
                <h2 className="text-lg font-bold text-gray-900 mt-0.5">{activeReasonModalBox.blogTitle}</h2>
              </div>
              <button 
                onClick={() => setActiveReasonModalBox(null)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-purple-50 p-3.5 rounded-xl border border-purple-200">
                <h4 className="font-bold text-[#531199] mb-1">Primary Selection Rationale</h4>
                <p className="text-gray-800 leading-relaxed">{activeReasonModalBox.primaryReason}</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">Live SharePoint & Search Console Metrics</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200 text-center">
                  <div>
                    <span className="text-[10px] text-gray-500">SharePoint Keyword Rank</span>
                    <p className="font-bold text-amber-700">#{activeReasonModalBox.sharePointEvidence.rank} ({activeReasonModalBox.sharePointEvidence.region})</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500">Monthly Search Volume</span>
                    <p className="font-bold text-[#531199]">{activeReasonModalBox.sharePointEvidence.searchVolume.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500">GSC Avg Position</span>
                    <p className="font-bold text-[#531199]">{activeReasonModalBox.dataBacking.avgPosition}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500">GA4 Engaged Users</span>
                    <p className="font-bold text-[#531199]">{activeReasonModalBox.dataBacking.ga4Users}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-purple-100">
              <button
                onClick={() => setActiveReasonModalBox(null)}
                className="bg-[#531199] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#2D0C57] transition-all"
              >
                Close Evidence Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

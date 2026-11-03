import React, { useState } from 'react';
import { 
  Megaphone, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  Download, 
  FileText, 
  Share2, 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  BookOpen, 
  Tag, 
  User, 
  Send, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Info,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  FileSpreadsheet
} from 'lucide-react';
import { SyncAndUploadBar, SyncStatusState } from './SyncAndUploadBar';
import { UploadedFile } from '../data/knowledgeBase';
import { SharePointKeywordService, SHAREPOINT_WORKBOOK_URL } from '../services/sharepointKeywordService';

export interface BlogPromotionViewProps {
  onFileUpload?: (file: UploadedFile) => void;
}

interface BlogCandidate {
  id: string;
  badgeLabel: string;
  title: string;
  url: string;
  targetMarket: string;
  selectionReason: string;
  sharePointEvidence: {
    keyword: string;
    region: 'India' | 'MENA' | 'USA';
    rank: number;
    rankDelta: number;
    searchVolume: number;
  };
  gscMetrics: {
    clicks: number;
    impressions: number;
    ctr: string;
    avgPosition: number;
  };
  ga4Metrics: {
    activeSessions: number;
    engagementRate: string;
    avgEngagementTime: string;
  };
  targetKeywords: string[];
}

interface PlatformConfig {
  id: string;
  name: string;
  savedUrl: string;
  description: string;
  formatBadge: string;
  iconType: 'mideast' | 'medium' | 'substack' | 'blogger' | 'twitter' | 'tumblr' | 'medium_pub';
}

const BLOG_CANDIDATES: BlogCandidate[] = [
  {
    id: 'blog-1',
    badgeLabel: 'Choose Blog 1',
    title: 'Meta Ads Click Fraud Detection & Advantage+ Optimization',
    url: 'https://www.mfilterit.com/blog/meta-ads-click-fraud-detection/',
    targetMarket: 'MENA',
    selectionReason: 'High impression volume (30,450) with organic rank position drop from 7.4 to 12.8 due to competitive activity; requires immediate multi-channel content promotion.',
    sharePointEvidence: {
      keyword: 'meta ads click fraud UAE',
      region: 'MENA',
      rank: 6,
      rankDelta: 3,
      searchVolume: 14500
    },
    gscMetrics: {
      clicks: 3840,
      impressions: 30450,
      ctr: '12.6%',
      avgPosition: 12.8
    },
    ga4Metrics: {
      activeSessions: 4120,
      engagementRate: '68.4%',
      avgEngagementTime: '3m 45s'
    },
    targetKeywords: SharePointKeywordService.getTopTagsForBlog('meta-ads-click-fraud-detection', 20)
  },
  {
    id: 'blog-2',
    badgeLabel: 'Choose Blog 2',
    title: 'Mobile App Install Fraud Prevention for Fintech & Gaming',
    url: 'https://www.mfilterit.com/blog/mobile-app-install-fraud-prevention/',
    targetMarket: 'India & USA',
    selectionReason: 'Striking distance ranking (Avg Position 8.2) for "SDK spoofing prevention" and "app install fraud"; capturing external distribution links will lift CTR by ~35%.',
    sharePointEvidence: {
      keyword: 'mobile app install fraud India',
      region: 'India',
      rank: 4,
      rankDelta: 2,
      searchVolume: 18200
    },
    gscMetrics: {
      clicks: 2920,
      impressions: 42100,
      ctr: '6.9%',
      avgPosition: 8.2
    },
    ga4Metrics: {
      activeSessions: 3450,
      engagementRate: '71.2%',
      avgEngagementTime: '4m 10s'
    },
    targetKeywords: SharePointKeywordService.getTopTagsForBlog('mobile-app-install-fraud-prevention', 20)
  }
];

const PLATFORMS: PlatformConfig[] = [
  {
    id: 'mideast_info',
    name: 'Mid East Info',
    savedUrl: 'https://mid-east.info/author/mfilterit/',
    description: 'Regional Business & Tech Press Authority',
    formatBadge: 'Editorial Press Article',
    iconType: 'mideast'
  },
  {
    id: 'medium',
    name: 'Medium',
    savedUrl: 'https://medium.com/@minakshikushwahakjs',
    description: 'Executive Tech & Growth Thought Leadership',
    formatBadge: 'Long-Form Tech Article',
    iconType: 'medium'
  },
  {
    id: 'substack',
    name: 'Substack',
    savedUrl: 'https://mfilteritblogs.substack.com/',
    description: 'Direct Growth & Ad Fraud Dispatch',
    formatBadge: 'Newsletter Article',
    iconType: 'substack'
  },
  {
    id: 'blogger',
    name: 'Blogger',
    savedUrl: 'https://mfilteritmena.blogspot.com/',
    description: 'mFilterIt Regional Content Engine',
    formatBadge: 'Regional Blog Post',
    iconType: 'blogger'
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    savedUrl: 'https://x.com/MinakshiKush03/',
    description: 'High-Impact Social Thread',
    formatBadge: '5-7 Post Thread',
    iconType: 'twitter'
  },
  {
    id: 'tumblr',
    name: 'Tumblr',
    savedUrl: 'https://www.tumblr.com/digitalriskobserver/',
    description: 'Digital Risk Observer Visual Post',
    formatBadge: 'Quote & Micro-Post',
    iconType: 'tumblr'
  },
  {
    id: 'medium_pub',
    name: 'Medium Community / Publications',
    savedUrl: 'https://medium.com/@minakshikushwahakjs',
    description: 'Editor Submission & Pitch Draft',
    formatBadge: 'Publication Pitch + Article',
    iconType: 'medium_pub'
  }
];

export const BlogPromotionView: React.FC<BlogPromotionViewProps> = ({ onFileUpload }) => {
  const [selectedBlogId, setSelectedBlogId] = useState<string>('blog-1');
  const [selectedPlatformId, setSelectedPlatformId] = useState<string>('substack');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatusState | null>(null);
  const [syncingSharePoint, setSyncingSharePoint] = useState<boolean>(false);
  const [sharePointStatus, setSharePointStatus] = useState(SharePointKeywordService.getSyncStatus());

  const activeBlog = BLOG_CANDIDATES.find(b => b.id === selectedBlogId) || BLOG_CANDIDATES[0];
  const activePlatform = PLATFORMS.find(p => p.id === selectedPlatformId) || PLATFORMS[0];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 2000);
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

  const handleDownload = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderPlatformLogo = (iconType: PlatformConfig['iconType']) => {
    switch (iconType) {
      case 'mideast':
        return (
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
            MEI
          </div>
        );
      case 'medium':
        return (
          <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shrink-0 shadow-xs">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
            </svg>
          </div>
        );
      case 'substack':
        return (
          <div className="w-9 h-9 rounded-xl bg-[#FF6719] text-white flex items-center justify-center shrink-0 shadow-xs">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
            </svg>
          </div>
        );
      case 'blogger':
        return (
          <div className="w-9 h-9 rounded-xl bg-[#FF5722] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M20.803 10.158c-.524-.766-1.226-1.341-2.062-1.688.375-.512.581-1.134.581-1.801 0-1.928-1.569-3.497-3.498-3.497H7.175C5.247 3.172 3.678 4.741 3.678 6.669v10.662c0 1.928 1.569 3.497 3.497 3.497h9.649c1.928 0 3.497-1.569 3.497-3.497 0-1.423-.854-2.65-2.073-3.199.988-.517 1.637-1.554 1.555-2.974zM8.502 6.5h7.323c.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5H8.502V6.5zm7.323 11H8.502v-3h7.323c.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5z"/>
            </svg>
          </div>
        );
      case 'twitter':
        return (
          <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shrink-0 shadow-xs">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </div>
        );
      case 'tumblr':
        return (
          <div className="w-9 h-9 rounded-xl bg-[#36465D] text-white flex items-center justify-center font-black text-base shrink-0 shadow-xs">
            t
          </div>
        );
      case 'medium_pub':
        return (
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-800 to-indigo-900 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Layers className="w-5 h-5 text-[#E3B624]" />
          </div>
        );
    }
  };

  const generatePlatformContent = () => {
    const isMetaBlog = activeBlog.id === 'blog-1';

    if (activePlatform.id === 'twitter') {
      const headline = isMetaBlog
        ? "🚨 Meta Ads Advantage+ Click Fraud: How SIVT is Draining Performance Budgets"
        : "📲 Mobile App Install Fraud in 2026: SDK Spoofing & Attribution Hijacking Exposed";

      const thread = [
        `1/7 🚨 ${isMetaBlog ? 'Meta Ads Advantage+ campaign budgets are being drained by Sophisticated Invalid Traffic (SIVT).' : 'Fintech and Gaming mobile apps are losing 22%+ of user acquisition budgets to SDK spoofing and attribution hijacking.'}\n\nHere is what VPs of Growth and CMOs need to know about protecting performance marketing in 2026. 🧵👇`,
        
        `2/7 🔍 THE PROBLEM:\n${isMetaBlog ? 'Advantage+ automated bidding prioritizes rapid clicks. Sophisticated bot networks simulate user engagement (scrolling, clicking, add-to-cart), tricking Meta AI into spending more budget on fake traffic channels.' : 'Attribution fraud does not just waste budget—it skews LTV metrics. Bot farms spoof SDK device tokens, making fake installs appear as organic high-value installs.'}`,

        `3/7 💡 TECHNICAL MECHANICS:\n- GIVT (General Invalid Traffic) is easy to catch with standard filters.\n- SIVT (Sophisticated Invalid Traffic) bypasses IP blocks using residential proxies, automated headless browsers, and human emulation vectors.`,

        `4/7 🛡️ HOW mFilterIt MEDIA TRUST SOLVES THIS:\nOur full-funnel validation platform integrates directly with Meta API & App SDKs to analyze over 120+ telemetry signals in real time (<15ms latency):\n\n✅ Device Fingerprinting\n✅ Behavioral Heuristics\n✅ Bot & Proxy Cluster Recognition`,

        `5/7 📈 REAL IMPACT & ROI:\nBy validating traffic pre-bid and post-click, enterprise growth teams reduce invalid ad spend by up to 32% and improve clean conversion rates by 4.2x.`,

        `6/7 🎯 AEO & DIRECT ANSWER BLOCK:\nQ: How do you prevent ${isMetaBlog ? 'Meta Ads click fraud' : 'mobile app install fraud'}?\nA: Integrate mFilterIt real-time validation SDK to intercept SIVT before attribution triggers, ensuring ad spend goes exclusively to verified, real human users.`,

        `7/7 🔗 Read our complete, verified mFilterIt engineering report here:\n👉 ${activeBlog.url}\n\n#AdFraud #GrowthMarketing #DigitalMarketing #mFilterIt #PerformanceMarketing #BrandSafety`
      ];

      return {
        type: 'twitter',
        headline,
        metaData: {
          hashtags: '#AdFraud #GrowthMarketing #mFilterIt #BrandSafety #PerformanceMarketing',
          targetMarket: activeBlog.targetMarket,
          postCount: '7 Tweets'
        },
        fullText: thread.join('\n\n---\n\n')
      };
    }

    if (activePlatform.id === 'tumblr') {
      const headline = isMetaBlog
        ? "Digital Risk Observer: Unmasking SIVT in Meta Advantage+ Campaigns"
        : "Digital Risk Observer: Mitigating SDK Spoofing & App Install Fraud";

      const quote = isMetaBlog
        ? "“Standard IP blocking is dead. In 2026, over 74% of Meta ad fraud comes from SIVT running over legitimate residential proxy networks.”"
        : "“Attribution fraud is not a minor leak—it silently corrupts CAC, LTV, and retention models across Fintech and Mobile Gaming.”";

      const bodyText = isMetaBlog
        ? `As automated ad platforms like Meta Advantage+ scale, invalid traffic has evolved from crude server bots into Sophisticated Invalid Traffic (SIVT). SIVT mimics real human micro-behaviors, causing bidding algorithms to waste campaign funds on non-converting bot traffic.\n\nmFilterIt Media Trust protects performance campaigns by validating traffic across 120+ telemetry parameters in real-time.`
        : `Fintech and Mobile Gaming apps face growing threats from SDK spoofing, device farms, and click injection. Fraudulent networks simulate installs to steal attribution payouts from legitimate growth partners.\n\nmFilterIt App Trust offers full-stack telemetry analysis, validating device IDs, SDK handshakes, and post-install behavior.`;

      const tags = isMetaBlog
        ? ['#ad fraud', '#meta ads', '#advantage plus', '#sivt', '#digital marketing', '#mfilterit', '#brand safety', '#click fraud']
        : ['#mobile marketing', '#app fraud', '#sdk spoofing', '#fintech security', '#gaming apps', '#mfilterit', '#attribution fraud'];

      return {
        type: 'tumblr',
        headline,
        quote,
        bodyText,
        tags,
        fullText: `${headline}\n\n${quote}\n\n${bodyText}\n\nSource: ${activeBlog.url}\n\nTags: ${tags.join(' ')}`
      };
    }

    if (activePlatform.id === 'medium_pub') {
      const headline = isMetaBlog
        ? "The Silent ROAS Killer: How SIVT Corrupts Automated Meta Advantage+ Bidding"
        : "Inside App Attribution Fraud: How SDK Spoofing Manipulates UA Budgets";

      const subtitle = isMetaBlog
        ? "A deep dive into how modern bot networks bypass standard filters and how enterprise growth leads maintain ad integrity."
        : "Technical mechanics of mobile attribution hijacking in Fintech and how real-time device telemetry stops fake install payouts.";

      const pitchNote = `Hi Editor,\n\nI would like to submit our latest practitioner guide to your publication. As VPs of Growth and CMOs scale AI-automated ad budgets in 2026, SIVT and attribution fraud have become critical topics. This article provides empirical data, technical telemetry breakdowns, and actionable solutions grounded in mFilterIt's enterprise validation benchmarks.\n\nAuthor: Minakshi Kushwaha (SEO & Growth Lead at mFilterIt)\nVerified Reference URL: ${activeBlog.url}\n\nThank you for considering this piece!`;

      const authorBio = "Minakshi Kushwaha is the SEO & Growth Lead at mFilterIt, specializing in full-funnel ad traffic validation, brand safety, and generative engine optimization (GEO) for enterprise digital ecosystems.";

      const articleBody = `### Executive Summary\n${isMetaBlog ? 'Automated ad platforms rely on conversion signals to optimize bidding. When invalid traffic triggers fake add-to-cart or lead form submissions, ad network algorithms double down on non-converting traffic pools.' : 'Mobile app growth depends on precise attribution data. However, sophisticated SDK spoofing tactics generate thousands of phantom install events that claim unearned CPI and CPA payouts.'}\n\n### 1. Understanding the SIVT Threat Landscape\nGeneral Invalid Traffic (GIVT) such as basic web crawlers can easily be caught. SIVT, however, operates via residential proxies, automated headless browsers, and delayed mouse/touch telemetry.\n\n### 2. The mFilterIt Validation Architecture\nmFilterIt analyzes 120+ device signals in real-time (<15ms latency):\n- Browser Fingerprinting & Canvas Inspection\n- Proxy & Residential IP Reputation Scoring\n- Biometric & Behavioral Micro-Movements\n- Post-Click Engagement Velocity\n\n### 3. Key Takeaways for Growth Leaders\n1. Do not rely on ad platform self-reporting.\n2. Implement independent third-party ad traffic validation.\n3. Validate pre-bid and post-click telemetry to safeguard media budgets.`;

      return {
        type: 'medium_pub',
        headline,
        subtitle,
        pitchNote,
        articleBody,
        authorBio,
        fullText: `${headline}\n${subtitle}\n\n${pitchNote}\n\n---\n\n${articleBody}\n\nAbout Author:\n${authorBio}`
      };
    }

    // Default Longform (Substack, Medium, Mid East Info, Blogger)
    const headline = isMetaBlog
      ? `Meta Ads Click Fraud & Advantage+ Invalid Click Optimization: Enterprise Protection Guide`
      : `Mobile App Install Fraud Prevention for Fintech & Gaming: The 2026 Telemetry Benchmark`;

    const executiveSummary = isMetaBlog
      ? `Performance marketing teams scaling Meta Advantage+ campaigns face unprecedented exposure to Sophisticated Invalid Traffic (SIVT). Automated bidding platforms optimize toward conversion signals—when bot networks emulate pixel events (add-to-cart, lead forms), campaign budgets are diverted into low-quality, non-human channels.`
      : `User acquisition budgets in Fintech and Gaming are under continuous attack from mobile app install fraud, SDK spoofing, and click injection. Fraudulent networks simulate post-install events to steal attribution payouts from legitimate growth partners.`;

    const keyStats = [
      { label: 'GSC Impressions (28d)', value: activeBlog.gscMetrics.impressions.toLocaleString() },
      { label: 'SharePoint Keyword Rank', value: `#${activeBlog.sharePointEvidence.rank} (${activeBlog.sharePointEvidence.region})` },
      { label: 'GA4 Engagement Rate', value: activeBlog.ga4Metrics.engagementRate },
      { label: 'Target Regional Volume', value: `${activeBlog.sharePointEvidence.searchVolume.toLocaleString()} /mo` }
    ];

    const bodySections = [
      {
        sectionTitle: `1. The Technical Reality of ${isMetaBlog ? 'Advantage+ Pixel Spoofing' : 'SDK Spoofing & Attribution Hijacking'}`,
        content: isMetaBlog
          ? `Unlike General Invalid Traffic (GIVT), Sophisticated Invalid Traffic (SIVT) leverages residential proxies and cloud-managed headless browser instances. These networks execute human-like mouse trajectories and delayed form fills, causing Meta AI pixel algorithms to falsely categorize bot sessions as high-value audience segments.`
          : `Attribution hijacking occurs when malicious ad networks observe click telemetry and execute fake click injection milliseconds before an app install completes. This steals organic or partner-driven attribution, forcing mobile growth teams to pay unearned CPI payouts.`
      },
      {
        sectionTitle: `2. Full-Funnel Protection via mFilterIt Telemetry`,
        content: `mFilterIt delivers full-funnel ad traffic validation analyzing over 120+ micro-telemetry signals in real time:\n• Pre-Bid & Pre-Click Proxy Cluster Identification\n• Device Fingerprinting & Canvas Inspection\n• Behavioral Heuristic & Touch Dynamics Analysis\n• Real-Time Conversion API Interception`
      },
      {
        sectionTitle: `3. Strategic ROI & Implementation Plan`,
        content: `Growth leaders implementing independent ad traffic validation consistently experience:\n- Up to 32% reduction in wasted ad spend\n- 4.2x higher clean conversion rate\n- Completely clean attribution models for BI & analytics dashboards`
      }
    ];

    return {
      type: 'article',
      headline,
      executiveSummary,
      keyStats,
      bodySections,
      ctaBlock: `Validate your ad traffic and secure your performance budgets with mFilterIt enterprise solutions. Visit the verified report: ${activeBlog.url}`
    };
  };

  const generatedContent = generatePlatformContent();

  return (
    <div className="space-y-6">
      {/* Universal Sync Bar */}
      <SyncAndUploadBar 
        mode="blog_promotion"
        syncButtonLabel="Sync Data"
        onFileUpload={onFileUpload}
        onSyncComplete={(status) => setSyncStatus(status)}
      />

      {/* SharePoint Excel Workbook Live Integration Bar */}
      <div className="bg-gradient-to-r from-[#170533] via-[#2D0C57] to-[#531199] text-white rounded-2xl p-4 shadow-sm border border-purple-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 rounded-xl bg-purple-900/80 border border-[#E3B624]/40 text-[#E3B624] shrink-0 mt-0.5">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="font-bold text-white text-sm">Live Weekly Keyword Ranking Sheet Integration:</span>
              <span className="bg-emerald-500/20 text-emerald-300 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>SharePoint Live Sync Active</span>
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
              Last Workbook Sync: <strong className="text-white">{sharePointStatus.lastSyncTimestamp}</strong> • Driving Candidate Blog Selection & Regional Target Keywords
            </p>
          </div>
        </div>

        <button
          onClick={handleSyncSharePoint}
          disabled={syncingSharePoint}
          className="flex items-center space-x-1.5 bg-[#E3B624] hover:bg-amber-400 text-black font-bold px-3 py-2 rounded-xl text-xs transition-all shadow-sm shrink-0 self-end md:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${syncingSharePoint ? 'animate-spin' : ''}`} />
          <span>{syncingSharePoint ? 'Syncing Workbook...' : 'Sync Live Keyword Sheet'}</span>
        </button>
      </div>

      {/* Module Title */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-5 border border-purple-100 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#531199] text-[#E3B624]">
            <Megaphone className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#17131C]">Blog Promotion Module</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Generate optimized press releases, newsletters, social threads, and micro-posts using live Search Console, GA4, and SharePoint keyword rankings.
            </p>
          </div>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-purple-50 text-[#531199] border border-purple-200 flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4 text-[#E3B624]" />
          <span>7 Verified Platform Destinations</span>
        </span>
      </div>

      {/* Section 1: Blog Candidate Cards */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-gray-800 flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-[#531199]" />
          <span>Step 1: Select High-Opportunity Blog Candidate</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {BLOG_CANDIDATES.map((candidate) => {
            const isSelected = selectedBlogId === candidate.id;
            return (
              <div 
                key={candidate.id}
                className={`bg-white rounded-2xl border p-5 transition-all relative flex flex-col justify-between space-y-4 shadow-sm ${
                  isSelected 
                    ? 'border-[#531199] ring-2 ring-[#531199]/20 shadow-md' 
                    : 'border-purple-100 hover:border-purple-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-purple-100 text-[#531199] border border-purple-200">
                      {candidate.badgeLabel}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      Market: {candidate.targetMarket}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 mb-1.5 line-clamp-2">
                    {candidate.title}
                  </h3>

                  <p className="text-[11px] font-mono text-purple-900 truncate mb-3 bg-purple-50/60 p-1.5 rounded-lg border border-purple-100">
                    {candidate.url}
                  </p>

                  {/* Live SharePoint Keyword Ranking Evidence */}
                  <div className="bg-amber-500/10 rounded-xl p-2.5 border border-amber-500/30 mb-3 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
                      <span className="font-bold text-amber-950 text-[11px]">SharePoint Rank:</span>
                      <span className="text-amber-900 font-medium text-[11px]">"{candidate.sharePointEvidence.keyword}"</span>
                    </div>
                    <span className="font-mono font-bold text-amber-900 text-[11px] shrink-0">
                      #{candidate.sharePointEvidence.rank} ({candidate.sharePointEvidence.region}) • {candidate.sharePointEvidence.searchVolume.toLocaleString()} Vol
                    </span>
                  </div>

                  <div className="bg-purple-50/40 rounded-xl p-2.5 border border-purple-100 text-[11px] text-purple-900 mb-3">
                    <strong className="text-[#531199]">Selection Rationale: </strong>
                    {candidate.selectionReason}
                  </div>

                  {/* Target Keywords from SharePoint */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {candidate.targetKeywords.slice(0, 6).map((kw, idx) => (
                      <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-200">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-purple-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-[11px] text-gray-600">
                    <span>GSC Imp: <strong className="text-gray-900">{candidate.gscMetrics.impressions.toLocaleString()}</strong></span>
                    <span>GA4 Sessions: <strong className="text-gray-900">{candidate.ga4Metrics.activeSessions}</strong></span>
                  </div>

                  <button
                    onClick={() => setSelectedBlogId(candidate.id)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center space-x-1.5 ${
                      isSelected 
                        ? 'bg-[#531199] text-white' 
                        : 'bg-purple-100 text-[#531199] hover:bg-purple-200'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#E3B624]" />
                        <span>Active Blog</span>
                      </>
                    ) : (
                      <>
                        <span>Choose Blog</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Platform Selection UI */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-gray-800 flex items-center space-x-2">
          <Share2 className="w-4 h-4 text-[#531199]" />
          <span>Step 2: Select Promotion Platform & Destination</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {PLATFORMS.map((platform) => {
            const isSelected = selectedPlatformId === platform.id;
            return (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatformId(platform.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 bg-white shadow-2xs ${
                  isSelected 
                    ? 'border-[#531199] ring-2 ring-[#531199]/20 shadow-sm' 
                    : 'border-purple-100 hover:border-purple-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  {renderPlatformLogo(platform.iconType)}
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-[#531199] border border-purple-200">
                    {platform.formatBadge}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-900">{platform.name}</h4>
                  <p className="text-[10px] text-gray-500 line-clamp-1">{platform.description}</p>
                </div>

                <div className="pt-1.5 border-t border-purple-50 flex items-center justify-between text-[10px] font-mono text-purple-900 truncate">
                  <span className="truncate">{platform.savedUrl}</span>
                  <ExternalLink className="w-3 h-3 text-purple-400 shrink-0 ml-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 3: Content Workspace */}
      <div className="bg-white rounded-2xl border border-purple-200 shadow-sm p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-100 pb-4">
          <div className="flex items-center space-x-3">
            {renderPlatformLogo(activePlatform.iconType)}
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-gray-900">{activePlatform.name} Workspace</h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 text-[#531199]">
                  {activePlatform.formatBadge}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Targeting: <strong className="text-gray-800">{activeBlog.title}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleCopy(generatedContent.fullText || '', 'full_content')}
              className="flex items-center space-x-1.5 bg-[#531199] hover:bg-[#2D0C57] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs"
            >
              {copiedSection === 'full_content' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Content Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#E3B624]" />
                  <span>Copy Content</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleDownload(generatedContent.fullText || '', `${activePlatform.id}_${activeBlog.id}_content.txt`, 'text/plain')}
              className="p-2 text-purple-900 bg-purple-50 hover:bg-purple-100 rounded-xl border border-purple-200 transition-colors"
              title="Download Content File"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Render Box */}
        <div className="bg-[#FAF8FC] rounded-xl p-5 border border-purple-200/80 space-y-4 font-sans text-xs text-gray-800 leading-relaxed max-h-[500px] overflow-y-auto custom-scrollbar">
          {'headline' in generatedContent && (
            <div className="border-b border-purple-200/80 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#531199]">Article Headline</span>
              <h2 className="text-base font-extrabold text-gray-900 mt-0.5">{generatedContent.headline}</h2>
            </div>
          )}

          {'executiveSummary' in generatedContent && (
            <div className="bg-white p-3.5 rounded-xl border border-purple-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#531199]">Executive Summary</span>
              <p className="mt-1 text-gray-700">{generatedContent.executiveSummary}</p>
            </div>
          )}

          {'fullText' in generatedContent && (
            <pre className="whitespace-pre-wrap font-sans text-xs text-gray-800 leading-relaxed bg-white p-4 rounded-xl border border-purple-200">
              {generatedContent.fullText}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

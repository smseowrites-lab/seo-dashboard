import { CreativeProject, ApprovedCreativeStyle, ReferenceItem } from '../types/creative';

export const INITIAL_CREATIVE_PROJECTS: CreativeProject[] = [
  {
    id: 'proj-1',
    name: 'Meta Ads Fraud — LinkedIn Carousel',
    aiTitle: 'Meta Ads Advantage+ Bot Vectors: 7-Slide Executive Teardown',
    originalPrompt: 'Create a high-impact LinkedIn carousel from our Meta Ads Click Fraud blog. Focus on how Advantage+ algorithmic bidding gets poisoned by bots.',
    platform: 'LinkedIn Carousel',
    dimensions: '1080 × 1080',
    category: 'carousel',
    targetAudience: 'VPs of Growth, Performance Marketing Directors, CMOs',
    sourceBlogUrl: 'https://www.mfilterit.com/blog/meta-ads-click-fraud-detection/',
    createdAt: 'Sep 29, 2026, 03:45 PM',
    updatedAt: 'Today, 08:30 AM',
    status: 'approved',
    canvaStatus: 'Layout Packaged',
    selectedTemplate: 'Split-Screen Dark B2B Authority',
    stylePreset: 'Deep Purple & Violet Minimalist',
    usedReferences: ['ref-1', 'ref-4'],
    currentVersionId: 'v3',
    versions: [
      {
        id: 'v1',
        versionNumber: 1,
        label: 'Initial AI Generation',
        createdAt: 'Sep 29, 03:45 PM',
        dimensions: '1080 × 1080',
        colorPalette: 'Deep Purple (#2D0C57) + White',
        designNotes: 'Baseline 7-slide structure with general click fraud pointers.',
        isApproved: false,
        slides: [
          {
            slideNumber: 1,
            type: 'Hook',
            headline: 'Is Your Meta Ads Budget Being Wasted by Bots?',
            body: 'Many advertisers are losing money to invalid traffic on Meta Ads in 2026.',
            visualPrompt: 'Generic split screen with bot icon.',
            status: 'approved'
          },
          {
            slideNumber: 2,
            type: 'Problem',
            headline: 'The Problem with Automated Bidding',
            body: 'Automated algorithms find the cheapest conversions which are often bots.',
            visualPrompt: 'Flow chart of ad clicks.',
            status: 'approved'
          },
          {
            slideNumber: 3,
            type: 'Why it happens',
            headline: 'Why Standard Filters Fail',
            body: 'IP blacklists no longer stop modern mobile residential proxies.',
            visualPrompt: 'Proxy server diagram.',
            status: 'pending'
          },
          {
            slideNumber: 4,
            type: 'Key signals',
            headline: '4 Red Flags in Ads Manager',
            body: 'High bounce rate and 3 AM conversion clusters.',
            visualPrompt: 'Dashboard warning gauges.',
            status: 'pending'
          },
          {
            slideNumber: 5,
            type: 'Impact',
            headline: 'The Real Financial Cost',
            body: 'Distorted CAC and wasted retargeting spend.',
            visualPrompt: 'Financial chart showing budget drain.',
            status: 'pending'
          },
          {
            slideNumber: 6,
            type: 'What marketers should do',
            headline: 'How to Protect Your Ad Spend',
            body: 'Cleanse offline conversion APIs and run independent audits.',
            visualPrompt: 'Step-by-step checklist.',
            status: 'pending'
          },
          {
            slideNumber: 7,
            type: 'CTA',
            headline: 'Audit Your Meta Ads Free',
            body: 'Visit mfilterit.com/ad-traffic-validation to stop bot clicks.',
            visualPrompt: 'mFilterIt brand logo with CTA link.',
            status: 'pending'
          }
        ]
      },
      {
        id: 'v2',
        versionNumber: 2,
        label: 'More Premium B2B Contrast & Sharper Hook',
        createdAt: 'Sep 29, 04:10 PM',
        dimensions: '1080 × 1080',
        colorPalette: 'Deep Purple (#2D0C57) + Magenta Purple (#971199) + White',
        designNotes: 'Sharpened slide 1 hook to "Your Meta Ads ROAS Is Lying To You" and added 3 concrete bullet points per slide.',
        isApproved: false,
        slides: [
          {
            slideNumber: 1,
            type: 'Hook',
            headline: 'Your Meta Ads ROAS Is Lying To You (Here Is Why)',
            body: 'In 2026, over 22% of clicks from automated Advantage+ campaigns originate from sophisticated bot networks mimicking real buyer intent.',
            bulletPoints: [
              'High CTR in Meta Manager but near-zero checkout rate',
              'Machine learning models doubling down on bot clusters',
              'Audience Network placements draining 30%+ of ad spend'
            ],
            visualPrompt: 'Split-screen bold contrast: Deep Purple (#2D0C57) background, bright white typography, magenta accent badge.',
            status: 'approved'
          },
          {
            slideNumber: 2,
            type: 'Problem',
            headline: 'The Problem: The Advantage+ Black Box',
            body: 'Meta algorithms are engineered to find the fastest conversions. When bots trigger synthetic micro-conversions, the algorithm assumes it found genuine buyers.',
            bulletPoints: [
              'Synthetic Add-to-Cart and Lead events deceive pixel trackers',
              'Budget automatically redirected toward bot-infested placements',
              'Retargeting pools contaminated with non-human visitors'
            ],
            visualPrompt: 'Iceberg infographic: Media spend above water, distorted business CAC below.',
            status: 'approved'
          },
          {
            slideNumber: 3,
            type: 'Why it happens',
            headline: 'Why Standard Filters Fail in 2026',
            body: 'Legacy verification looks for simplistic repeated IPs. Modern fraud rings deploy 5G residential mobile proxies and behavioral biometric emulation.',
            bulletPoints: [
              'Rotating residential mobile IP pools',
              'Synthetic cookies mimicking aged human browsing histories',
              'Headless browser automation with realistic touch velocity'
            ],
            visualPrompt: 'Comparison matrix: Traditional Rules-Based vs AI Behavioral Biometrics.',
            status: 'approved'
          },
          {
            slideNumber: 4,
            type: 'Key signals',
            headline: '4 Red Flags in Your Meta Ads Manager',
            body: 'Inspect these immediate anomalies inside your reporting:',
            bulletPoints: [
              'Sudden spikes in CTR with 90%+ bounce rate in GA4',
              'Lead timestamps tightly clustered at off-peak midnight intervals',
              'Repeated burner domains or invalid phone prefixes in form submits'
            ],
            visualPrompt: 'Dashboard mock card highlighting 4 warning gauges with amber/red metrics.',
            status: 'approved'
          },
          {
            slideNumber: 5,
            type: 'Impact',
            headline: 'The Financial Cost: Far Beyond Wasted Media',
            body: 'The real damage corrupts your entire go-to-market data pipeline:',
            bulletPoints: [
              'Distorted CAC & LTV calculations presented to the board',
              'Sales teams wasting 40% of their day calling fake phone numbers',
              'Lookalike seed audiences built on bot behavior profiles'
            ],
            visualPrompt: 'Budget leakage funnel diagram with mFilterIt violet and white.',
            status: 'approved'
          },
          {
            slideNumber: 6,
            type: 'What marketers should do',
            headline: 'What Modern Growth Leaders Do Differently',
            body: 'Regain control of your paid media investment with 3 immediate execution protocols:',
            bulletPoints: [
              'Implement real-time invalid traffic (IVT) pre-bid and post-bid filtering',
              'Cleanse offline conversion APIs before feeding back into Meta',
              'Enforce independent, cross-channel fraud audit verification'
            ],
            visualPrompt: 'Step-by-step 3-pillar roadmap in mFilterIt violet and white.',
            status: 'approved'
          },
          {
            slideNumber: 7,
            type: 'CTA',
            headline: 'Stop Paying For Bot Clicks. Audit Your Meta Ads Free.',
            body: 'Run an independent invalid traffic audit on your Meta and Google ad spend. Discover how much budget is bleeding to bot networks.',
            bulletPoints: [
              'Zero SDK or code injection required',
              'Full campaign breakdown in 48 hours',
              'Visit mfilterit.com/ad-traffic-validation'
            ],
            visualPrompt: 'Strong mFilterIt branding with Deep Purple background, QR code, and CTA button.',
            status: 'approved'
          }
        ]
      },
      {
        id: 'v3',
        versionNumber: 3,
        label: 'Approved Final Version (Canva Packaged)',
        createdAt: 'Today, 08:30 AM',
        dimensions: '1080 × 1080',
        colorPalette: 'Deep Purple (#2D0C57) + Magenta Purple (#971199) + White',
        designNotes: 'All 7 slides approved by Minakshi Kushwaha. Export package bundled with Canva visual tokens.',
        isApproved: true,
        slides: [
          {
            slideNumber: 1,
            type: 'Hook',
            headline: 'Your Meta Ads ROAS Is Lying To You (Here Is Why)',
            body: 'In 2026, over 22% of clicks from automated Advantage+ campaigns originate from sophisticated bot networks mimicking real buyer intent.',
            bulletPoints: [
              'High CTR in Meta Manager but near-zero checkout rate',
              'Machine learning models doubling down on bot clusters',
              'Audience Network placements draining 30%+ of ad spend'
            ],
            visualPrompt: 'Split-screen bold contrast: Deep Purple (#2D0C57) background, bright white typography, magenta accent badge.',
            status: 'approved'
          },
          {
            slideNumber: 2,
            type: 'Problem',
            headline: 'The Problem: The Advantage+ Black Box',
            body: 'Meta algorithms are engineered to find the fastest conversions. When bots trigger synthetic micro-conversions, the algorithm assumes it found genuine buyers.',
            bulletPoints: [
              'Synthetic Add-to-Cart and Lead events deceive pixel trackers',
              'Budget automatically redirected toward bot-infested placements',
              'Retargeting pools contaminated with non-human visitors'
            ],
            visualPrompt: 'Iceberg infographic: Media spend above water, distorted business CAC below.',
            status: 'approved'
          },
          {
            slideNumber: 3,
            type: 'Why it happens',
            headline: 'Why Standard Filters Fail in 2026',
            body: 'Legacy verification looks for simplistic repeated IPs. Modern fraud rings deploy 5G residential mobile proxies and behavioral biometric emulation.',
            bulletPoints: [
              'Rotating residential mobile IP pools',
              'Synthetic cookies mimicking aged human browsing histories',
              'Headless browser automation with realistic touch velocity'
            ],
            visualPrompt: 'Comparison matrix: Traditional Rules-Based vs AI Behavioral Biometrics.',
            status: 'approved'
          },
          {
            slideNumber: 4,
            type: 'Key signals',
            headline: '4 Red Flags in Your Meta Ads Manager',
            body: 'Inspect these immediate anomalies inside your reporting:',
            bulletPoints: [
              'Sudden spikes in CTR with 90%+ bounce rate in GA4',
              'Lead timestamps tightly clustered at off-peak midnight intervals',
              'Repeated burner domains or invalid phone prefixes in form submits'
            ],
            visualPrompt: 'Dashboard mock card highlighting 4 warning gauges with amber/red metrics.',
            status: 'approved'
          },
          {
            slideNumber: 5,
            type: 'Impact',
            headline: 'The Financial Cost: Far Beyond Wasted Media',
            body: 'The real damage corrupts your entire go-to-market data pipeline:',
            bulletPoints: [
              'Distorted CAC & LTV calculations presented to the board',
              'Sales teams wasting 40% of their day calling fake phone numbers',
              'Lookalike seed audiences built on bot behavior profiles'
            ],
            visualPrompt: 'Budget leakage funnel diagram with mFilterIt violet and white.',
            status: 'approved'
          },
          {
            slideNumber: 6,
            type: 'What marketers should do',
            headline: 'What Modern Growth Leaders Do Differently',
            body: 'Regain control of your paid media investment with 3 immediate execution protocols:',
            bulletPoints: [
              'Implement real-time invalid traffic (IVT) pre-bid and post-bid filtering',
              'Cleanse offline conversion APIs before feeding back into Meta',
              'Enforce independent, cross-channel fraud audit verification'
            ],
            visualPrompt: 'Step-by-step 3-pillar roadmap in mFilterIt violet and white.',
            status: 'approved'
          },
          {
            slideNumber: 7,
            type: 'CTA',
            headline: 'Stop Paying For Bot Clicks. Audit Your Meta Ads Free.',
            body: 'Run an independent invalid traffic audit on your Meta and Google ad spend. Discover how much budget is bleeding to bot networks.',
            bulletPoints: [
              'Zero SDK or code injection required',
              'Full campaign breakdown in 48 hours',
              'Visit mfilterit.com/ad-traffic-validation'
            ],
            visualPrompt: 'Strong mFilterIt branding with Deep Purple background, QR code, and CTA button.',
            status: 'approved'
          }
        ]
      }
    ],
    conversation: [
      {
        id: 'cmsg-1',
        sender: 'user',
        text: 'Create a high-impact LinkedIn carousel from our Meta Ads Click Fraud blog. Focus on how Advantage+ algorithmic bidding gets poisoned by bots.',
        timestamp: 'Sep 29, 03:45 PM'
      },
      {
        id: 'cmsg-2',
        sender: 'assistant',
        text: 'Generated Version 1 with a 7-slide narrative structure (Hook, Problem, Why, Red Flags, Financial Cost, Marketer Action, CTA). Formatted in 1080x1080 with mFilterIt Deep Purple and White typography.',
        timestamp: 'Sep 29, 03:46 PM',
        versionGeneratedId: 'v1'
      },
      {
        id: 'cmsg-3',
        sender: 'user',
        text: 'Make slide 1 hook more provocative and add 3 punchy bullet points to each slide so it is easy to skim on mobile.',
        timestamp: 'Sep 29, 04:09 PM'
      },
      {
        id: 'cmsg-4',
        sender: 'assistant',
        text: 'Updated to Version 2! Changed Slide 1 hook to "Your Meta Ads ROAS Is Lying To You (Here Is Why)" and structured 3 bullet points per slide.',
        timestamp: 'Sep 29, 04:10 PM',
        versionGeneratedId: 'v2'
      },
      {
        id: 'cmsg-5',
        sender: 'user',
        text: 'This is great. Approve all slides and package for Canva design.',
        timestamp: 'Today, 08:30 AM'
      },
      {
        id: 'cmsg-6',
        sender: 'assistant',
        text: 'Version 3 approved! Saved design characteristics into Approved Creative Memory (mFilterIt B2B Executive Carousel Style). Ready for Canva sync or export.',
        timestamp: 'Today, 08:30 AM',
        versionGeneratedId: 'v3',
        actionTriggered: 'APPROVE_VERSION'
      }
    ]
  },
  {
    id: 'proj-2',
    name: 'Mobile App Install Fraud — Blog Image',
    aiTitle: 'Device Spoofing vs SDK Spoofing: Blog Featured Hero (800 × 500)',
    originalPrompt: 'Generate a clean 800x500 blog featured image for the Mobile App Install Fraud guide.',
    platform: 'Website Blog Image',
    dimensions: '800 × 500',
    category: 'blog_image',
    targetAudience: 'Heads of Mobile Growth, UA Managers',
    sourceBlogUrl: 'https://www.mfilterit.com/blog/mobile-app-install-fraud-prevention/',
    createdAt: 'Sep 28, 2026, 11:15 AM',
    updatedAt: 'Sep 28, 2026, 11:45 AM',
    status: 'approved',
    canvaStatus: 'Exported',
    selectedTemplate: 'mFilterIt Standard Editorial Hero',
    stylePreset: 'Primary Purple & Yellow Accent',
    usedReferences: ['ref-2', 'ref-5'],
    currentVersionId: 'v2',
    versions: [
      {
        id: 'v1',
        versionNumber: 1,
        label: 'Initial Draft',
        createdAt: 'Sep 28, 11:15 AM',
        dimensions: '800 × 500',
        colorPalette: 'Primary Purple (#531199) + Violet (#6F1FB3)',
        designNotes: 'Initial draft with centered text.',
        isApproved: false,
        slides: [
          {
            slideNumber: 1,
            type: 'Hero',
            headline: 'Mobile App Install Fraud Prevention Guide (2026)',
            body: 'Understanding Device Spoofing, SDK Spoofing & Click Flooding.',
            visualPrompt: 'Centered mobile device icon with shield.',
            status: 'approved'
          }
        ]
      },
      {
        id: 'v2',
        versionNumber: 2,
        label: 'Approved Editorial Standard (Left Headline + Right 3D Illustration)',
        createdAt: 'Sep 28, 11:45 AM',
        dimensions: '800 × 500',
        colorPalette: 'Primary Purple (#531199) + Violet (#6F1FB3) + Yellow Accent',
        designNotes: 'Follows Section 23 standard: 800x500px, headline on left, soft 3D sticker-style illustration on right, subtle low-opacity geometric pattern, no watermarks.',
        isApproved: true,
        slides: [
          {
            slideNumber: 1,
            type: 'Hero',
            headline: 'Mobile App Install Fraud: Device Spoofing vs SDK Spoofing',
            body: 'How fraud rings simulate fake in-app events and how modern mobile attribution integrity tools stop UA budget drain.',
            bulletPoints: [
              '800 × 500 px standard blog aspect ratio',
              'Strong left-aligned typography hierarchy',
              'Right-aligned 3D biometric shield illustration'
            ],
            visualPrompt: '800x500px canvas. Strong white/yellow headline on left over #2D0C57 background. Minimalist 3D isometric mobile phone on right emitting a protective violet biometric aura. Clean B2B SaaS finish.',
            status: 'approved'
          }
        ]
      }
    ],
    conversation: [
      {
        id: 'cmsg-21',
        sender: 'user',
        text: 'Generate a clean 800x500 blog featured image for the Mobile App Install Fraud guide.',
        timestamp: 'Sep 28, 11:15 AM'
      },
      {
        id: 'cmsg-22',
        sender: 'assistant',
        text: 'Created Version 1. Note: Section 23 of our brand guidelines specifies strong headline on the left and illustration on the right.',
        timestamp: 'Sep 28, 11:16 AM',
        versionGeneratedId: 'v1'
      },
      {
        id: 'cmsg-23',
        sender: 'user',
        text: 'Adjust to match Section 23 rules: headline on left, soft 3D mobile illustration on right.',
        timestamp: 'Sep 28, 11:44 AM'
      },
      {
        id: 'cmsg-24',
        sender: 'assistant',
        text: 'Updated to Version 2 conforming to the 800x500 mFilterIt blog template standard! Approved and saved to Approved Creative Memory.',
        timestamp: 'Sep 28, 11:45 AM',
        versionGeneratedId: 'v2'
      }
    ]
  },
  {
    id: 'proj-3',
    name: 'Brand Safety — Quora Infographic',
    aiTitle: 'Marketplace Buy-Box Hijacking Breakdown (Quora QA Asset)',
    originalPrompt: 'Create a clean side-by-side diagnostic graphic for Quora showing how counterfeit sellers hijack the Amazon Buy Box.',
    platform: 'Quora Infographic',
    dimensions: '1200 × 800',
    category: 'infographic',
    targetAudience: 'Brand Custodians & eCommerce Heads',
    sourceBlogUrl: 'https://www.mfilterit.com/blog/ecommerce-brand-infringement-monitoring/',
    createdAt: 'Sep 27, 2026, 02:00 PM',
    updatedAt: 'Sep 27, 2026, 02:30 PM',
    status: 'approved',
    canvaStatus: 'Layout Packaged',
    selectedTemplate: 'Side-by-Side Diagnostic Matrix',
    stylePreset: 'Deep Purple & Emerald Trust Badges',
    usedReferences: ['ref-3'],
    currentVersionId: 'v1',
    versions: [
      {
        id: 'v1',
        versionNumber: 1,
        label: 'Approved Quora Diagnostic Card',
        createdAt: 'Sep 27, 02:00 PM',
        dimensions: '1200 × 800',
        colorPalette: 'Deep Purple (#2D0C57) + Light Purple (#F5F0FA) + Emerald Badges',
        designNotes: 'High-contrast comparison showing Authorized Distributor vs Unauthorized Gray-Market Hijacker Buy Box manipulation.',
        isApproved: true,
        slides: [
          {
            slideNumber: 1,
            type: 'Body',
            headline: 'How Counterfeit Sellers Steal Buy-Box Share on Amazon & Noon',
            body: 'Algorithmic comparison showing unauthorized sellers undercutting MAP pricing by 4% to capture 80%+ of customer orders with counterfeit inventory.',
            bulletPoints: [
              'Authorized Brand Seller: Strict MAP price ($49.99), verified batch, legitimate warranty',
              'Unauthorized Hijacker: Fake batch ($47.99), Buy-Box captured, customer receives counterfeit',
              'Impact: 35% margin loss and brand reputation erosion'
            ],
            visualPrompt: '1200x800 high-resolution infographic matrix with split-card layout.',
            status: 'approved'
          }
        ]
      }
    ],
    conversation: [
      {
        id: 'cmsg-31',
        sender: 'user',
        text: 'Create a clean side-by-side diagnostic graphic for Quora showing how counterfeit sellers hijack the Amazon Buy Box.',
        timestamp: 'Sep 27, 02:00 PM'
      },
      {
        id: 'cmsg-32',
        sender: 'assistant',
        text: 'Created Version 1 with authorized vs unauthorized Buy-Box comparison table in mFilterIt Deep Purple and Emerald badges. Approved for Quora publishing.',
        timestamp: 'Sep 27, 02:05 PM',
        versionGeneratedId: 'v1'
      }
    ]
  },
  {
    id: 'proj-4',
    name: 'Ad Fraud — Pinterest Creative',
    aiTitle: 'The Anatomy of a Click Farm: Vertical Infographic (9:16)',
    originalPrompt: 'Create a vertical 9:16 visual flowchart detailing how mobile click farms emulate genuine human shoppers.',
    platform: 'Pinterest Creative',
    dimensions: '1080 × 1920',
    category: 'infographic',
    targetAudience: 'Digital Marketing Executives, AdOps Specialists',
    sourceBlogUrl: 'https://www.mfilterit.com/ad-traffic-validation/',
    createdAt: 'Sep 26, 2026, 04:15 PM',
    updatedAt: 'Sep 26, 2026, 05:00 PM',
    status: 'in_review',
    canvaStatus: 'Ready to Sync',
    selectedTemplate: 'Vertical Diagnostic Journey (9:16)',
    stylePreset: 'Deep Purple & Violet Minimalist',
    usedReferences: ['ref-1'],
    currentVersionId: 'v1',
    versions: [
      {
        id: 'v1',
        versionNumber: 1,
        label: 'Initial 9:16 Draft',
        createdAt: 'Sep 26, 04:15 PM',
        dimensions: '1080 × 1920',
        colorPalette: 'Deep Purple (#2D0C57) + Magenta Purple (#971199)',
        designNotes: '4-stage vertical flow: 1. Proxy rotation, 2. Headless browser, 3. Micro-conversion, 4. Payout.',
        isApproved: false,
        slides: [
          {
            slideNumber: 1,
            type: 'Step',
            headline: 'Anatomy of a 2026 Click Farm Bot Loop',
            body: 'Stage 1: Bot rotates 5G mobile IP pool → Stage 2: Headless browser loads ad unit → Stage 3: Script triggers synthetic add-to-cart → Stage 4: Network claims CPA bounty.',
            bulletPoints: [
              'Stage 1: 5G Residential Proxy Masking',
              'Stage 2: Synthetic Touch & Gyroscope Simulation',
              'Stage 3: Artificial Cart Micro-Event Firing',
              'Stage 4: Ad Network Bidding Optimization Loop'
            ],
            visualPrompt: 'Vertical 9:16 sleek flowchart graphic with glowing purple nodes connecting each stage.',
            status: 'pending'
          }
        ]
      }
    ],
    conversation: [
      {
        id: 'cmsg-41',
        sender: 'user',
        text: 'Create a vertical 9:16 visual flowchart detailing how mobile click farms emulate genuine human shoppers.',
        timestamp: 'Sep 26, 04:15 PM'
      },
      {
        id: 'cmsg-42',
        sender: 'assistant',
        text: 'Created Version 1 formatted for Pinterest & mobile vertical display (1080x1920). 4 sequential stages mapped.',
        timestamp: 'Sep 26, 04:17 PM',
        versionGeneratedId: 'v1'
      }
    ]
  },
  {
    id: 'proj-5',
    name: 'MENA Market Report — LinkedIn Carousel',
    aiTitle: 'Ramadan 2026 Festive Ad Spend: Affiliate Fraud & Coupon Stuffing',
    originalPrompt: 'Create a 6-slide LinkedIn Carousel targeting Middle East eCommerce super-apps ahead of festive shopping seasons.',
    platform: 'LinkedIn Carousel',
    dimensions: '1080 × 1080',
    category: 'carousel',
    targetAudience: 'Chief Commercial Officers, Heads of Digital Marketing in UAE & Saudi Arabia',
    sourceBlogUrl: 'https://www.mfilterit.com/solutions/affiliate-fraud/',
    createdAt: 'Sep 25, 2026, 10:00 AM',
    updatedAt: 'Sep 25, 2026, 11:20 AM',
    status: 'approved',
    canvaStatus: 'Layout Packaged',
    selectedTemplate: 'mFilterIt B2B Executive Carousel Style',
    stylePreset: 'Deep Purple & Violet Minimalist',
    usedReferences: ['ref-1', 'ref-4'],
    currentVersionId: 'v1',
    versions: [
      {
        id: 'v1',
        versionNumber: 1,
        label: 'Approved MENA Festive Version',
        createdAt: 'Sep 25, 10:00 AM',
        dimensions: '1080 × 1080',
        colorPalette: 'Deep Purple (#2D0C57) + Gold/Yellow Festive Accent + White',
        designNotes: 'Tailored for GCC digital marketing heads: highlights affiliate attribution leakage during 40% ad spend festive spikes.',
        isApproved: true,
        slides: [
          {
            slideNumber: 1,
            type: 'Hook',
            headline: 'How Middle East Super-Apps Lose $4M+ to Festive Ad Fraud',
            body: 'During seasonal peaks in the GCC, affiliate attribution theft and coupon scraping spike by up to 34%. Here is how regional leaders protect margins.',
            bulletPoints: [
              '40% ad spend surge ahead of festive shopping',
              'Rogue affiliate extensions stealing last-click credit',
              'Bot rings scraping and abusing localized promo codes'
            ],
            visualPrompt: 'Deep Purple (#2D0C57) background with elegant minimal geometric Middle East lattice and bright white typography.',
            status: 'approved'
          },
          {
            slideNumber: 2,
            type: 'Problem',
            headline: 'The Affiliate Cookie Stuffing Vulnerability',
            body: 'When shoppers search for discount codes, malicious browser extensions silently drop affiliate cookies right before checkout, stealing credit from genuine marketing channels.',
            bulletPoints: [
              'Zero net-new customers brought in by rogue partners',
              'Internal performance channels miscredited',
              'Millions in unearned affiliate commission payouts'
            ],
            visualPrompt: 'Checkout basket diagram showing silent cookie injection.',
            status: 'approved'
          },
          {
            slideNumber: 3,
            type: 'CTA',
            headline: 'Protect Your Festive Ad Spend with mFilterIt Media Trust',
            body: 'Independent verification trusted by leading retail, banking, and super-apps across UAE and Saudi Arabia.',
            bulletPoints: [
              'Real-time affiliate clawback evidence reports',
              'Zero-latency ad fraud suppression',
              'Visit mfilterit.com/ad-traffic-validation'
            ],
            visualPrompt: 'Clean mFilterIt GCC enterprise card with CTA button.',
            status: 'approved'
          }
        ]
      }
    ],
    conversation: [
      {
        id: 'cmsg-51',
        sender: 'user',
        text: 'Create a 6-slide LinkedIn Carousel targeting Middle East eCommerce super-apps ahead of festive shopping seasons.',
        timestamp: 'Sep 25, 10:00 AM'
      },
      {
        id: 'cmsg-52',
        sender: 'assistant',
        text: 'Generated Version 1 using our approved B2B Executive Carousel Style with GCC contextual nuances. Approved by Minakshi Kushwaha.',
        timestamp: 'Sep 25, 10:05 AM',
        versionGeneratedId: 'v1'
      }
    ]
  }
];

export const INITIAL_APPROVED_STYLES: ApprovedCreativeStyle[] = [
  {
    id: 'style-1',
    name: 'mFilterIt B2B Executive Carousel Style',
    platform: 'LinkedIn Carousel',
    dimensions: '1080 × 1080 px',
    colorPalette: 'Deep Purple (#2D0C57) + Magenta Purple (#971199) + White',
    typographyStyle: 'Plus Jakarta Sans Bold, Left-aligned, High Contrast',
    illustrationStyle: 'Minimalist 3D vector diagram with isometric depth and glowing aura',
    textDensity: 'Maximum 35 words per slide + 3 punchy bullet points',
    cardStyle: 'Deep purple canvas with subtle 20% opacity geometric grid and white text',
    approvedDate: 'Today, 08:30 AM',
    sourceProjectName: 'Meta Ads Fraud — LinkedIn Carousel'
  },
  {
    id: 'style-2',
    name: 'mFilterIt Clean Editorial Blog Header Standard (Section 23)',
    platform: 'Website Blog Image',
    dimensions: '800 × 500 px',
    colorPalette: 'Primary Purple (#531199) + Violet (#6F1FB3) + Yellow Accent',
    typographyStyle: 'Bold headline on left, Minimal text, Clear hierarchy',
    illustrationStyle: 'Soft 3D/sticker-style illustration on right with clean drop shadow',
    textDensity: '12–18 words maximum (headline + 1 subtitle sentence)',
    cardStyle: 'Soft container with subtle low-opacity background pattern, zero watermark',
    approvedDate: 'Sep 28, 2026',
    sourceProjectName: 'Mobile App Install Fraud — Blog Image'
  },
  {
    id: 'style-3',
    name: 'mFilterIt Diagnostic Step Infographic Style',
    platform: 'Vertical Infographic & Quora',
    dimensions: '1080 × 1920 / 1200 × 800 px',
    colorPalette: 'Deep Purple (#2D0C57) + Light Purple (#F5F0FA) + Emerald Trust Badges',
    typographyStyle: 'Step-by-step modular cards with numeric indicators',
    illustrationStyle: 'Flowchart node lines connecting diagnostic phases',
    textDensity: 'Concise diagnostic labels with quantified impact metrics',
    cardStyle: 'White cards with purple borders over Light Purple background',
    approvedDate: 'Sep 27, 2026',
    sourceProjectName: 'Brand Safety — Quora Infographic'
  }
];

export const INITIAL_REFERENCE_ITEMS: ReferenceItem[] = [
  {
    id: 'ref-1',
    name: 'Meta Ads Split-Screen B2B Carousel Layout',
    category: 'Approved Designs',
    dimensions: '1080 × 1080',
    tags: ['LinkedIn', 'Carousel', 'Dark Theme', 'Split-Screen'],
    thumbnailDescription: 'Dark purple canvas with bold white headline on left, 3D network flow vector on right, magenta pill accents.',
    colorCodes: ['#2D0C57', '#971199', '#FFFFFF', '#F5F0FA'],
    promptGuide: 'Use split-screen layout with #2D0C57 background, bold headline on left, 3 concise bullet points, and minimalist 3D vector.'
  },
  {
    id: 'ref-2',
    name: 'Standard 800x500 Blog Editorial Template (Section 23)',
    category: 'Blog Image Styles',
    dimensions: '800 × 500',
    tags: ['Blog Hero', '800x500', 'Editorial', '3D Sticker'],
    thumbnailDescription: 'Left-aligned prominent headline with yellow highlight, right-aligned soft 3D mobile illustration, subtle geometric grid.',
    colorCodes: ['#531199', '#6F1FB3', '#FFDD00', '#FFFFFF'],
    promptGuide: 'Headline on left, 3D sticker illustration on right, 800x500 dimensions, no watermarks, subtle low-opacity grid.'
  },
  {
    id: 'ref-3',
    name: 'Marketplace Buy-Box Comparison Matrix',
    category: 'Infographic Styles',
    dimensions: '1200 × 800',
    tags: ['Infographic', 'Quora', 'Comparison', 'Table'],
    thumbnailDescription: 'Two side-by-side diagnostic cards comparing authorized seller vs counterfeiter buy-box dynamics with green/red status badges.',
    colorCodes: ['#2D0C57', '#F5F0FA', '#10B981', '#EF4444'],
    promptGuide: 'Side-by-side comparison matrix with high contrast green/red indicators and bold title banner.'
  },
  {
    id: 'ref-4',
    name: 'mFilterIt Official Brand Guidelines Typography & Logo Lockup',
    category: 'Brand Styles',
    dimensions: 'Vector / Master',
    tags: ['Logo', 'Brand Voice', 'Colors', 'Tokens'],
    thumbnailDescription: 'Official mFilterIt brand identity sheet showing Deep Purple (#2D0C57), Primary Purple (#531199), and logo placement specs.',
    colorCodes: ['#2D0C57', '#531199', '#971199', '#6F1FB3', '#F5F0FA'],
    promptGuide: 'Strictly enforce mFilterIt primary brand colors and Plus Jakarta Sans typography.'
  },
  {
    id: 'ref-5',
    name: 'Isometric Mobile App Fraud Biometric Shield',
    category: 'Reference Images',
    dimensions: '1080 × 1080',
    tags: ['3D Asset', 'Biometrics', 'Mobile', 'Security'],
    thumbnailDescription: 'Isometric 3D smartphone rendering with violet biometric holographic shield rejecting synthetic install bots.',
    colorCodes: ['#6F1FB3', '#971199', '#FFFFFF'],
    promptGuide: 'Render isometric smartphone with holographic biometric shield in violet glow.'
  }
];

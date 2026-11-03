import React, { useState } from 'react';
import { 
  RefreshCw, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Database, 
  FileSpreadsheet, 
  Sparkles,
  BarChart2,
  X,
  Check
} from 'lucide-react';
import { UploadedFile } from '../data/knowledgeBase';

export interface SyncStatusState {
  ga4Connected: boolean;
  gscConnected: boolean;
  lastSyncTime: string;
  dateRange: string;
  isSyncing: boolean;
  uploadedReportAvailable: boolean;
  uploadedFileName?: string;
  analysisStatus: 'Live Sync Active' | 'Completed Using Uploaded Data' | 'Pending Sync' | 'Sync Error';
  syncSummary?: string;
}

interface SyncAndUploadBarProps {
  mode: 'social_bookmarking' | 'blog_promotion' | 'seo_optimization';
  syncButtonLabel: string;
  onSyncComplete?: (status: SyncStatusState) => void;
  onFileUpload?: (file: UploadedFile) => void;
  className?: string;
}

export const SyncAndUploadBar: React.FC<SyncAndUploadBarProps> = ({
  mode,
  syncButtonLabel,
  onSyncComplete,
  onFileUpload,
  className = ''
}) => {
  const [syncState, setSyncState] = useState<SyncStatusState>({
    ga4Connected: true,
    gscConnected: true,
    lastSyncTime: 'Today, 08:30 AM',
    dateRange: 'Sep 02, 2026 - Sep 30, 2026 (Last 28 Days)',
    isSyncing: false,
    uploadedReportAvailable: false,
    analysisStatus: 'Live Sync Active',
    syncSummary: '34.8k GA4 organic sessions & 412.8k GSC impressions reconciled.'
  });

  const [selectedRange, setSelectedRange] = useState<'7d' | '28d' | '90d'>('28d');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [uploadedFilesList, setUploadedFilesList] = useState<string[]>([]);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);

  // Trigger Live Sync
  const handleSync = () => {
    if (syncState.isSyncing) return;

    setSyncState(prev => ({ ...prev, isSyncing: true }));

    setTimeout(() => {
      const now = new Date();
      const formattedTime = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      
      let summary = '';
      if (mode === 'social_bookmarking') {
        summary = 'Retrieved 28-day traffic trends. 4 blogs flagged for social bookmarking on LinkedIn & Quora due to -18% impression decay.';
      } else if (mode === 'blog_promotion') {
        summary = 'GA4/GSC 28-day sync complete. Identified 3 high-intent blogs for promotion & refreshed citation benchmarking.';
      } else {
        summary = 'Search Console 28-day sync reconciled. 14 keyword opportunities & 3 CTR optimizations mapped.';
      }

      const updated: SyncStatusState = {
        ...syncState,
        isSyncing: false,
        lastSyncTime: formattedTime,
        dateRange: selectedRange === '7d' ? 'Last 7 Days (Sep 23 - Sep 30, 2026)' :
                   selectedRange === '90d' ? 'Last 90 Days (Jul 01 - Sep 30, 2026)' :
                   'Last 28 Days (Sep 02 - Sep 30, 2026)',
        analysisStatus: syncState.uploadedReportAvailable ? 'Completed Using Uploaded Data' : 'Live Sync Active',
        syncSummary: summary
      };

      setSyncState(updated);
      if (onSyncComplete) onSyncComplete(updated);
    }, 1200);
  };

  // Handle Mock File Selection & Ingestion
  const handleMockUpload = (fileName: string, size: string, type: string) => {
    const file: UploadedFile = {
      id: `file-${Date.now()}`,
      name: fileName,
      size,
      type,
      category: 'GA4 Analytics',
      uploadDate: 'Just now',
      usageScope: 'Save to mFilterIt Knowledge',
      sourceType: 'Local Upload',
      status: 'Synced to Knowledge Base',
      summary: `Parsed report dataset: ${fileName}. Extracted 85 rows of organic traffic, query clicks & competitor benchmarks for ${mode.replace('_', ' ')}.`,
      recordCount: 85
    };

    if (onFileUpload) onFileUpload(file);

    setUploadedFilesList(prev => [fileName, ...prev]);
    setUploadSuccessMsg(`Successfully uploaded "${fileName}". Analysis updated using report dataset.`);

    setSyncState(prev => ({
      ...prev,
      uploadedReportAvailable: true,
      uploadedFileName: fileName,
      analysisStatus: 'Completed Using Uploaded Data',
      syncSummary: `Data analysis completed using uploaded report: ${fileName} (85 records verified).`
    }));

    setTimeout(() => {
      setUploadSuccessMsg(null);
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <div className={`bg-[#F5F0FA]/80 p-4 rounded-xl border border-purple-200/80 shadow-2xs ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Buttons Area */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Main Sync Button */}
          <button
            onClick={handleSync}
            disabled={syncState.isSyncing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#531199] to-[#6F1FB3] text-white text-xs font-bold hover:opacity-95 transition-all shadow-sm shadow-[#531199]/20 disabled:opacity-50 active:scale-95 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncState.isSyncing ? 'animate-spin text-purple-200' : 'text-purple-200'}`} />
            <span>{syncState.isSyncing ? 'Syncing GA4 / GSC Data...' : syncButtonLabel}</span>
          </button>

          {/* Upload Files Option Beside Sync Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-purple-300 text-[#531199] text-xs font-bold hover:bg-purple-50 transition-all shadow-2xs hover:border-purple-400 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-[#971199]" />
            <span>Upload Files</span>
          </button>

          {/* Range Selector if SEO Optimization mode */}
          {mode === 'seo_optimization' && (
            <div className="flex items-center bg-white border border-purple-200 rounded-lg p-0.5 text-[11px] font-semibold text-gray-700">
              {(['7d', '28d', '90d'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setSelectedRange(range)}
                  className={`px-2 py-1 rounded transition-colors ${
                    selectedRange === range ? 'bg-[#531199] text-white font-bold' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  {range === '7d' ? '7 Days' : range === '28d' ? '28 Days' : '90 Days'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Status Badges */}
        <div className="flex items-center gap-2 flex-wrap text-[11px] font-semibold">
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-purple-200 text-gray-800">
            <span className={`w-2 h-2 rounded-full ${syncState.ga4Connected ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            <span>GA4: {syncState.ga4Connected ? 'Connected' : 'Disconnected'}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-purple-200 text-gray-800">
            <span className={`w-2 h-2 rounded-full ${syncState.gscConnected ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            <span>GSC: {syncState.gscConnected ? 'Connected' : 'Disconnected'}</span>
          </div>

          {syncState.uploadedReportAvailable && (
            <div className="flex items-center gap-1.5 bg-purple-100 text-[#531199] px-2.5 py-1 rounded-lg border border-purple-300 font-bold">
              <FileSpreadsheet className="w-3 h-3 text-[#971199]" />
              <span>Report Available</span>
            </div>
          )}

          <div className="bg-[#531199]/10 text-[#531199] px-2.5 py-1 rounded-lg font-bold border border-[#531199]/20">
            {syncState.analysisStatus}
          </div>
        </div>
      </div>

      {/* Sync / Upload Summary Banner */}
      <div className="mt-3 pt-2.5 border-t border-purple-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-gray-700">
        <div className="flex items-center gap-1.5 font-medium truncate">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="font-bold text-[#2D0C57]">Last Successful Sync:</span>
          <span>{syncState.lastSyncTime}</span>
          <span className="text-gray-300">•</span>
          <span className="text-purple-900 font-semibold">{syncState.dateRange}</span>
        </div>

        {syncState.syncSummary && (
          <div className="text-purple-950 font-semibold truncate bg-white/70 px-2 py-0.5 rounded border border-purple-100">
            💡 {syncState.syncSummary}
          </div>
        )}
      </div>

      {/* Modal Dialog for Uploading Files Fallback */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-purple-200 relative my-6 text-xs">
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-50 text-[#531199]">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#2D0C57] text-sm">
                    Upload Dataset / Report Fallback
                  </h3>
                  <p className="text-gray-500 text-[11px]">
                    Upload custom GSC performance exports, GA4 landing page reports, or SEO audits.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {uploadSuccessMsg ? (
              <div className="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center font-bold flex items-center justify-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>{uploadSuccessMsg}</span>
              </div>
            ) : (
              <div className="py-4 space-y-3">
                <div 
                  onClick={() => handleMockUpload(`GSC_Performance_Export_${mode}_2026.csv`, '280 KB', 'CSV')}
                  className="border-2 border-dashed border-purple-300 hover:border-[#531199] bg-[#F5F0FA]/60 hover:bg-purple-50 rounded-2xl p-6 text-center cursor-pointer transition-all space-y-1.5"
                >
                  <Upload className="w-6 h-6 text-[#531199] mx-auto" />
                  <div className="font-extrabold text-[#2D0C57]">Click to select CSV, XLSX, or PDF report</div>
                  <p className="text-gray-500 text-[10px]">Supports GSC query exports, GA4 landing pages, SEO site audits</p>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-[10px] uppercase font-bold text-gray-500">Or pick pre-loaded sample report:</div>
                  <button
                    onClick={() => handleMockUpload('ALL SEO Tasks(Minakshi).csv', '148 KB', 'CSV')}
                    className="w-full p-2.5 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-left flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div className="font-bold text-gray-900">ALL SEO Tasks(Minakshi).csv</div>
                        <div className="text-[10px] text-gray-500">42 organic performance keywords & decay signals</div>
                      </div>
                    </div>
                    <span className="text-purple-700 font-bold text-[11px]">Upload & Use →</span>
                  </button>

                  <button
                    onClick={() => handleMockUpload('GA4_Landing_Pages_28Days_Report.xlsx', '410 KB', 'XLSX')}
                    className="w-full p-2.5 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-left flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="font-bold text-gray-900">GA4_Landing_Pages_28Days_Report.xlsx</div>
                        <div className="text-[10px] text-gray-500">Organic sessions, bounce rates & conversion events</div>
                      </div>
                    </div>
                    <span className="text-purple-700 font-bold text-[11px]">Upload & Use →</span>
                  </button>
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] text-gray-400">Uploading a report updates analysis status without falsifying live integration connection.</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 font-semibold hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

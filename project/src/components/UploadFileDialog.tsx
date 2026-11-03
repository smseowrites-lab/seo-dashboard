import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  FileSpreadsheet,
  Tag
} from 'lucide-react';
import { UploadedFile } from '../data/knowledgeBase';

interface UploadFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onFileUpload: (file: UploadedFile) => void;
}

export const UploadFileDialog: React.FC<UploadFileDialogProps> = ({
  isOpen,
  onClose,
  onFileUpload
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'select' | 'configure'>('select');
  const [selectedFileName, setSelectedFileName] = useState<string>('Content_Calendar_Q4_2026.csv');
  const [fileSize, setFileSize] = useState<string>('245 KB');
  const [fileType, setFileType] = useState<string>('CSV');
  const [selectedCategory, setSelectedCategory] = useState<UploadedFile['category']>('Content Calendar');
  const [selectedScope, setSelectedScope] = useState<UploadedFile['usageScope']>('Save to mFilterIt Knowledge');

  const handleSelectMockFile = (name: string, size: string, type: string, category: UploadedFile['category']) => {
    setSelectedFileName(name);
    setFileSize(size);
    setFileType(type);
    setSelectedCategory(category);
    setStep('configure');
  };

  const handleRealFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMb = (file.size / 1024).toFixed(1) + ' KB';
      const ext = file.name.split('.').pop()?.toUpperCase() || 'FILE';
      
      let detectedCategory: UploadedFile['category'] = 'Other';
      const lowerName = file.name.toLowerCase();
      if (lowerName.includes('calendar') || lowerName.includes('content')) detectedCategory = 'Content Calendar';
      else if (lowerName.includes('keyword') || lowerName.includes('ranking')) detectedCategory = 'Keyword Ranking';
      else if (lowerName.includes('ga') || lowerName.includes('analytics')) detectedCategory = 'GA4 Analytics';
      else if (lowerName.includes('gsc') || lowerName.includes('search')) detectedCategory = 'GSC Performance';
      else if (lowerName.includes('brand') || lowerName.includes('voice')) detectedCategory = 'Brand Guidelines';
      else if (lowerName.includes('seo') || lowerName.includes('task')) detectedCategory = 'SEO Resources';

      setSelectedFileName(file.name);
      setFileSize(sizeMb);
      setFileType(ext);
      setSelectedCategory(detectedCategory);
      setStep('configure');
    }
  };

  const handleConfirmUpload = () => {
    const newFile: UploadedFile = {
      id: `file-${Date.now()}`,
      name: selectedFileName,
      size: fileSize,
      type: fileType,
      category: selectedCategory,
      uploadDate: 'Just now',
      usageScope: selectedScope,
      sourceType: 'Local Upload',
      status: 'Synced to Knowledge Base',
      summary: `Uploaded and indexed into mFilterIt marketing brain under ${selectedCategory} category with scope [${selectedScope}].`,
      recordCount: 85
    };
    onFileUpload(newFile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-purple-200 relative my-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-50 text-[#531199]">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#2D0C57] tracking-tight">
                Upload Files & Ingest to mFilterIt Knowledge Hub
              </h2>
              <p className="text-xs text-gray-500">
                Supports CSV, XLSX, PDF, DOCX, TXT, Keyword Sheets, GA4 & GSC Performance Files.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'select' ? (
          <div className="py-4 space-y-4 text-xs">
            {/* Drag & Drop Area */}
            <label className="border-2 border-dashed border-purple-300 hover:border-[#531199] bg-[#F5F0FA]/60 hover:bg-purple-50/80 rounded-2xl p-6 text-center cursor-pointer transition-all space-y-2 group block">
              <input type="file" className="hidden" onChange={handleRealFileSelect} accept=".csv,.xlsx,.xls,.pdf,.docx,.txt" />
              <div className="w-12 h-12 rounded-full bg-white text-[#531199] shadow-sm flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <div className="font-extrabold text-[#2D0C57] text-sm">
                Click to browse or drop your file here
              </div>
              <p className="text-gray-500 text-[11px]">
                Content Calendar, Keyword Rankings, GA4, GSC, or SEO Documents (Max 50MB)
              </p>
            </label>

            {/* Quick Select Common Marketing Documents */}
            <div>
              <div className="text-[11px] font-bold text-gray-500 uppercase mb-2">
                Or Select a Common mFilterIt Marketing Document:
              </div>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleSelectMockFile('Content Calendar Q4 2026.csv', '95 KB', 'CSV', 'Content Calendar')}
                  className="w-full p-2.5 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50/40 text-left flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <FileSpreadsheet className="w-4 h-4 text-purple-600" />
                    <div>
                      <div className="font-bold text-gray-900">Content Calendar Q4 2026.csv</div>
                      <div className="text-[10px] text-gray-500">Category: Content Calendar • 24 Planned Blogs & Assets</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#531199]">Select →</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectMockFile('Weekly Keyword Ranking Sheet(India) (1).csv', '184 KB', 'CSV', 'Keyword Ranking')}
                  className="w-full p-2.5 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50/40 text-left flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-bold text-gray-900">Weekly Keyword Ranking Sheet(India) (1).csv</div>
                      <div className="text-[10px] text-gray-500">Category: Keyword Ranking • 142 India Keywords & Ranks</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#531199]">Select →</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectMockFile('mfilterit GA data.csv', '340 KB', 'CSV', 'GA4 Analytics')}
                  className="w-full p-2.5 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50/40 text-left flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-bold text-gray-900">mfilterit GA data.csv</div>
                      <div className="text-[10px] text-gray-500">Category: GA4 Analytics • 310 Landing Pages & Engagement Metrics</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#531199]">Select →</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Step 2: Configure Category & Usage Scope */
          <div className="py-4 space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#531199]" />
                <div>
                  <div className="font-bold text-[#2D0C57]">{selectedFileName}</div>
                  <div className="text-[10px] text-gray-500">{fileType} • {fileSize}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep('select')}
                className="text-[11px] font-bold text-purple-700 hover:underline"
              >
                Change File
              </button>
            </div>

            {/* Select Category */}
            <div>
              <label className="text-xs font-extrabold text-[#2D0C57] block mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#531199]" />
                <span>Document Category</span>
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white font-medium text-gray-800 text-xs focus:ring-2 focus:ring-[#531199] focus:outline-none"
              >
                <option value="Content Calendar">Content Calendar</option>
                <option value="Keyword Ranking">Keyword Ranking (India, MENA, USA)</option>
                <option value="GA4 Analytics">GA4 Analytics</option>
                <option value="GSC Performance">GSC Performance</option>
                <option value="Brand Guidelines">Brand Guidelines</option>
                <option value="SEO Resources">SEO Resources</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Usage Scope */}
            <div>
              <label className="text-xs font-extrabold text-[#2D0C57] block mb-2 uppercase tracking-wide">
                How should I use this file?
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    scope: 'Analyze Only' as const,
                    desc: 'Perform a single analysis for current inquiry. Do not persist into permanent memory.'
                  },
                  {
                    scope: 'Save to mFilterIt Knowledge' as const,
                    desc: 'Index into Knowledge Hub so AI modules (Social Bookmarking, Blog Promotion, SEO/AEO) can cross-reference it.'
                  },
                  {
                    scope: 'Use for This Task' as const,
                    desc: 'Attach strictly to the currently active task in your execution queue.'
                  },
                  {
                    scope: 'Save as Permanent Brand Resource' as const,
                    desc: 'Mark as core foundational knowledge (like brand voice, ICP, or 3 Trust Pillars).'
                  }
                ].map(opt => (
                  <div
                    key={opt.scope}
                    onClick={() => setSelectedScope(opt.scope)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all text-left ${
                      selectedScope === opt.scope
                        ? 'border-[#531199] bg-purple-50/80 shadow-xs ring-1 ring-[#531199]'
                        : 'border-gray-200 hover:border-purple-200 bg-white'
                    }`}
                  >
                    <div className="font-extrabold text-[#17131C] text-xs flex items-center justify-between">
                      <span>[{opt.scope}]</span>
                      {selectedScope === opt.scope && (
                        <CheckCircle2 className="w-4 h-4 text-[#531199]" />
                      )}
                    </div>
                    <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                      {opt.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-100"
          >
            Cancel
          </button>

          {step === 'configure' && (
            <button
              type="button"
              onClick={handleConfirmUpload}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#531199] text-white text-xs font-bold hover:bg-[#6F1FB3] transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Confirm & Ingest to Knowledge Hub</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

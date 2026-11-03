import React, { useState } from 'react';
import { TaskRecommendation, CarouselSlide } from '../types';
import { SAMPLE_CAROUSEL_SLIDES } from '../data/mockData';
import { 
  X, 
  Share2, 
  Sparkles, 
  Check, 
  RotateCcw, 
  Edit3, 
  Palette, 
  ExternalLink, 
  CheckCircle2,
  Copy,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface CanvaModalProps {
  task: TaskRecommendation | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CanvaModal: React.FC<CanvaModalProps> = ({
  task,
  isOpen,
  onClose
}) => {
  if (!isOpen || !task) return null;

  const [slides, setSlides] = useState<CarouselSlide[]>(SAMPLE_CAROUSEL_SLIDES);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedBody, setEditedBody] = useState('');
  const [designCreated, setDesignCreated] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentSlide = slides[activeSlideIndex];

  const handleApproveSlide = (index: number) => {
    setSlides(prev => prev.map((s, idx) => idx === index ? { ...s, status: 'approved' } : s));
  };

  const handleApproveAll = () => {
    setSlides(prev => prev.map(s => ({ ...s, status: 'approved' })));
  };

  const handleStartEdit = (index: number) => {
    setEditingIndex(index);
    setEditedBody(slides[index].body);
  };

  const handleSaveEdit = (index: number) => {
    setSlides(prev => prev.map((s, idx) => idx === index ? { ...s, body: editedBody, status: 'approved' } : s));
    setEditingIndex(null);
  };

  const handleRegenerateSlide = (index: number) => {
    setSlides(prev => prev.map((s, idx) => {
      if (idx !== index) return s;
      return {
        ...s,
        headline: `${s.headline} (AI Refined)`,
        body: `${s.body} [Rephrased for maximum engagement and executive clarity]`,
        status: 'pending'
      };
    }));
  };

  const handleCreateCanvaDesign = () => {
    setDesignCreated(true);
  };

  const copyCarouselText = () => {
    const text = slides.map(s => `--- SLIDE ${s.slideNumber}: ${s.type.toUpperCase()} ---\n${s.headline}\n${s.body}\n${s.bulletPoints ? s.bulletPoints.map(b => `• ${b}`).join('\n') : ''}\nVisual Direction: ${s.visualPrompt}\n`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const allApproved = slides.every(s => s.status === 'approved');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-purple-200 relative my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 pb-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  Canva Creative Integration
                </span>
                <span className="text-xs text-gray-400">7-Slide LinkedIn Carousel</span>
              </div>
              <h2 className="text-lg font-black text-[#2D0C57] tracking-tight mt-0.5">
                {task.taskName}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Numbers Navigation */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100 shrink-0 overflow-x-auto text-xs gap-1.5">
          <div className="flex items-center gap-1.5">
            {slides.map((s, idx) => (
              <button
                key={s.slideNumber}
                onClick={() => setActiveSlideIndex(idx)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all text-xs flex items-center gap-1 ${
                  activeSlideIndex === idx
                    ? 'bg-[#531199] text-white shadow-xs'
                    : s.status === 'approved'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>Slide {s.slideNumber}</span>
                {s.status === 'approved' && <span className="text-[10px]">✓</span>}
              </button>
            ))}
          </div>

          <button
            onClick={handleApproveAll}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all shrink-0 shadow-xs"
          >
            ✓ Approve All Slides
          </button>
        </div>

        {/* Slide Content Preview Card */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Visual Canvas Card */}
            <div className="bg-gradient-to-tr from-[#2D0C57] to-[#531199] rounded-2xl p-6 text-white aspect-square max-h-[380px] flex flex-col justify-between shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between text-[11px] text-purple-200 border-b border-white/20 pb-2">
                <span className="font-extrabold tracking-wide text-white">mFilterIt</span>
                <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-semibold text-white">
                  Slide {currentSlide.slideNumber} / 7 • {currentSlide.type}
                </span>
              </div>

              <div className="my-auto py-2">
                <h3 className="text-xl font-black text-white leading-tight">
                  {currentSlide.headline}
                </h3>
                <p className="text-purple-100 text-xs mt-3 leading-relaxed">
                  {currentSlide.body}
                </p>

                {currentSlide.bulletPoints && (
                  <ul className="mt-3 space-y-1.5 text-xs text-purple-200">
                    {currentSlide.bulletPoints.map((b, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e28eff]" />
                        <span className="text-white font-medium">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="text-[10px] text-purple-300 border-t border-white/20 pt-2 flex items-center justify-between">
                <span>Swipe for next slide →</span>
                <span className="font-bold">mfilterit.com</span>
              </div>
            </div>

            {/* Slide Editor & Visual Prompts */}
            <div className="space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="text-[10px] uppercase font-bold text-gray-500 mb-1">
                    Visual Prompt Directive for Canva:
                  </div>
                  <p className="text-gray-800 text-[11px] italic">
                    "{currentSlide.visualPrompt}"
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F5F0FA] border border-purple-200">
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold text-[#531199] mb-1">
                    <span>Slide Copy Text</span>
                    <span className={`px-2 py-0.2 rounded font-bold ${
                      currentSlide.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {currentSlide.status.toUpperCase()}
                    </span>
                  </div>

                  {editingIndex === activeSlideIndex ? (
                    <div className="space-y-2 mt-2">
                      <textarea
                        rows={4}
                        value={editedBody}
                        onChange={e => setEditedBody(e.target.value)}
                        className="w-full bg-white p-2 rounded border border-purple-300 text-xs focus:outline-none"
                      />
                      <button
                        onClick={() => handleSaveEdit(activeSlideIndex)}
                        className="px-3 py-1 rounded bg-[#531199] text-white text-xs font-bold"
                      >
                        Save Edit
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-800 font-medium text-xs leading-relaxed mt-1">
                      {currentSlide.body}
                    </p>
                  )}
                </div>
              </div>

              {/* Per-Slide Approval Controls */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleRegenerateSlide(activeSlideIndex)}
                  className="px-2.5 py-1.5 rounded-lg border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Regenerate</span>
                </button>

                <button
                  onClick={() => handleStartEdit(activeSlideIndex)}
                  className="px-2.5 py-1.5 rounded-lg border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Slide</span>
                </button>

                <button
                  onClick={() => handleApproveSlide(activeSlideIndex)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve Slide</span>
                </button>
              </div>
            </div>
          </div>

          {/* Canva Design Status notification */}
          {designCreated && (
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 flex items-start justify-between gap-3">
              <div>
                <strong className="text-teal-950 font-bold flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  Canva Design Layout Rendered & Packaged
                </strong>
                <p>
                  The approved 7-slide structure and high-contrast B2B purple/violet style tokens have been bundled. 
                  You can copy the raw slide structure or open the Canva design workspace.
                </p>
              </div>
              <button
                onClick={copyCarouselText}
                className="px-3 py-1.5 rounded-lg bg-teal-700 text-white font-bold shrink-0 hover:bg-teal-800 transition-colors"
              >
                {copied ? 'Copied' : 'Copy All Slides'}
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between shrink-0">
          <button
            onClick={copyCarouselText}
            className="flex items-center gap-1 text-xs font-semibold text-purple-700 hover:text-[#531199]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Carousel Copy'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-100"
            >
              Close
            </button>

            <button
              onClick={handleCreateCanvaDesign}
              disabled={!allApproved && !designCreated}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                allApproved || designCreated
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:opacity-95'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>{allApproved ? 'CREATE CANVA DESIGN' : 'APPROVE ALL SLIDES FIRST'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Download, Upload, Share2, RotateCcw, Cloud, CheckCircle } from 'lucide-react';

export default function Header({
  language,
  setLanguage,
  cloudStatus,
  onExport,
  onImport,
  onShare,
  onReset
}) {
  const ar = language === 'ar';

  return (
    <header className="max-w-6xl mx-auto px-5 pt-8 pb-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: 'var(--green)' }}></span>
            <p className="text-xs md:text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--purple)' }}>
              Sedra Green Action Hub • Vibe Coding
            </p>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mt-2 tracking-tight">
            {ar ? 'لوحة متابعة تقدمي' : 'My Progress Dash Board Project'}
          </h1>

          <p className="mt-2 text-gray-600 text-sm md:text-base">
            {ar ? 'من الفكرة إلى مشروع رقمي حقيقي متكامل.' : 'From idea to a real digital project.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setLanguage('en')}
            className={`px-3.5 py-2 rounded-xl border text-xs md:text-sm font-bold shadow-sm transition ${
              !ar ? 'bg-purple-50 text-purple-800 border-purple-300' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            EN
          </button>

          <button
            onClick={() => setLanguage('ar')}
            className={`px-3.5 py-2 rounded-xl border text-xs md:text-sm font-bold shadow-sm transition ${
              ar ? 'bg-purple-50 text-purple-800 border-purple-300' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            عربي
          </button>

          <button
            onClick={onExport}
            className="px-3.5 py-2 rounded-xl bg-white border text-xs md:text-sm font-semibold shadow-sm hover:bg-gray-50 flex items-center gap-1.5"
            style={{ color: 'var(--purple)', borderColor: 'rgba(111,78,124,0.25)' }}
          >
            <Download className="w-4 h-4" />
            <span>{ar ? 'تصدير نسخة' : 'Export Backup'}</span>
          </button>

          <button
            onClick={onShare}
            className="px-3.5 py-2 rounded-xl bg-purple-50 border text-xs md:text-sm font-semibold shadow-sm hover:bg-purple-100 flex items-center gap-1.5"
            style={{ color: 'var(--purple)', borderColor: 'rgba(111,78,124,0.35)' }}
          >
            <Share2 className="w-4 h-4" />
            <span>{ar ? 'مشاركة إنجازي' : 'Share My Progress'}</span>
          </button>

          <label
            className="px-3.5 py-2 rounded-xl bg-white border text-xs md:text-sm font-semibold shadow-sm hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer"
            style={{ color: 'var(--dark-green)', borderColor: 'rgba(50,70,60,0.2)' }}
          >
            <Upload className="w-4 h-4" />
            <span>{ar ? 'استعادة نسخة' : 'Import Backup'}</span>
            <input type="file" accept=".json" className="hidden" onChange={onImport} />
          </label>

          <button
            onClick={onReset}
            className="px-3.5 py-2 rounded-xl text-white text-xs md:text-sm font-semibold shadow-sm flex items-center gap-1.5"
            style={{ background: 'var(--purple)' }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{ar ? 'إعادة التعيين' : 'Reset'}</span>
          </button>
        </div>
      </div>

      {/* Cloud Sync & Auto-save Banner */}
      <div className="mt-4 px-4 py-2.5 rounded-2xl bg-emerald-50/90 border border-emerald-200/80 text-xs text-emerald-900 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Cloud className="w-4 h-4 text-emerald-700" />
          <span>
            {ar
              ? '✅ مزامنة سحابية نشطة (Supabase) — يتم حفظ وتحديث إنجازك تلقائياً عبر الأجهزة.'
              : '✅ Cloud Database Sync Active (Supabase) — All progress is saved automatically across devices.'}
          </span>
        </div>

        <div className="font-bold text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 flex items-center gap-1.5 shadow-2xs">
          <span
            className={`w-2 h-2 rounded-full ${
              cloudStatus === 'syncing'
                ? 'bg-amber-500 animate-ping'
                : cloudStatus === 'error'
                ? 'bg-gray-400'
                : 'bg-emerald-500 animate-pulse'
            }`}
          ></span>
          <span>
            {cloudStatus === 'syncing'
              ? (ar ? 'جارٍ المزامنة...' : 'Syncing...')
              : cloudStatus === 'error'
              ? (ar ? 'وضع محلي' : 'Local Mode')
              : 'Supabase Connected'}
          </span>
        </div>
      </div>
    </header>
  );
}

import React from 'react';
import { Target } from 'lucide-react';

export default function DailyFocus({ language, dailyFocus, setDailyFocus, onSave }) {
  const ar = language === 'ar';

  return (
    <section className="glass rounded-3xl p-5 md:p-6 shadow-sm border" style={{ borderColor: 'rgba(111,78,124,0.15)' }}>
      <div className="flex flex-col lg:flex-row gap-5 items-start lg:items-center justify-between">
        <div className="space-y-1 flex-1 w-full">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5" style={{ color: 'var(--purple)' }} />
            <h2 className="text-base font-extrabold" style={{ color: 'var(--purple)' }}>
              {ar ? '🎯 مساحة التركيز اليومي والخطوة القادمة' : '🎯 Daily Focus & Immediate Next Step'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                {ar ? 'الهدف الرئيسي لليوم / التركيز الحالي:' : "Today's Main Goal / Current Focus:"}
              </label>
              <input
                type="text"
                value={dailyFocus.dailyFocus || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setDailyFocus(prev => ({ ...prev, dailyFocus: val }));
                  onSave({ ...dailyFocus, dailyFocus: val });
                }}
                placeholder={
                  ar
                    ? 'مثال: إكمال تصميم الصفحة الرئيسية واختبار التفاعل...'
                    : 'e.g. Complete MVP Wireframes and Home page flow...'
                }
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                {ar ? 'الخطوة التالية المباشرة:' : 'Immediate Next Step:'}
              </label>
              <input
                type="text"
                value={dailyFocus.nextStep || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setDailyFocus(prev => ({ ...prev, nextStep: val }));
                  onSave({ ...dailyFocus, nextStep: val });
                }}
                placeholder={
                  ar
                    ? 'مثال: ربط التصفية لقسم المبادرات...'
                    : 'e.g. Implement search filtering on initiatives section...'
                }
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

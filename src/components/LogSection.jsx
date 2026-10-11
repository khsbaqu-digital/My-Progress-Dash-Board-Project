import React, { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';

export default function LogSection({ language, logEntries, onAddEntry, onDeleteEntry }) {
  const ar = language === 'ar';
  const [currentTab, setCurrentTab] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState('question');
  const [content, setContent] = useState('');
  const [solution, setSolution] = useState('');

  const filteredEntries = logEntries.filter(entry => {
    if (currentTab === 'all') return true;
    return entry.type === currentTab;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    onAddEntry({
      id: 'log_' + Date.now(),
      type,
      content: content.trim(),
      solution: solution.trim(),
      date: new Date().toISOString().split('T')[0]
    });

    setContent('');
    setSolution('');
    setIsModalOpen(false);
  };

  return (
    <section className="glass rounded-3xl p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        <div>
          <h3 className="text-xl md:text-2xl font-extrabold" style={{ color: 'var(--dark-green)' }}>
            {ar ? '📝 سجل القرارات والأسئلة والعقبات والخطوات التالية' : '📝 Decisions, Questions & Blockers Log'}
          </h3>
          <p className="text-gray-600 text-xs md:text-sm mt-1">
            {ar
              ? 'توثيق منظم للقرارات المتخذة، الأسئلة التقنية، والعقبات وحلولها لتعزيز ملف إنجازك.'
              : 'Track key decisions, technical questions, obstacles, and immediate action items.'}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl text-white text-xs md:text-sm font-semibold flex items-center gap-1.5 self-start md:self-auto shadow-sm"
          style={{ background: 'var(--purple)' }}
        >
          <Plus className="w-4 h-4" />
          <span>{ar ? 'إضافة إدخال جديد' : 'Add Entry'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4 text-xs font-semibold">
        {[
          { id: 'all', label: ar ? 'الكل' : 'All' },
          { id: 'question', label: ar ? '❓ أسئلة' : '❓ Questions' },
          { id: 'decision', label: ar ? '💡 قرارات' : '💡 Decisions' },
          { id: 'obstacle', label: ar ? '🚧 عقبات' : '🚧 Blockers' },
          { id: 'next_step', label: ar ? '🎯 خطوات تالية' : '🎯 Next Steps' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`px-3 py-1.5 rounded-xl transition ${
              currentTab === tab.id
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Entries List */}
      <div className="space-y-2.5">
        {filteredEntries.length === 0 ? (
          <div className="p-6 text-center text-xs text-gray-400 bg-gray-50/70 rounded-2xl border border-dashed">
            {ar
              ? "لا توجد إدخالات مسجلة في هذا القسم حتى الآن. اضغطي على 'إضافة إدخال جديد' لتوثيق قراراتك وتحدياتك!"
              : "No entries logged yet. Click 'Add Entry' to record your decisions and reflections!"}
          </div>
        ) : (
          filteredEntries.map(entry => {
            const badgeColor = {
              question: 'bg-blue-100 text-blue-900 border-blue-200',
              decision: 'bg-purple-100 text-purple-900 border-purple-200',
              obstacle: 'bg-amber-100 text-amber-900 border-amber-200',
              next_step: 'bg-emerald-100 text-emerald-900 border-emerald-200'
            }[entry.type] || 'bg-gray-100 text-gray-900';

            const typeLabel = {
              question: ar ? '❓ سؤال' : '❓ Question',
              decision: ar ? '💡 قرار' : '💡 Decision',
              obstacle: ar ? '🚧 عقبة' : '🚧 Blocker',
              next_step: ar ? '🎯 خطوة قادمة' : '🎯 Next Step'
            }[entry.type] || entry.type;

            return (
              <div
                key={entry.id}
                className="p-3.5 rounded-2xl bg-white border border-gray-100 shadow-2xs flex items-start justify-between gap-3"
              >
                <div className="space-y-1 text-xs flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] border ${badgeColor}`}>
                      {typeLabel}
                    </span>
                    <span className="text-[10px] text-gray-400">{entry.date}</span>
                  </div>
                  <p className="font-semibold text-gray-800 text-xs md:text-sm mt-1 leading-snug">
                    {entry.content}
                  </p>
                  {entry.solution && (
                    <p className="text-[11px] text-gray-600 bg-gray-50 p-2 rounded-xl mt-1 border border-gray-100">
                      <strong className="text-gray-700">{ar ? 'الحل / القرار:' : 'Action / Decision:'}</strong> {entry.solution}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => onDeleteEntry(entry.id)}
                  title={ar ? 'حذف' : 'Delete'}
                  className="text-gray-300 hover:text-red-500 p-1 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Add Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-start">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-gray-900">
                {ar ? 'إضافة إدخال جديد' : 'Add Log Entry'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-600 mb-1">{ar ? 'النوع:' : 'Type:'}</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white"
                >
                  <option value="question">{ar ? '❓ سؤال يحتاج إجابة' : '❓ Question'}</option>
                  <option value="decision">{ar ? '💡 قرار تم اتخاذه' : '💡 Decision'}</option>
                  <option value="obstacle">{ar ? '🚧 عقبة وتحدٍ' : '🚧 Blocker / Obstacle'}</option>
                  <option value="next_step">{ar ? '🎯 خطوة قادمة' : '🎯 Next Step'}</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-600 mb-1">{ar ? 'الوصف / المحتوى:' : 'Description:'}</label>
                <textarea
                  rows="3"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={ar ? 'اكتبي تفاصيل السؤال أو القرار أو العقبة...' : 'Describe the item...'}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-gray-600 mb-1">{ar ? 'الحل / القرار المتخذ (اختياري):' : 'Action taken / Solution (Optional):'}</label>
                <input
                  type="text"
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder={ar ? 'ما الإجراء المتخذ؟' : 'Action taken or answer...'}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-xs font-semibold text-gray-700"
                >
                  {ar ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white text-xs font-semibold"
                  style={{ background: 'var(--purple)' }}
                >
                  {ar ? 'حفظ' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

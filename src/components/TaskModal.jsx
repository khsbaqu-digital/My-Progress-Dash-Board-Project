import React, { useState, useEffect } from 'react';
import { X, ExternalLink, CheckSquare } from 'lucide-react';

export default function TaskModal({
  language,
  isOpen,
  onClose,
  stage,
  task,
  isDone,
  details,
  onSave
}) {
  if (!isOpen || !task || !stage) return null;

  const ar = language === 'ar';

  const [priority, setPriority] = useState(details.priority || task.priority || 'medium');
  const [dueDate, setDueDate] = useState(details.dueDate || '');
  const [plannedHours, setPlannedHours] = useState(details.plannedHours || task.plannedHours || 1);
  const [actualHours, setActualHours] = useState(details.actualHours || 0);
  const [evidenceUrl, setEvidenceUrl] = useState(details.evidenceUrl || '');
  const [notes, setNotes] = useState(details.notes || '');
  const [completed, setCompleted] = useState(Boolean(isDone));

  useEffect(() => {
    setPriority(details.priority || task.priority || 'medium');
    setDueDate(details.dueDate || '');
    setPlannedHours(details.plannedHours || task.plannedHours || 1);
    setActualHours(details.actualHours || 0);
    setEvidenceUrl(details.evidenceUrl || '');
    setNotes(details.notes || '');
    setCompleted(Boolean(isDone));
  }, [task, details, isDone]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(stage.id, task.id, {
      completed,
      priority,
      dueDate,
      plannedHours: Number(plannedHours),
      actualHours: Number(actualHours),
      evidenceUrl,
      notes
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-7 shadow-2xl overflow-y-auto max-h-[90vh] space-y-4 text-start">
        <div className="flex items-start justify-between gap-3 border-b pb-3">
          <div>
            <span
              className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md text-white"
              style={{ background: 'var(--purple)' }}
            >
              {stage.number} • {stage.title[language]}
            </span>
            <h3 className="text-lg md:text-xl font-extrabold text-gray-900 mt-1">
              {task[language]}
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Definition of Done Criteria */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/70 text-xs">
          <p className="font-bold text-emerald-900 flex items-center gap-1.5">
            <span>✅</span>
            <span>{ar ? 'معايير اكتمال المهمة (Definition of Done):' : 'Completion Criteria (Definition of Done):'}</span>
          </p>
          <p className="text-emerald-800 mt-1.5 leading-relaxed">
            {task.criteria ? task.criteria[language] : (ar ? 'تحقق من تنفيذ المهمة واختبارها وتوثيقها.' : 'Verify implementation and documentation.')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Priority */}
            <div>
              <label className="block font-semibold text-gray-600 mb-1">
                {ar ? 'الأولوية:' : 'Priority:'}
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white"
              >
                <option value="high">{ar ? 'أولوية عالية' : 'High Priority'}</option>
                <option value="medium">{ar ? 'أولوية متوسطة' : 'Medium Priority'}</option>
                <option value="low">{ar ? 'أولوية منخفضة' : 'Low Priority'}</option>
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="block font-semibold text-gray-600 mb-1">
                {ar ? 'تاريخ الاستحقاق:' : 'Due Date:'}
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white"
              />
            </div>

            {/* Planned Hours */}
            <div>
              <label className="block font-semibold text-gray-600 mb-1">
                {ar ? 'الساعات المخططة:' : 'Planned Hours:'}
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={plannedHours}
                onChange={(e) => setPlannedHours(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white"
              />
            </div>

            {/* Actual Hours */}
            <div>
              <label className="block font-semibold text-gray-600 mb-1">
                {ar ? 'الساعات الفعلية المقضية:' : 'Actual Hours Spent:'}
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={actualHours}
                onChange={(e) => setActualHours(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white"
              />
            </div>
          </div>

          {/* Evidence URL */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-gray-600">
                {ar ? 'رابط دليل الإنجاز (GitHub, Figma, الرابط الحي):' : 'Evidence / Output Link (GitHub, Figma, Live Link):'}
              </label>
              {evidenceUrl && evidenceUrl.startsWith('http') && (
                <a
                  href={evidenceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-600 hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  {ar ? 'فتح الرابط' : 'Open Link'}
                </a>
              )}
            </div>
            <input
              type="url"
              value={evidenceUrl}
              onChange={(e) => setEvidenceUrl(e.target.value)}
              placeholder="https://github.com/..."
              className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block font-semibold text-gray-600 mb-1">
              {ar ? 'ملاحظات وتأملات شخصية:' : 'Personal Notes & Reflections:'}
            </label>
            <textarea
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={ar ? 'أضيفي أهم الملاحظات والتحديات التي تم حلها...' : 'Add key insights, questions resolved...'}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white"
            ></textarea>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-3 border-t">
            <label className="flex items-center gap-2 cursor-pointer font-semibold select-none">
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded"
              />
              <span>{ar ? 'تم إنجاز المهمة' : 'Mark as completed'}</span>
            </label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
              >
                {ar ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-white font-semibold shadow-sm"
                style={{ background: 'var(--purple)' }}
              >
                {ar ? 'حفظ التعديلات' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

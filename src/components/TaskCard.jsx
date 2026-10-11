import React from 'react';
import { Settings, Calendar, Clock, AlertTriangle, FileText, Link as LinkIcon } from 'lucide-react';

export default function TaskCard({
  language,
  stageId,
  task,
  isDone,
  details,
  onToggle,
  onOpenModal
}) {
  const ar = language === 'ar';
  const priority = details.priority || task.priority || 'medium';
  const actualHours = Number(details.actualHours || 0);

  // Check if task is overdue
  const today = new Date().toISOString().split('T')[0];
  const isOverdue = !isDone && details.dueDate && details.dueDate < today;

  const hasNotes = Boolean(details.notes && details.notes.trim());
  const hasEvidence = Boolean(details.evidenceUrl && details.evidenceUrl.trim());

  const getPriorityBadge = (p) => {
    if (p === 'high') {
      return <span className="bg-red-100 text-red-800 border border-red-200 text-[10px] font-bold px-2 py-0.5 rounded-md">{ar ? 'أولوية عالية' : 'High'}</span>;
    }
    if (p === 'low') {
      return <span className="bg-sky-100 text-sky-800 border border-sky-200 text-[10px] font-bold px-2 py-0.5 rounded-md">{ar ? 'منخفضة' : 'Low'}</span>;
    }
    return <span className="bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-md">{ar ? 'متوسطة' : 'Medium'}</span>;
  };

  return (
    <div
      className={`border rounded-2xl p-3 flex items-start justify-between gap-2.5 transition hover:border-purple-200 ${
        isDone ? 'border-emerald-200 bg-emerald-50/40' : 'bg-white border-gray-100'
      }`}
    >
      <label className="flex items-start gap-2.5 flex-1 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={Boolean(isDone)}
          onChange={() => onToggle(stageId, task.id)}
          className="mt-1 w-4 h-4 rounded text-purple-600 focus:ring-purple-400 cursor-pointer"
        />

        <div className="space-y-1 flex-1">
          <span
            className={`text-xs md:text-sm font-medium leading-snug block ${
              isDone ? 'line-through opacity-60 text-gray-600' : 'text-gray-900'
            }`}
          >
            {task[language]}
          </span>

          {/* Badges & Meta */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {getPriorityBadge(priority)}

            {isOverdue ? (
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-600" />
                {ar ? 'متأخرة' : 'Overdue'}
              </span>
            ) : details.dueDate ? (
              <span className="text-[10px] text-gray-500 font-medium bg-gray-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                <Calendar className="w-2.5 h-2.5" />
                {details.dueDate}
              </span>
            ) : null}

            {actualHours > 0 && (
              <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                {actualHours}h
              </span>
            )}

            {hasNotes && (
              <span title={ar ? 'توجد ملاحظات' : 'Has notes'} className="text-[11px]">
                <FileText className="w-3 h-3 text-gray-400 inline" />
              </span>
            )}

            {hasEvidence && (
              <span title={ar ? 'يوجد رابط دليل' : 'Has evidence link'} className="text-[11px]">
                <LinkIcon className="w-3 h-3 text-purple-500 inline" />
              </span>
            )}
          </div>
        </div>
      </label>

      {/* Edit Details Trigger Button */}
      <button
        onClick={() => onOpenModal(stageId, task.id)}
        title={ar ? 'معايير وتفاصيل المهمة' : 'Task Details & Criteria'}
        className="p-1.5 rounded-xl text-gray-400 hover:text-purple-700 hover:bg-purple-50 shrink-0 transition"
      >
        <Settings className="w-4 h-4" />
      </button>
    </div>
  );
}

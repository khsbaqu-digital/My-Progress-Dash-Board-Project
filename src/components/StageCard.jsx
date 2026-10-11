import React from 'react';
import TaskCard from './TaskCard';

export default function StageCard({
  language,
  stage,
  tasks,
  progress,
  taskDetails,
  onToggleTask,
  onOpenModal
}) {
  const ar = language === 'ar';

  const completedCount = stage.tasks.filter(t => progress[stage.id]?.[t.id]).length;
  const totalCount = stage.tasks.length;
  const percent = Math.round((completedCount / totalCount) * 100);

  return (
    <div
      className={`stage-card bg-white rounded-3xl border-2 p-5 md:p-7 ${
        percent === 100 ? 'border-emerald-400' : 'border-transparent'
      }`}
    >
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex items-center md:items-start gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-sm"
            style={{ background: 'var(--purple)' }}
          >
            {stage.number}
          </div>
          <div className="text-3xl">{stage.icon}</div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-extrabold text-gray-900">
                {stage.title[language]}
              </h3>
              <p className="text-gray-600 mt-1.5 text-xs md:text-sm leading-6">
                {stage.description[language]}
              </p>
            </div>

            <div className="md:text-right shrink-0">
              <span className="text-2xl font-extrabold" style={{ color: 'var(--purple)' }}>
                {percent}%
              </span>
              <p className="text-xs text-gray-500 font-medium">
                {completedCount} / {totalCount} {ar ? 'مكتمل' : 'completed'}
              </p>
            </div>
          </div>

          {/* Stage Progress Bar */}
          <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${percent}%`,
                background: percent === 100 ? 'var(--green)' : 'var(--purple)',
              }}
            ></div>
          </div>

          {/* Filtered Tasks Grid */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                language={language}
                stageId={stage.id}
                task={task}
                isDone={Boolean(progress[stage.id]?.[task.id])}
                details={taskDetails[stage.id]?.[task.id] || {}}
                onToggle={onToggleTask}
                onOpenModal={onOpenModal}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

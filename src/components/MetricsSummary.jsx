import React from 'react';

export default function MetricsSummary({ language, stats }) {
  const ar = language === 'ar';

  return (
    <section className="glass rounded-3xl p-6 md:p-8 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <p className="text-xs md:text-sm text-gray-500 font-semibold uppercase tracking-wider">
            {ar ? 'نسبة تقدم المشروع الإجمالية' : 'Overall Project Progress'}
          </p>

          <div className="flex items-end gap-3 mt-2">
            <span className="text-5xl md:text-6xl font-extrabold tracking-tight" style={{ color: 'var(--purple)' }}>
              {stats.percent}%
            </span>
            <span className="mb-2 text-sm font-semibold px-3 py-1 rounded-full bg-white border border-gray-200 shadow-2xs">
              {stats.statusText}
            </span>
          </div>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 w-full lg:w-auto">
          <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-2xs text-center">
            <p className="text-xs text-gray-500 font-medium">{ar ? 'المراحل' : 'Stages'}</p>
            <p className="text-xl font-bold mt-1">{stats.stagesCount}</p>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-2xs text-center">
            <p className="text-xs text-gray-500 font-medium">{ar ? 'المهام' : 'Tasks'}</p>
            <p className="text-xl font-bold mt-1">{stats.totalTasks}</p>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-2xs text-center">
            <p className="text-xs text-gray-500 font-medium">{ar ? 'المكتمل' : 'Completed'}</p>
            <p className="text-xl font-bold mt-1" style={{ color: 'var(--green)' }}>{stats.completedTasks}</p>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-2xs text-center">
            <p className="text-xs text-gray-500 font-medium">{ar ? 'المتبقي' : 'Remaining'}</p>
            <p className="text-xl font-bold mt-1 text-gray-700">{stats.remainingTasks}</p>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-2xs text-center">
            <p className="text-xs text-amber-700 font-medium">{ar ? 'المتأخرة' : 'Overdue'}</p>
            <p className="text-xl font-bold mt-1 text-amber-600">{stats.overdueTasks}</p>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-2xs text-center">
            <p className="text-xs text-gray-500 font-medium">{ar ? 'الساعات (فعلية/مخططة)' : 'Hours (Act/Plan)'}</p>
            <p className="text-sm font-bold mt-1 text-gray-700">
              {stats.actualHours} / {stats.plannedHours}h
            </p>
          </div>
        </div>
      </div>

      {/* Main Progress Bar */}
      <div className="mt-6 h-3 bg-gray-200/80 rounded-full overflow-hidden p-0.5">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${stats.percent}%`, background: 'var(--purple)' }}
        ></div>
      </div>
    </section>
  );
}

import React from 'react';
import { Search } from 'lucide-react';

export default function FilterBar({ language, filters, setFilters, onClear }) {
  const ar = language === 'ar';

  return (
    <section className="glass rounded-2xl p-4 shadow-sm border border-gray-200/60">
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 start-3 flex items-center text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            placeholder={ar ? 'بحث في أسماء المهام...' : 'Search tasks...'}
            className="w-full ps-9 pe-3 py-2 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        {/* Filter Selects */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-gray-500 font-medium">{ar ? 'الحالة:' : 'Status:'}</span>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="px-2.5 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-semibold focus:outline-none"
            >
              <option value="all">{ar ? 'الكل' : 'All'}</option>
              <option value="completed">{ar ? 'المكتملة' : 'Completed'}</option>
              <option value="pending">{ar ? 'المتبقية' : 'Remaining'}</option>
              <option value="overdue">{ar ? 'المتأخرة' : 'Overdue'}</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-gray-500 font-medium">{ar ? 'الأولوية:' : 'Priority:'}</span>
            <select
              value={filters.priority}
              onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
              className="px-2.5 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-semibold focus:outline-none"
            >
              <option value="all">{ar ? 'الكل' : 'All'}</option>
              <option value="high">{ar ? 'عالية' : 'High'}</option>
              <option value="medium">{ar ? 'متوسطة' : 'Medium'}</option>
              <option value="low">{ar ? 'منخفضة' : 'Low'}</option>
            </select>
          </div>

          {/* Reset Filters */}
          <button
            onClick={onClear}
            className="px-2.5 py-1.5 rounded-xl text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium transition"
          >
            {ar ? 'إعادة ضبط' : 'Reset'}
          </button>
        </div>
      </div>
    </section>
  );
}

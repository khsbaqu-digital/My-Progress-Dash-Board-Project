import React, { useState, useEffect, useRef } from 'react';
import { stages } from './data/stages';
import { supabase } from './lib/supabase';
import Header from './components/Header';
import DailyFocus from './components/DailyFocus';
import MetricsSummary from './components/MetricsSummary';
import FilterBar from './components/FilterBar';
import StageCard from './components/StageCard';
import TaskModal from './components/TaskModal';
import LogSection from './components/LogSection';

const STORAGE_PROGRESS_KEY = "sedraGreenActionHubProgress_v2";
const STORAGE_DETAILS_KEY  = "sedraGreenActionHubDetails_v3";
const STORAGE_FOCUS_KEY    = "sedraGreenActionHubFocus_v1";
const STORAGE_LOGS_KEY     = "sedraGreenActionHubLogs_v1";

export default function App() {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('sedraLanguage') || 'ar';
  });

  const [progress, setProgress] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_PROGRESS_KEY)) || {};
    const res = {};
    stages.forEach(s => {
      res[s.id] = {};
      s.tasks.forEach(t => {
        const val = saved?.[s.id]?.[t.id];
        res[s.id][t.id] = typeof val === 'boolean' ? val : Boolean(val?.completed);
      });
    });
    return res;
  });

  const [taskDetails, setTaskDetails] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_DETAILS_KEY)) || {};
    const res = {};
    stages.forEach(s => {
      res[s.id] = {};
      s.tasks.forEach(t => {
        const existing = saved?.[s.id]?.[t.id] || {};
        res[s.id][t.id] = {
          priority: existing.priority || t.priority || 'medium',
          dueDate: existing.dueDate || '',
          plannedHours: existing.plannedHours !== undefined ? Number(existing.plannedHours) : (t.plannedHours || 1),
          actualHours: existing.actualHours !== undefined ? Number(existing.actualHours) : 0,
          notes: existing.notes || '',
          evidenceUrl: existing.evidenceUrl || ''
        };
      });
    });
    return res;
  });

  const [dailyFocus, setDailyFocus] = useState(() => {
    return JSON.parse(localStorage.getItem(STORAGE_FOCUS_KEY)) || { dailyFocus: '', nextStep: '' };
  });

  const [logEntries, setLogEntries] = useState(() => {
    return JSON.parse(localStorage.getItem(STORAGE_LOGS_KEY)) || [];
  });

  const [filters, setFilters] = useState({ search: '', status: 'all', priority: 'all' });
  const [cloudStatus, setCloudStatus] = useState('synced');
  const [modalTask, setModalTask] = useState(null); // { stageId, taskId }

  const syncTimeoutRef = useRef(null);

  // Sync Language & RTL/LTR
  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('sedraLanguage', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Check URL share hash on load
  useEffect(() => {
    if (window.location.hash && window.location.hash.startsWith('#share=')) {
      try {
        const raw = window.location.hash.replace('#share=', '');
        const json = decodeURIComponent(escape(atob(decodeURIComponent(raw))));
        const payload = JSON.parse(json);
        if (payload && payload.p) {
          setProgress(payload.p);
          if (payload.f) setDailyFocus(payload.f);
          if (payload.d) setTaskDetails(payload.d);
          if (payload.l) setLogEntries(payload.l);
        }
      } catch (e) {
        console.warn('Could not parse shared link hash', e);
      }
    }
  }, []);

  // Fetch initial data from Supabase
  useEffect(() => {
    async function fetchFromSupabase() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('sedra_progress')
          .select('*')
          .eq('id', 'main_progress')
          .single();

        if (data && !error) {
          if (data.progress && Object.keys(data.progress).length > 0) {
            setProgress(data.progress);
            if (data.task_details) setTaskDetails(data.task_details);
            if (data.daily_focus) setDailyFocus(data.daily_focus);
            if (data.log_entries) setLogEntries(data.log_entries);
          }
          setCloudStatus('synced');
        }
      } catch (err) {
        console.warn('Supabase fetch failed, working locally', err);
        setCloudStatus('error');
      }
    }
    fetchFromSupabase();
  }, []);

  // Debounced cloud sync function
  const triggerCloudSync = (p, d, f, l) => {
    localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(p));
    localStorage.setItem(STORAGE_DETAILS_KEY, JSON.stringify(d));
    localStorage.setItem(STORAGE_FOCUS_KEY, JSON.stringify(f));
    localStorage.setItem(STORAGE_LOGS_KEY, JSON.stringify(l));

    if (!supabase) return;
    setCloudStatus('syncing');
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);

    syncTimeoutRef.current = setTimeout(async () => {
      try {
        const { error } = await supabase
          .from('sedra_progress')
          .upsert({
            id: 'main_progress',
            progress: p,
            task_details: d,
            daily_focus: f,
            log_entries: l,
            updated_at: new Date().toISOString()
          });

        if (!error) {
          setCloudStatus('synced');
        } else {
          setCloudStatus('error');
        }
      } catch (e) {
        setCloudStatus('error');
      }
    }, 1200);
  };

  // Toggle single task
  const handleToggleTask = (stageId, taskId) => {
    const updated = {
      ...progress,
      [stageId]: {
        ...progress[stageId],
        [taskId]: !progress[stageId]?.[taskId]
      }
    };
    setProgress(updated);
    triggerCloudSync(updated, taskDetails, dailyFocus, logEntries);
  };

  // Save Task details from Modal
  const handleSaveModalTask = (stageId, taskId, fields) => {
    const updatedProgress = {
      ...progress,
      [stageId]: {
        ...progress[stageId],
        [taskId]: fields.completed
      }
    };

    const updatedDetails = {
      ...taskDetails,
      [stageId]: {
        ...taskDetails[stageId],
        [taskId]: {
          priority: fields.priority,
          dueDate: fields.dueDate,
          plannedHours: fields.plannedHours,
          actualHours: fields.actualHours,
          evidenceUrl: fields.evidenceUrl,
          notes: fields.notes
        }
      }
    };

    setProgress(updatedProgress);
    setTaskDetails(updatedDetails);
    triggerCloudSync(updatedProgress, updatedDetails, dailyFocus, logEntries);
  };

  // Daily Focus change
  const handleDailyFocusSave = (newFocus) => {
    setDailyFocus(newFocus);
    triggerCloudSync(progress, taskDetails, newFocus, logEntries);
  };

  // Log Entries handlers
  const handleAddLogEntry = (newEntry) => {
    const updated = [newEntry, ...logEntries];
    setLogEntries(updated);
    triggerCloudSync(progress, taskDetails, dailyFocus, updated);
  };

  const handleDeleteLogEntry = (id) => {
    const ar = language === 'ar';
    if (!confirm(ar ? 'هل أنتِ متأكدة من حذف هذا السجل؟' : 'Are you sure you want to delete this log entry?')) return;
    const updated = logEntries.filter(e => e.id !== id);
    setLogEntries(updated);
    triggerCloudSync(progress, taskDetails, dailyFocus, updated);
  };

  // Backup & Share
  const handleExportBackup = () => {
    const backupData = {
      appName: 'SedraGreenActionHubProgress',
      version: 'React_3.0',
      exportedAt: new Date().toISOString(),
      language,
      progress,
      taskDetails,
      dailyFocusData: dailyFocus,
      logEntries
    };

    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sedra_Progress_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data && data.progress) {
          setProgress(data.progress);
          if (data.taskDetails) setTaskDetails(data.taskDetails);
          if (data.dailyFocusData) setDailyFocus(data.dailyFocusData);
          if (data.logEntries) setLogEntries(data.logEntries);
          triggerCloudSync(data.progress, data.taskDetails || taskDetails, data.dailyFocusData || dailyFocus, data.logEntries || logEntries);
          alert(language === 'ar' ? 'تمت استعادة النسخة الاحتياطية بنجاح! 🎉' : 'Backup restored successfully! 🎉');
        }
      } catch (err) {
        alert(language === 'ar' ? 'حدث خطأ في قراءة ملف النسخة الاحتياطية.' : 'Error reading backup file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleShareProgress = () => {
    const payload = { p: progress, f: dailyFocus, d: taskDetails, l: logEntries };
    const json = JSON.stringify(payload);
    const encoded = encodeURIComponent(btoa(unescape(encodeURIComponent(json))));
    const shareUrl = window.location.origin + window.location.pathname + '#share=' + encoded;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert(language === 'ar'
          ? '✅ تم نسخ رابط إنجازك بنجاح!\n\nيمكنك الآن إرساله على الواتساب إلى والدك أو الأستاذ ليفتح معهم بكامل تقدمك.'
          : '✅ Share link copied! Send it to your mentor or family to view your full progress.');
      }).catch(() => {
        prompt(language === 'ar' ? 'انسخي هذا الرابط:' : 'Copy this link:', shareUrl);
      });
    } else {
      prompt(language === 'ar' ? 'انسخي هذا الرابط:' : 'Copy this link:', shareUrl);
    }
  };

  const handleResetProgress = () => {
    const ar = language === 'ar';
    if (!confirm(ar ? 'هل أنتِ متأكدة من رغبتك في إعادة تعيين كافة تقدم المشروع؟' : 'Are you sure you want to reset all progress?')) return;

    const resetP = {};
    stages.forEach(s => {
      resetP[s.id] = {};
      s.tasks.forEach(t => { resetP[s.id][t.id] = false; });
    });

    setProgress(resetP);
    triggerCloudSync(resetP, taskDetails, dailyFocus, logEntries);
  };

  // Calculate Metrics Stats
  let totalTasks = 0;
  let completedTasks = 0;
  let overdueTasks = 0;
  let totalPlannedHours = 0;
  let totalActualHours = 0;
  const todayStr = new Date().toISOString().split('T')[0];

  stages.forEach(s => {
    s.tasks.forEach(t => {
      totalTasks++;
      const isDone = Boolean(progress[s.id]?.[t.id]);
      if (isDone) completedTasks++;

      const detail = taskDetails[s.id]?.[t.id] || {};
      if (!isDone && detail.dueDate && detail.dueDate < todayStr) {
        overdueTasks++;
      }

      totalPlannedHours += Number(detail.plannedHours || t.plannedHours || 1);
      totalActualHours += Number(detail.actualHours || 0);
    });
  });

  const remainingTasks = totalTasks - completedTasks;
  const percent = Math.round((completedTasks / totalTasks) * 100);

  let statusText = '';
  if (language === 'ar') {
    if (percent === 0) statusText = 'لم يبدأ بعد';
    else if (percent < 25) statusText = 'بدأنا الرّحلة 🌱';
    else if (percent < 50) statusText = 'تقدم ملحوظ 🌿';
    else if (percent < 75) statusText = 'في منتصف الطريق 🌳';
    else if (percent < 100) statusText = 'قريب من الإنجاز ✨';
    else statusText = '🎉 اكتمل المشروع بنجاح!';
  } else {
    if (percent === 0) statusText = 'Not started';
    else if (percent < 25) statusText = 'Getting started 🌱';
    else if (percent < 50) statusText = 'Good progress 🌿';
    else if (percent < 75) statusText = 'Halfway there 🌳';
    else if (percent < 100) statusText = 'Almost there ✨';
    else statusText = '🎉 Project Completed!';
  }

  const stats = {
    percent,
    statusText,
    stagesCount: stages.length,
    totalTasks,
    completedTasks,
    remainingTasks,
    overdueTasks,
    plannedHours: Math.round(totalPlannedHours),
    actualHours: totalActualHours
  };

  // Filter tasks per stage
  const getFilteredTasksForStage = (stage) => {
    return stage.tasks.filter(t => {
      const isDone = Boolean(progress[stage.id]?.[t.id]);
      const detail = taskDetails[stage.id]?.[t.id] || {};
      const priority = detail.priority || t.priority || 'medium';
      const isOverdue = !isDone && detail.dueDate && detail.dueDate < todayStr;

      if (filters.status === 'completed' && !isDone) return false;
      if (filters.status === 'pending' && isDone) return false;
      if (filters.status === 'overdue' && !isOverdue) return false;

      if (filters.priority !== 'all' && priority !== filters.priority) return false;

      if (filters.search) {
        const query = filters.search.toLowerCase();
        const enTitle = (t.en || '').toLowerCase();
        const arTitle = (t.ar || '').toLowerCase();
        const notes = (detail.notes || '').toLowerCase();
        if (!enTitle.includes(query) && !arTitle.includes(query) && !notes.includes(query)) {
          return false;
        }
      }

      return true;
    });
  };

  const activeStage = modalTask ? stages.find(s => s.id === modalTask.stageId) : null;
  const activeTask = activeStage ? activeStage.tasks.find(t => t.id === modalTask.taskId) : null;

  const ar = language === 'ar';

  return (
    <div className="hero-bg min-h-screen">
      <Header
        language={language}
        setLanguage={setLanguage}
        cloudStatus={cloudStatus}
        onExport={handleExportBackup}
        onImport={handleImportBackup}
        onShare={handleShareProgress}
        onReset={handleResetProgress}
      />

      <main className="max-w-6xl mx-auto px-5 pb-16 space-y-7">
        <DailyFocus
          language={language}
          dailyFocus={dailyFocus}
          setDailyFocus={setDailyFocus}
          onSave={handleDailyFocusSave}
        />

        <MetricsSummary language={language} stats={stats} />

        <FilterBar
          language={language}
          filters={filters}
          setFilters={setFilters}
          onClear={() => setFilters({ search: '', status: 'all', priority: 'all' })}
        />

        {/* Roadmap Stages */}
        <section>
          <div className="mb-5 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wider font-bold" style={{ color: 'var(--purple)' }}>
                {ar ? 'خارطة المشروع' : 'Project Roadmap'}
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold mt-1">
                {ar ? 'ابني ← اختبري ← انشري ← قدّمي' : 'Build → Test → Publish → Pitch'}
              </h2>
              <p className="text-gray-600 text-xs md:text-sm mt-1">
                {ar
                  ? 'اتبعي مسار دورة Vibe Coding أثناء بناء منصة Sedra Green Action Hub.'
                  : 'Follow the Vibe Coding journey while building Sedra Green Action Hub.'}
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {stages.map(stage => {
              const filteredTasks = getFilteredTasksForStage(stage);
              if (filteredTasks.length === 0 && (filters.search || filters.status !== 'all' || filters.priority !== 'all')) {
                return null;
              }

              return (
                <StageCard
                  key={stage.id}
                  language={language}
                  stage={stage}
                  tasks={filteredTasks}
                  progress={progress}
                  taskDetails={taskDetails}
                  onToggleTask={handleToggleTask}
                  onOpenModal={(stageId, taskId) => setModalTask({ stageId, taskId })}
                />
              );
            })}
          </div>
        </section>

        <LogSection
          language={language}
          logEntries={logEntries}
          onAddEntry={handleAddLogEntry}
          onDeleteEntry={handleDeleteLogEntry}
        />

        {/* Final Destination */}
        <section className="mt-10">
          <div
            className="rounded-3xl p-7 md:p-9 text-white shadow-xl relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#6F4E7C,#32463C)' }}
          >
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-wider opacity-80 font-bold">
                {ar ? 'الوجهة النهائية' : 'Final Destination'}
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
                Sedra Green Action Hub
              </h2>

              <p className="mt-3 max-w-3xl leading-7 opacity-90 text-sm md:text-base">
                {ar
                  ? 'منصة رقمية تربط التحديات البيئية والمبادرات الخضراء وأصحاب المصلحة والمتخصصين والجهات الداعمة والمتطوعين.'
                  : 'A digital platform connecting environmental challenges, green initiatives, stakeholders, specialists, donors and volunteers.'}
              </p>

              <div className="flex flex-wrap gap-2.5 mt-6">
                <span className="px-3.5 py-1.5 rounded-full bg-white/15 text-xs font-medium">🌱 Environmental Action</span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/15 text-xs font-medium">🤖 Emerging Technologies</span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/15 text-xs font-medium">💻 Vibe Coding</span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/15 text-xs font-medium">🌍 Sustainability</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Task Modal */}
      <TaskModal
        language={language}
        isOpen={Boolean(modalTask)}
        onClose={() => setModalTask(null)}
        stage={activeStage}
        task={activeTask}
        isDone={activeStage && activeTask ? Boolean(progress[activeStage.id]?.[activeTask.id]) : false}
        details={activeStage && activeTask ? (taskDetails[activeStage.id]?.[activeTask.id] || {}) : {}}
        onSave={handleSaveModalTask}
      />
    </div>
  );
}

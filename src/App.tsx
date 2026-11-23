import { useEffect, useState } from 'react';
import {
  BarChart3,
  BookOpen,
  ClipboardList,
  FileText,
  Menu,
  Moon,
  RotateCcw,
  Sun,
  X
} from 'lucide-react';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { AutomatedReportsWorkspace } from './components/AutomatedReportsWorkspace';
import { ModulesWorkspace } from './components/ModulesWorkspace';
import { MonitoringWorkspace } from './components/MonitoringWorkspace';
import { LEARNING_MODULES } from './data/curriculum';
import {
  getModuleTitle,
  INITIAL_ACTIVITIES,
  INITIAL_ENGAGEMENT,
  INITIAL_STUDENTS
} from './data/students';
import {
  ActivityEvent,
  ClassGroup,
  DailyEngagement,
  ModuleId,
  StudentRecord,
  WorkspaceView
} from './types';

const STORAGE_KEYS = {
  students: 'informatrack_students_v1',
  activities: 'informatrack_activities_v1',
  engagement: 'informatrack_engagement_v1',
  theme: 'informatrack_theme_v1'
};

export default function App() {
  const [activeView, setActiveView] = useState<WorkspaceView>('analytics');
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>('dampak-sosial');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.theme) === 'dark';
    } catch {
      return false;
    }
  });

  const [students, setStudents] = useState<StudentRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.students);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore parse errors
    }
    return INITIAL_STUDENTS;
  });

  const [activities, setActivities] = useState<ActivityEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.activities);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_ACTIVITIES;
  });

  const [engagement, setEngagement] = useState<DailyEngagement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.engagement);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_ENGAGEMENT;
  });

  const [selectedStudentId, setSelectedStudentId] = useState<string>(() => students[0]?.id ?? 'stu-01');
  const [reportScopeMode, setReportScopeMode] = useState<'class' | 'student'>('class');
  const [reportClassFilter, setReportClassFilter] = useState<'Semua Kelas' | ClassGroup>('Semua Kelas');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    try {
      localStorage.setItem(STORAGE_KEYS.theme, isDark ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }, [isDark]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.students, JSON.stringify(students));
    } catch {
      // ignore
    }
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.activities, JSON.stringify(activities));
    } catch {
      // ignore
    }
  }, [activities]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.engagement, JSON.stringify(engagement));
    } catch {
      // ignore
    }
  }, [engagement]);

  const formatNowLabel = () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    return `Hari ini · ${hh}:${mm}`;
  };

  const todayIso = () => new Date().toISOString().slice(0, 10);

  const pushActivity = (
    student: StudentRecord,
    moduleId: ModuleId,
    actionType: ActivityEvent['actionType'],
    detail: string,
    scoreDelta?: number
  ) => {
    const newEvent: ActivityEvent = {
      id: `act-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      classGroup: student.classGroup,
      moduleId,
      actionType,
      detail,
      scoreDelta,
      timestamp: formatNowLabel()
    };
    setActivities((prev) => [newEvent, ...prev].slice(0, 40));
  };

  const bumpTodayEngagement = (minutesDelta: number, quizDelta: number) => {
    setEngagement((prev) =>
      prev.map((day, idx) =>
        idx === prev.length - 1
          ? {
              ...day,
              studyMinutes: day.studyMinutes + minutesDelta,
              quizzesCompleted: day.quizzesCompleted + quizDelta
            }
          : day
      )
    );
  };

  const handleToggleSubTopic = (studentId: string, moduleId: ModuleId, subTopicId: string) => {
    const modDef = LEARNING_MODULES.find((m) => m.id === moduleId);
    if (!modDef) return;

    let targetStudent: StudentRecord | undefined;
    let added = false;

    setStudents((prev) =>
      prev.map((stu) => {
        if (stu.id !== studentId) return stu;
        targetStudent = stu;
        const currentMod = stu.modules[moduleId];
        const exists = currentMod.completedSubTopics.includes(subTopicId);
        added = !exists;
        const updatedSubTopics = exists
          ? currentMod.completedSubTopics.filter((id) => id !== subTopicId)
          : [...currentMod.completedSubTopics, subTopicId];

        const pct = Math.round((updatedSubTopics.length / modDef.subTopics.length) * 100);
        return {
          ...stu,
          lastActive: formatNowLabel(),
          modules: {
            ...stu.modules,
            [moduleId]: {
              ...currentMod,
              completedSubTopics: updatedSubTopics,
              completionPct: pct,
              studyMinutes: currentMod.studyMinutes + (added ? 5 : 0),
              lastUpdated: todayIso()
            }
          }
        };
      })
    );

    if (targetStudent && added) {
      pushActivity(
        targetStudent,
        moduleId,
        'Rangkuman Sub-topik',
        `Menuntaskan pemahaman sub-topik pada modul ${modDef.title}`
      );
      bumpTodayEngagement(5, 0);
    }
  };

  const handleCompleteLab = (studentId: string, moduleId: ModuleId) => {
    let targetStudent: StudentRecord | undefined;
    let newlyCompleted = false;

    setStudents((prev) =>
      prev.map((stu) => {
        if (stu.id !== studentId) return stu;
        targetStudent = stu;
        const currentMod = stu.modules[moduleId];
        newlyCompleted = !currentMod.labCompleted;
        return {
          ...stu,
          lastActive: formatNowLabel(),
          modules: {
            ...stu.modules,
            [moduleId]: {
              ...currentMod,
              labCompleted: true,
              studyMinutes: currentMod.studyMinutes + (newlyCompleted ? 10 : 0),
              lastUpdated: todayIso()
            }
          }
        };
      })
    );

    if (targetStudent && newlyCompleted) {
      pushActivity(
        targetStudent,
        moduleId,
        'Lab Interaktif',
        `Menyelesaikan simulasi laboratorium interaktif ${getModuleTitle(moduleId)}`
      );
      bumpTodayEngagement(10, 0);
    }
  };

  const handleSubmitQuiz = (studentId: string, moduleId: ModuleId, score: number) => {
    let targetStudent: StudentRecord | undefined;

    setStudents((prev) =>
      prev.map((stu) => {
        if (stu.id !== studentId) return stu;
        targetStudent = stu;
        const currentMod = stu.modules[moduleId];
        return {
          ...stu,
          lastActive: formatNowLabel(),
          modules: {
            ...stu.modules,
            [moduleId]: {
              ...currentMod,
              score,
              quizAttempts: currentMod.quizAttempts + 1,
              studyMinutes: currentMod.studyMinutes + 8,
              lastUpdated: todayIso()
            }
          }
        };
      })
    );

    if (targetStudent) {
      pushActivity(
        targetStudent,
        moduleId,
        'Evaluasi Kuis',
        `Menyelesaikan evaluasi kuis ${getModuleTitle(moduleId)} dengan skor ${score}`,
        score
      );
      bumpTodayEngagement(8, 1);
    }
  };

  const handleAddStudent = (name: string, nis: string, classGroup: ClassGroup) => {
    const newId = `stu-${Date.now()}`;
    const blankModule = () => ({
      score: 0,
      completionPct: 0,
      completedSubTopics: [],
      labCompleted: false,
      quizAttempts: 0,
      studyMinutes: 0,
      lastUpdated: todayIso()
    });

    const newStudent: StudentRecord = {
      id: newId,
      name,
      nis,
      classGroup,
      lastActive: formatNowLabel(),
      modules: {
        'dampak-sosial': blankModule(),
        'computer-system': blankModule(),
        'keamanan-etika': blankModule(),
        'vibe-coding': blankModule()
      }
    };

    setStudents((prev) => [newStudent, ...prev]);
    setSelectedStudentId(newId);
    pushActivity(newStudent, 'dampak-sosial', 'Pembaruan Guru', `Siswa baru ditambahkan ke kelas ${classGroup}`);
  };

  const handleUpdateModuleScore = (
    studentId: string,
    moduleId: ModuleId,
    newScore: number,
    addedMinutes: number,
    labCompleted: boolean
  ) => {
    let targetStudent: StudentRecord | undefined;

    setStudents((prev) =>
      prev.map((stu) => {
        if (stu.id !== studentId) return stu;
        targetStudent = stu;
        const currentMod = stu.modules[moduleId];
        return {
          ...stu,
          lastActive: formatNowLabel(),
          modules: {
            ...stu.modules,
            [moduleId]: {
              ...currentMod,
              score: newScore,
              labCompleted,
              studyMinutes: currentMod.studyMinutes + addedMinutes,
              lastUpdated: todayIso()
            }
          }
        };
      })
    );

    if (targetStudent) {
      pushActivity(
        targetStudent,
        moduleId,
        'Pembaruan Guru',
        `Skor ${getModuleTitle(moduleId)} diperbarui menjadi ${newScore} (+${addedMinutes} mnt)`,
        newScore
      );
      if (addedMinutes > 0) bumpTodayEngagement(addedMinutes, 0);
    }
  };

  const handleResetDemoData = () => {
    setStudents(INITIAL_STUDENTS);
    setActivities(INITIAL_ACTIVITIES);
    setEngagement(INITIAL_ENGAGEMENT);
    setSelectedStudentId(INITIAL_STUDENTS[0].id);
  };

  const navItems: Array<{ id: WorkspaceView; label: string; icon: typeof BarChart3 }> = [
    { id: 'analytics', label: 'Dashboard Analitik', icon: BarChart3 },
    { id: 'modules', label: 'Rangkuman & Lab', icon: BookOpen },
    { id: 'monitoring', label: 'Monitoring Siswa', icon: ClipboardList },
    { id: 'reports', label: 'Pelaporan Otomatis', icon: FileText }
  ];

  const activeViewTitle = navItems.find((item) => item.id === activeView)?.label ?? 'Dashboard Analitik';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex">
      {/* Mobile Sidebar Backdrop */}
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="fixed inset-0 bg-slate-900/40 z-30 lg:hidden no-print"
        />
      )}

      {/* Workspace Sidebar (260px) */}
      <aside
        className={`no-print fixed lg:sticky top-0 left-0 z-40 h-screen w-[260px] shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-200 ${
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5 space-y-7 overflow-y-auto">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap">
              InformaTrack
            </span>
            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              className="lg:hidden p-1.5 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Tutup navigasi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="space-y-1">
            <p className="px-3 text-[11px] font-medium text-slate-400 dark:text-slate-500 mb-2">
              Ruang Kerja
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveView(item.id);
                    setMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-800">
            <p className="px-3 text-[11px] font-medium text-slate-400 dark:text-slate-500 mb-2">
              Materi Kurikulum
            </p>
            {LEARNING_MODULES.map((mod) => {
              const isSelected = activeView === 'modules' && activeModuleId === mod.id;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => {
                    setActiveModuleId(mod.id);
                    setActiveView('modules');
                    setMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-xs rounded-lg transition-colors text-left ${
                    isSelected
                      ? 'text-blue-700 dark:text-blue-300 font-semibold bg-slate-50 dark:bg-slate-800/70'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <span className="font-mono text-[11px] text-slate-400 shrink-0">{mod.orderLabel}</span>
                  <span className="truncate">{mod.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <button
            type="button"
            onClick={() => setIsDark((prev) => !prev)}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="inline-flex items-center gap-2">
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              {isDark ? 'Mode Terang' : 'Mode Gelap'}
            </span>
          </button>

          <button
            type="button"
            onClick={handleResetDemoData}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data Awal</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Workspace Header (Breadcrumb + Single Primary CTA) */}
        <header className="no-print sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border-b border-slate-200 dark:border-slate-800 px-6 py-3.5 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
              aria-label="Buka menu navigasi"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 truncate">
              <span className="font-medium text-slate-700 dark:text-slate-300">Informatika</span>
              <span aria-hidden="true">/</span>
              <span className="text-slate-900 dark:text-slate-100 font-medium truncate">
                {activeViewTitle}
              </span>
            </div>
          </div>

          <div className="shrink-0">
            {activeView !== 'reports' ? (
              <button
                type="button"
                onClick={() => {
                  setReportScopeMode('class');
                  setActiveView('reports');
                }}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0"
              >
                Buat Laporan Otomatis
              </button>
            ) : (
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0"
              >
                Cetak / Simpan PDF
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 max-w-[1440px] w-full mx-auto">
          {activeView === 'analytics' && (
            <AnalyticsDashboard
              students={students}
              engagement={engagement}
              onOpenModule={(modId) => {
                setActiveModuleId(modId);
                setActiveView('modules');
              }}
              onInspectStudent={(stuId) => {
                setSelectedStudentId(stuId);
                setActiveView('monitoring');
              }}
              onOpenReportForStudent={(stuId) => {
                setSelectedStudentId(stuId);
                setReportScopeMode('student');
                setActiveView('reports');
              }}
              onOpenClassReport={(cls) => {
                setReportClassFilter(cls);
                setReportScopeMode('class');
                setActiveView('reports');
              }}
            />
          )}

          {activeView === 'modules' && (
            <ModulesWorkspace
              activeModuleId={activeModuleId}
              onSelectModule={setActiveModuleId}
              students={students}
              activeLearnerId={selectedStudentId}
              onChangeActiveLearner={setSelectedStudentId}
              onToggleSubTopic={handleToggleSubTopic}
              onCompleteLab={handleCompleteLab}
              onSubmitQuiz={handleSubmitQuiz}
            />
          )}

          {activeView === 'monitoring' && (
            <MonitoringWorkspace
              students={students}
              activities={activities}
              selectedStudentId={selectedStudentId}
              onSelectStudent={setSelectedStudentId}
              onAddStudent={handleAddStudent}
              onUpdateModuleScore={handleUpdateModuleScore}
              onOpenReportForStudent={(stuId) => {
                setSelectedStudentId(stuId);
                setReportScopeMode('student');
                setActiveView('reports');
              }}
            />
          )}

          {activeView === 'reports' && (
            <AutomatedReportsWorkspace
              students={students}
              initialScopeMode={reportScopeMode}
              initialClassFilter={reportClassFilter}
              initialStudentId={selectedStudentId}
            />
          )}
        </main>
      </div>
    </div>
  );
}

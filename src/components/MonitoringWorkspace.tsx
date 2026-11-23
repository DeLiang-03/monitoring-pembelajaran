import { useMemo, useState } from 'react';
import { Plus, Save, FileText, CheckCircle2, Clock } from 'lucide-react';
import { LEARNING_MODULES } from '../data/curriculum';
import {
  getMasteryStatus,
  getModuleTitle,
  getStudentAverageCompletion,
  getStudentAverageScore,
  getStudentTotalMinutes
} from '../data/students';
import { ActivityEvent, ClassGroup, ModuleId, StudentRecord } from '../types';

interface MonitoringWorkspaceProps {
  students: StudentRecord[];
  activities: ActivityEvent[];
  selectedStudentId: string;
  onSelectStudent: (id: string) => void;
  onAddStudent: (name: string, nis: string, classGroup: ClassGroup) => void;
  onUpdateModuleScore: (
    studentId: string,
    moduleId: ModuleId,
    newScore: number,
    addedMinutes: number,
    labCompleted: boolean
  ) => void;
  onOpenReportForStudent: (studentId: string) => void;
}

export function MonitoringWorkspace({
  students,
  activities,
  selectedStudentId,
  onSelectStudent,
  onAddStudent,
  onUpdateModuleScore,
  onOpenReportForStudent
}: MonitoringWorkspaceProps) {
  const selectedStudent = students.find((s) => s.id === selectedStudentId) ?? students[0];

  // Add Student Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newNis, setNewNis] = useState('');
  const [newClass, setNewClass] = useState<ClassGroup>('VIII-A');
  const [formFeedback, setFormFeedback] = useState<string | null>(null);

  // Update Progress Form State
  const [editModuleId, setEditModuleId] = useState<ModuleId>('dampak-sosial');
  const [editScore, setEditScore] = useState<number>(
    selectedStudent?.modules['dampak-sosial'].score ?? 80
  );
  const [addedMinutes, setAddedMinutes] = useState<number>(15);
  const [editLabDone, setEditLabDone] = useState<boolean>(
    selectedStudent?.modules['dampak-sosial'].labCompleted ?? true
  );
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Activity Filter State
  const [activityModuleFilter, setActivityModuleFilter] = useState<'all' | ModuleId>('all');

  const handleSelectEditModule = (modId: ModuleId) => {
    setEditModuleId(modId);
    if (selectedStudent) {
      setEditScore(selectedStudent.modules[modId].score);
      setEditLabDone(selectedStudent.modules[modId].labCompleted);
    }
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = newName.trim();
    const trimmedNis = newNis.trim();
    if (!trimmedName || !trimmedNis) {
      setFormFeedback('Nama lengkap dan NIS wajib diisi.');
      return;
    }
    onAddStudent(trimmedName, trimmedNis, newClass);
    setNewName('');
    setNewNis('');
    setShowAddForm(false);
    setFormFeedback(null);
  };

  const handleSaveProgress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;
    const clampedScore = Math.max(0, Math.min(100, Number(editScore) || 0));
    const clampedMinutes = Math.max(0, Number(addedMinutes) || 0);
    onUpdateModuleScore(selectedStudent.id, editModuleId, clampedScore, clampedMinutes, editLabDone);
    setSaveToast(`Progres ${selectedStudent.name} pada modul ${getModuleTitle(editModuleId)} diperbarui.`);
    setTimeout(() => setSaveToast(null), 3500);
  };

  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      return activityModuleFilter === 'all' || act.moduleId === activityModuleFilter;
    });
  }, [activities, activityModuleFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Monitoring & Log Aktivitas Siswa
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Inspeksi profil capaian individu, catat pembaruan nilai, dan pantau riwayat belajar terkini.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm((prev) => !prev)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4" />
          {showAddForm ? 'Tutup Formulir' : 'Tambah Siswa Baru'}
        </button>
      </div>

      {/* Add Student Panel */}
      {showAddForm && (
        <form
          onSubmit={handleCreateStudent}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4"
        >
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Registrasi Siswa Baru ke Sistem Monitoring
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="new-stu-name" className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                Nama Lengkap Siswa
              </label>
              <input
                id="new-stu-name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Misal: Rizky Aditya Pratama"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="new-stu-nis" className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                Nomor Induk (NIS)
              </label>
              <input
                id="new-stu-nis"
                type="text"
                value={newNis}
                onChange={(e) => setNewNis(e.target.value)}
                placeholder="20260899"
                className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="new-stu-class" className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                Rombongan Kelas
              </label>
              <select
                id="new-stu-class"
                value={newClass}
                onChange={(e) => setNewClass(e.target.value as ClassGroup)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="VIII-A">VIII-A</option>
                <option value="VIII-B">VIII-B</option>
                <option value="IX-A">IX-A</option>
              </select>
            </div>
          </div>

          {formFeedback && <p className="text-xs text-rose-600 dark:text-rose-400">{formFeedback}</p>}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Simpan Siswa
            </button>
          </div>
        </form>
      )}

      {/* Main Split: Student Inspector + Progress Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Student Selector & 4-Module Breakdown */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex-1 min-w-[220px]">
              <label htmlFor="inspect-student-select" className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                Pilih Siswa untuk Inspeksi
              </label>
              <select
                id="inspect-student-select"
                value={selectedStudent?.id ?? ''}
                onChange={(e) => {
                  const id = e.target.value;
                  onSelectStudent(id);
                  const stu = students.find((s) => s.id === id);
                  if (stu) {
                    setEditScore(stu.modules[editModuleId].score);
                    setEditLabDone(stu.modules[editModuleId].labCompleted);
                  }
                }}
                className="w-full px-3 py-2 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — {s.classGroup} (NIS {s.nis})
                  </option>
                ))}
              </select>
            </div>

            {selectedStudent && (
              <button
                type="button"
                onClick={() => onOpenReportForStudent(selectedStudent.id)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 whitespace-nowrap shrink-0 mt-4 sm:mt-0"
              >
                <FileText className="w-3.5 h-3.5" />
                Buat Rapor Siswa
              </button>
            )}
          </div>

          {selectedStudent && (
            <>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Rata-Rata Skor</span>
                  <span className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100 mt-0.5 block">
                    {getStudentAverageScore(selectedStudent)}/100
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Ketuntasan Materi</span>
                  <span className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100 mt-0.5 block">
                    {getStudentAverageCompletion(selectedStudent)}%
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Status Akhir</span>
                  <span
                    className={`text-sm font-semibold mt-1.5 block ${
                      getMasteryStatus(getStudentAverageScore(selectedStudent)) === 'Tuntas'
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : getMasteryStatus(getStudentAverageScore(selectedStudent)) === 'Dalam Proses'
                          ? 'text-blue-700 dark:text-blue-400'
                          : 'text-amber-700 dark:text-amber-400'
                    }`}
                  >
                    {getMasteryStatus(getStudentAverageScore(selectedStudent))}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {LEARNING_MODULES.map((mod) => {
                  const prog = selectedStudent.modules[mod.id];
                  return (
                    <div
                      key={mod.id}
                      className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {mod.orderLabel}. {mod.title}
                        </span>
                        <span className="font-mono text-xs tabular-nums text-slate-600 dark:text-slate-300">
                          Skor {prog.score} · Topik {prog.completedSubTopics.length}/{mod.subTopics.length} ·{' '}
                          {prog.labCompleted ? 'Lab Selesai' : 'Lab Belum'}
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 mt-2.5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-blue-600 dark:bg-blue-500 transition-all"
                          style={{ width: `${prog.completionPct}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 font-mono">
                        Durasi belajar: {prog.studyMinutes} menit · Pembaruan terakhir: {prog.lastUpdated}
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Right: Quick Educator Progress Recorder */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Catat Evaluasi & Progres Belajar
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Perbarui skor asesmen atau tambahan durasi belajar untuk {selectedStudent?.name}.
            </p>
          </div>

          <form onSubmit={handleSaveProgress} className="space-y-4">
            <div>
              <label htmlFor="edit-module-select" className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                Pilih Modul Pembelajaran
              </label>
              <select
                id="edit-module-select"
                value={editModuleId}
                onChange={(e) => handleSelectEditModule(e.target.value as ModuleId)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {LEARNING_MODULES.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.orderLabel}. {m.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="edit-score-input" className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Skor Evaluasi (0–100)
                </label>
                <input
                  id="edit-score-input"
                  type="number"
                  min={0}
                  max={100}
                  value={editScore}
                  onChange={(e) => setEditScore(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="edit-minutes-input" className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Tambah Durasi (Menit)
                </label>
                <input
                  id="edit-minutes-input"
                  type="number"
                  min={0}
                  max={180}
                  value={addedMinutes}
                  onChange={(e) => setAddedMinutes(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <label className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 cursor-pointer">
              <input
                type="checkbox"
                checked={editLabDone}
                onChange={(e) => setEditLabDone(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
              <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                Tandai praktik laboratorium interaktif modul ini selesai
              </span>
            </label>

            {saveToast && (
              <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg px-3 py-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{saveToast}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Simpan Pembaruan Progres
            </button>
          </form>

          {selectedStudent && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Total belajar: {getStudentTotalMinutes(selectedStudent)} menit
              </span>
              <span>Aktif: {selectedStudent.lastActive}</span>
            </div>
          )}
        </div>
      </div>

      {/* Chronological Activity Log */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Log Aktivitas Pembelajaran Terbaru
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Rekaman otomatis setiap penyelesaian kuis, sub-topik, praktik lab, dan pembaruan guru
            </p>
          </div>

          <select
            value={activityModuleFilter}
            onChange={(e) => setActivityModuleFilter(e.target.value as 'all' | ModuleId)}
            aria-label="Filter log aktivitas berdasarkan modul"
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Modul</option>
            {LEARNING_MODULES.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
              </option>
            ))}
          </select>
        </div>

        {filteredActivities.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Belum ada aktivitas tercatat untuk modul yang dipilih.
          </div>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredActivities.map((act) => (
              <li
                key={act.id}
                className="px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors"
              >
                <div className="space-y-0.5 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {act.studentName}
                    <span className="font-normal text-slate-500 dark:text-slate-400 ml-2 text-xs">
                      {act.classGroup} · {getModuleTitle(act.moduleId)} · {act.actionType}
                    </span>
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{act.detail}</p>
                </div>

                <div className="text-right font-mono text-xs tabular-nums shrink-0">
                  {typeof act.scoreDelta === 'number' && (
                    <span className="font-semibold text-blue-600 dark:text-blue-400 mr-3">
                      Skor {act.scoreDelta}
                    </span>
                  )}
                  <span className="text-slate-500 dark:text-slate-400">{act.timestamp}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

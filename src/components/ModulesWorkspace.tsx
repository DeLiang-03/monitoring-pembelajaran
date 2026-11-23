import { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp, ClipboardCheck, UserCheck } from 'lucide-react';
import { LEARNING_MODULES } from '../data/curriculum';
import { ModuleId, StudentRecord } from '../types';
import { InteractiveConceptLab } from './InteractiveConceptLabs';
import { ModuleImage } from './ModuleImage';

interface ModulesWorkspaceProps {
  activeModuleId: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  students: StudentRecord[];
  activeLearnerId: string;
  onChangeActiveLearner: (studentId: string) => void;
  onToggleSubTopic: (studentId: string, moduleId: ModuleId, subTopicId: string) => void;
  onCompleteLab: (studentId: string, moduleId: ModuleId) => void;
  onSubmitQuiz: (studentId: string, moduleId: ModuleId, score: number) => void;
}

export function ModulesWorkspace({
  activeModuleId,
  onSelectModule,
  students,
  activeLearnerId,
  onChangeActiveLearner,
  onToggleSubTopic,
  onCompleteLab,
  onSubmitQuiz
}: ModulesWorkspaceProps) {
  const activeModule = LEARNING_MODULES.find((m) => m.id === activeModuleId) ?? LEARNING_MODULES[0];
  const activeLearner = students.find((s) => s.id === activeLearnerId) ?? students[0];
  const learnerModProgress = activeLearner?.modules[activeModule.id];

  const [expandedSubTopic, setExpandedSubTopic] = useState<string | null>(activeModule.subTopics[0]?.id ?? null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmittedFor, setQuizSubmittedFor] = useState<Record<string, boolean>>({});

  const handleSelectModule = (id: ModuleId) => {
    onSelectModule(id);
    const mod = LEARNING_MODULES.find((m) => m.id === id);
    setExpandedSubTopic(mod?.subTopics[0]?.id ?? null);
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLearner) return;
    let correct = 0;
    activeModule.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct += 1;
      }
    });
    const calculatedScore = Math.round((correct / activeModule.quiz.length) * 100);
    onSubmitQuiz(activeLearner.id, activeModule.id, calculatedScore);
    setQuizSubmittedFor((prev) => ({ ...prev, [`${activeLearner.id}-${activeModule.id}`]: true }));
  };

  const quizKey = `${activeLearner?.id}-${activeModule.id}`;
  const isQuizSubmitted = Boolean(quizSubmittedFor[quizKey]);
  const allAnswered = activeModule.quiz.every((q) => typeof selectedAnswers[q.id] === 'number');

  return (
    <div className="space-y-6">
      {/* Header & Active Learner Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Rangkuman Pembelajaran & Lab Interaktif
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Ringkasan materi terstruktur, simulasi konsep langsung, dan evaluasi otomatis tersinkron ke analitik.
          </p>
        </div>

        {activeLearner && (
          <div className="flex items-center gap-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2">
            <UserCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <label htmlFor="active-learner-select" className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
              Peserta Aktif:
            </label>
            <select
              id="active-learner-select"
              value={activeLearner.id}
              onChange={(e) => onChangeActiveLearner(e.target.value)}
              className="text-xs font-medium text-slate-900 dark:text-slate-100 bg-transparent focus:outline-none cursor-pointer"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id} className="bg-white dark:bg-slate-900">
                  {s.name} ({s.classGroup})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 4-Card Curriculum Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {LEARNING_MODULES.map((mod) => {
          const isActive = mod.id === activeModule.id;
          const progress = activeLearner?.modules[mod.id];
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => handleSelectModule(mod.id)}
              className={`text-left rounded-xl border transition-all overflow-hidden bg-white dark:bg-slate-900 flex flex-col ${
                isActive
                  ? 'border-blue-600 dark:border-blue-500 ring-1 ring-blue-600 dark:ring-blue-500'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800">
                <ModuleImage
                  moduleId={mod.id}
                  src={mod.imagePath}
                  alt={mod.title}
                  className="w-full h-full"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {mod.orderLabel} · {mod.estimatedMinutes} mnt · {mod.subTopics.length} topik
                  </p>
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-1">
                    {mod.title}
                  </h2>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                    <span>Tuntas {progress?.completionPct ?? 0}%</span>
                    <span>Skor {progress?.score ?? 0}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-600 dark:bg-blue-500 transition-all"
                      style={{ width: `${progress?.completionPct ?? 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Module Detail Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl space-y-1.5">
            <p className="text-xs font-mono text-blue-600 dark:text-blue-400">
              Modul {activeModule.orderLabel} · Estimasi {activeModule.estimatedMinutes} menit · Target Kompetensi
            </p>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{activeModule.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeModule.competencyTarget}
            </p>
          </div>

          {learnerModProgress && (
            <div className="flex items-center gap-6 text-xs font-mono tabular-nums shrink-0">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Progres Topik</span>
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {learnerModProgress.completedSubTopics.length}/{activeModule.subTopics.length}
                </span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Skor Evaluasi</span>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {learnerModProgress.score}/100
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Structured Sub-Topics Summary List */}
      <div className="space-y-3">
        {activeModule.subTopics.map((topic, index) => {
          const isOpen = expandedSubTopic === topic.id;
          const isChecked = learnerModProgress?.completedSubTopics.includes(topic.id) ?? false;

          return (
            <div
              key={topic.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden"
            >
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <button
                  type="button"
                  onClick={() => setExpandedSubTopic(isOpen ? null : topic.id)}
                  className="flex items-center gap-3 text-left flex-1 min-w-0"
                >
                  <span className="font-mono text-xs text-slate-400 shrink-0">0{index + 1}.</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                    {topic.title}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {activeLearner && (
                  <button
                    type="button"
                    onClick={() => onToggleSubTopic(activeLearner.id, activeModule.id, topic.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                      isChecked
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {isChecked ? 'Sudah Dipahami' : 'Tandai Dipahami'}
                  </button>
                )}
              </div>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
                    {topic.summary}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    <div className="md:col-span-7 space-y-2">
                      <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                        Poin Inti Rangkuman
                      </p>
                      <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300 list-disc pl-5">
                        {topic.keyPoints.map((pt, i) => (
                          <li key={i} className="leading-relaxed">
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="md:col-span-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-lg p-4">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        Contoh Penerapan Nyata
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                        {topic.practicalExample}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Embedded Domain-Specific Interactive Concept Lab */}
      {activeLearner && (
        <InteractiveConceptLab
          moduleId={activeModule.id}
          isCompleted={Boolean(learnerModProgress?.labCompleted)}
          onCompleteLab={(modId) => onCompleteLab(activeLearner.id, modId)}
        />
      )}

      {/* Formative Assessment Quiz */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div>
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
              Evaluasi Pemahaman Formatif
            </p>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
              Kuis Modul {activeModule.title}
            </h3>
          </div>
          {isQuizSubmitted && learnerModProgress && (
            <div className="text-right">
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Skor Tersimpan</span>
              <span className="text-lg font-bold font-mono tabular-nums text-emerald-700 dark:text-emerald-400">
                {learnerModProgress.score}/100
              </span>
            </div>
          )}
        </div>

        <form onSubmit={handleQuizSubmit} className="pt-5 space-y-6">
          {activeModule.quiz.map((q, idx) => {
            const chosen = selectedAnswers[q.id];
            return (
              <div key={q.id} className="space-y-2.5">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {idx + 1}. {q.question}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = chosen === optIdx;
                    const isCorrectOption = q.correctIndex === optIdx;
                    let stateClasses =
                      'border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 text-slate-700 dark:text-slate-200 hover:border-blue-400';

                    if (isQuizSubmitted) {
                      if (isCorrectOption) {
                        stateClasses =
                          'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200';
                      } else if (isSelected && !isCorrectOption) {
                        stateClasses =
                          'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                      }
                    } else if (isSelected) {
                      stateClasses =
                        'border-blue-600 bg-blue-50/80 dark:bg-blue-950/50 text-blue-900 dark:text-blue-100';
                    }

                    return (
                      <label
                        key={optIdx}
                        className={`flex items-start gap-2.5 p-3 rounded-lg border text-xs leading-relaxed cursor-pointer transition-colors ${stateClasses}`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          checked={isSelected}
                          onChange={() => setSelectedAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                          className="mt-0.5 accent-blue-600"
                        />
                        <span>{opt}</span>
                      </label>
                    );
                  })}
                </div>
                {isQuizSubmitted && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2">
                    Pembahasan: {q.explanation}
                  </p>
                )}
              </div>
            );
          })}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Hasil kuis otomatis memperbarui skor siswa{' '}
              <span className="font-medium text-slate-800 dark:text-slate-200">{activeLearner?.name}</span> di
              dashboard analitik.
            </p>
            <button
              type="submit"
              disabled={!allAnswered}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-45 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0"
            >
              <ClipboardCheck className="w-4 h-4" />
              {isQuizSubmitted ? 'Perbarui Nilai Evaluasi' : 'Kirim Jawaban & Simpan Skor'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

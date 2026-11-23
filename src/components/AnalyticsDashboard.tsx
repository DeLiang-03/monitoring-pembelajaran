import { useMemo, useState } from 'react';
import {
  ArrowDownUp,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  FileText
} from 'lucide-react';
import { LEARNING_MODULES } from '../data/curriculum';
import {
  generateAutomatedDiagnostics,
  getClassOptions,
  getMasteryStatus,
  getStudentAverageCompletion,
  getStudentAverageScore,
  getStudentTotalMinutes
} from '../data/students';
import { ClassGroup, DailyEngagement, MasteryStatus, ModuleId, StudentRecord } from '../types';

interface AnalyticsDashboardProps {
  students: StudentRecord[];
  engagement: DailyEngagement[];
  onOpenModule: (moduleId: ModuleId) => void;
  onInspectStudent: (studentId: string) => void;
  onOpenReportForStudent: (studentId: string) => void;
  onOpenClassReport: (classFilter: 'Semua Kelas' | ClassGroup) => void;
}

export function AnalyticsDashboard({
  students,
  engagement,
  onOpenModule,
  onInspectStudent,
  onOpenReportForStudent,
  onOpenClassReport
}: AnalyticsDashboardProps) {
  const [classFilter, setClassFilter] = useState<'Semua Kelas' | ClassGroup>('Semua Kelas');
  const [statusFilter, setStatusFilter] = useState<'Semua Status' | MasteryStatus>('Semua Status');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'scoreDesc' | 'scoreAsc' | 'minutesDesc' | 'nameAsc'>('scoreDesc');
  const [hoveredDayIndex, setHoveredDayIndex] = useState<number | null>(null);
  const [hoveredModuleId, setHoveredModuleId] = useState<ModuleId | null>(null);

  const classScopedStudents = useMemo(() => {
    if (classFilter === 'Semua Kelas') return students;
    return students.filter((s) => s.classGroup === classFilter);
  }, [students, classFilter]);

  const diagnostics = useMemo(
    () => generateAutomatedDiagnostics(classScopedStudents, classFilter),
    [classScopedStudents, classFilter]
  );

  const kpis = useMemo(() => {
    if (classScopedStudents.length === 0) {
      return { avgScore: 0, avgCompletion: 0, totalHours: '0.0', pendampinganCount: 0 };
    }
    const avgScore = Math.round(
      classScopedStudents.reduce((sum, s) => sum + getStudentAverageScore(s), 0) / classScopedStudents.length
    );
    const avgCompletion = Math.round(
      classScopedStudents.reduce((sum, s) => sum + getStudentAverageCompletion(s), 0) / classScopedStudents.length
    );
    const totalMinutes = classScopedStudents.reduce((sum, s) => sum + getStudentTotalMinutes(s), 0);
    const totalHours = (totalMinutes / 60).toFixed(1);
    const pendampinganCount = classScopedStudents.filter(
      (s) => getMasteryStatus(getStudentAverageScore(s)) === 'Perlu Pendampingan'
    ).length;

    return { avgScore, avgCompletion, totalHours, pendampinganCount };
  }, [classScopedStudents]);

  const moduleBreakdown = useMemo(() => {
    return LEARNING_MODULES.map((mod) => {
      if (classScopedStudents.length === 0) {
        return { id: mod.id, shortTitle: mod.shortTitle, title: mod.title, avgScore: 0, avgCompletion: 0 };
      }
      const avgScore = Math.round(
        classScopedStudents.reduce((sum, s) => sum + s.modules[mod.id].score, 0) / classScopedStudents.length
      );
      const avgCompletion = Math.round(
        classScopedStudents.reduce((sum, s) => sum + s.modules[mod.id].completionPct, 0) / classScopedStudents.length
      );
      return { id: mod.id, shortTitle: mod.shortTitle, title: mod.title, avgScore, avgCompletion };
    });
  }, [classScopedStudents]);

  const filteredTableStudents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const filtered = classScopedStudents.filter((stu) => {
      const matchesSearch = !q || stu.name.toLowerCase().includes(q) || stu.nis.includes(q);
      const status = getMasteryStatus(getStudentAverageScore(stu));
      const matchesStatus = statusFilter === 'Semua Status' || status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'scoreDesc') return getStudentAverageScore(b) - getStudentAverageScore(a);
      if (sortBy === 'scoreAsc') return getStudentAverageScore(a) - getStudentAverageScore(b);
      if (sortBy === 'minutesDesc') return getStudentTotalMinutes(b) - getStudentTotalMinutes(a);
      return a.name.localeCompare(b.name);
    });
  }, [classScopedStudents, searchQuery, statusFilter, sortBy]);

  // SVG engagement chart math
  const maxMinutes = Math.max(...engagement.map((d) => d.studyMinutes), 100);
  const chartW = 540;
  const chartH = 180;
  const padX = 28;
  const padY = 20;
  const points = engagement.map((d, i) => {
    const x = padX + (i / Math.max(engagement.length - 1, 1)) * (chartW - padX * 2);
    const y = chartH - padY - (d.studyMinutes / maxMinutes) * (chartH - padY * 2);
    return { x, y, ...d };
  });
  const linePath = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${chartH - padY} L ${points[0].x.toFixed(1)} ${chartH - padY} Z`
      : '';

  return (
    <div className="space-y-6">
      {/* Workspace Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Dashboard Analitik Pembelajaran
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pemantauan penguasaan 4 modul inti Informatika · {classScopedStudents.length} siswa aktif
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            {getClassOptions().map((cls) => (
              <button
                key={cls}
                type="button"
                onClick={() => setClassFilter(cls)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  classFilter === cls
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onOpenClassReport(classFilter)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
          >
            <FileText className="w-3.5 h-3.5" />
            Laporan {classFilter}
          </button>
        </div>
      </div>

      {/* 4-Column KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Rata-Rata Penguasaan</p>
          <div className="flex items-baseline justify-between mt-2">
            <p className="text-3xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
              {kpis.avgScore}
              <span className="text-sm font-normal text-slate-400 ml-1">/100</span>
            </p>
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Target ≥ 75
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Ketuntasan Rangkuman</p>
          <div className="flex items-baseline justify-between mt-2">
            <p className="text-3xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
              {kpis.avgCompletion}%
            </p>
            <span className="text-xs text-slate-500 dark:text-slate-400">4 modul kurikulum</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Jam Belajar</p>
          <div className="flex items-baseline justify-between mt-2">
            <p className="text-3xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
              {kpis.totalHours}
              <span className="text-sm font-normal text-slate-400 ml-1">jam</span>
            </p>
            <span className="text-xs text-slate-500 dark:text-slate-400 inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Terakumulasi
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Perlu Pendampingan</p>
          <div className="flex items-baseline justify-between mt-2">
            <p className="text-3xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
              {kpis.pendampinganCount}
              <span className="text-sm font-normal text-slate-400 ml-1">siswa</span>
            </p>
            <span
              className={`text-xs font-medium inline-flex items-center gap-1 ${
                kpis.pendampinganCount > 0
                  ? 'text-amber-700 dark:text-amber-400'
                  : 'text-emerald-700 dark:text-emerald-400'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {kpis.pendampinganCount > 0 ? 'Skor < 65' : 'Semua Aman'}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Module Comparison Bar Chart */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Penguasaan per Modul Materi
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Klik batang modul untuk membuka rangkuman dan lab interaktif
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
              Skor · Progres
            </span>
          </div>

          <div className="space-y-4">
            {moduleBreakdown.map((mod) => {
              const isHovered = hoveredModuleId === mod.id;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => onOpenModule(mod.id)}
                  onMouseEnter={() => setHoveredModuleId(mod.id)}
                  onMouseLeave={() => setHoveredModuleId(null)}
                  className="w-full text-left group p-2.5 -mx-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium text-slate-800 dark:text-slate-200 inline-flex items-center gap-1.5">
                      {mod.title}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-blue-600 transition-opacity" />
                    </span>
                    <span className="font-mono text-xs tabular-nums text-slate-600 dark:text-slate-300">
                      Skor {mod.avgScore} · Tuntas {mod.avgCompletion}%
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isHovered ? 'bg-blue-700 dark:bg-blue-400' : 'bg-blue-600 dark:bg-blue-500'
                        }`}
                        style={{ width: `${mod.avgScore}%` }}
                      />
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500/80 dark:bg-emerald-400/80 transition-all duration-300"
                        style={{ width: `${mod.avgCompletion}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Interactive 7-Day Engagement SVG Area Chart */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Tren Aktivitas Belajar Mingguan
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Arahkan kursor pada titik hari untuk melihat rincian durasi dan kuis
              </p>
            </div>
            {hoveredDayIndex !== null && points[hoveredDayIndex] ? (
              <div className="text-right font-mono text-xs tabular-nums text-blue-700 dark:text-blue-400">
                {points[hoveredDayIndex].dayLabel}: {points[hoveredDayIndex].studyMinutes} mnt ·{' '}
                {points[hoveredDayIndex].quizzesCompleted} kuis
              </div>
            ) : (
              <div className="text-right font-mono text-xs tabular-nums text-slate-500 dark:text-slate-400">
                Total 7 hari: {engagement.reduce((acc, d) => acc + d.studyMinutes, 0)} mnt
              </div>
            )}
          </div>

          <div className="w-full overflow-hidden">
            <svg viewBox={`0 0 ${chartW} ${chartH + 22}`} className="w-full h-auto select-none">
              <defs>
                <linearGradient id="studyAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {[0.25, 0.5, 0.75, 1].map((ratio) => {
                const yPos = chartH - padY - ratio * (chartH - padY * 2);
                return (
                  <line
                    key={ratio}
                    x1={padX}
                    x2={chartW - padX}
                    y1={yPos}
                    y2={yPos}
                    className="stroke-slate-200 dark:stroke-slate-800"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                );
              })}

              {areaPath && <path d={areaPath} fill="url(#studyAreaGrad)" />}
              {linePath && (
                <path
                  d={linePath}
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {points.map((pt, idx) => {
                const active = hoveredDayIndex === idx;
                return (
                  <g
                    key={pt.dayLabel}
                    onMouseEnter={() => setHoveredDayIndex(idx)}
                    onMouseLeave={() => setHoveredDayIndex(null)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={active ? 6 : 4}
                      className="fill-white dark:fill-slate-900 stroke-blue-600 dark:stroke-blue-400"
                      strokeWidth={active ? 3 : 2}
                    />
                    <rect x={pt.x - 24} y={0} width={48} height={chartH} fill="transparent" />
                    <text
                      x={pt.x}
                      y={chartH + 8}
                      textAnchor="middle"
                      className="fill-slate-500 dark:fill-slate-400 text-[11px] font-mono"
                    >
                      {pt.dayLabel}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Automated Diagnostic Summary Strip */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400">{diagnostics.headline}</p>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {diagnostics.narrativeSummary}
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono tabular-nums shrink-0 pt-1">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Tuntas</span>
              <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                {diagnostics.tuntasCount}
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Dalam Proses</span>
              <span className="text-lg font-bold text-blue-700 dark:text-blue-400">
                {diagnostics.prosesCount}
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Pendampingan</span>
              <span className="text-lg font-bold text-amber-700 dark:text-amber-400">
                {diagnostics.pendampinganCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* High-Density Student Mastery Data Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Matriks Monitoring Capaian Siswa
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Klik baris siswa untuk inspeksi rincian atau cetak rapor individual
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama atau NIS..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'Semua Status' | MasteryStatus)}
              aria-label="Filter status ketuntasan"
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Semua Status">Semua Status</option>
              <option value="Tuntas">Tuntas (≥ 80)</option>
              <option value="Dalam Proses">Dalam Proses (65–79)</option>
              <option value="Perlu Pendampingan">Perlu Pendampingan (&lt; 65)</option>
            </select>

            <button
              type="button"
              onClick={() =>
                setSortBy((prev) =>
                  prev === 'scoreDesc'
                    ? 'scoreAsc'
                    : prev === 'scoreAsc'
                      ? 'minutesDesc'
                      : prev === 'minutesDesc'
                        ? 'nameAsc'
                        : 'scoreDesc'
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
            >
              <ArrowDownUp className="w-3.5 h-3.5" />
              {sortBy === 'scoreDesc' && 'Skor Tertinggi'}
              {sortBy === 'scoreAsc' && 'Skor Terendah'}
              {sortBy === 'minutesDesc' && 'Durasi Terlama'}
              {sortBy === 'nameAsc' && 'Nama A–Z'}
            </button>
          </div>
        </div>

        {filteredTableStudents.length === 0 ? (
          <div className="p-10 text-center space-y-3">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Tidak ada siswa yang sesuai dengan filter pencarian.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('Semua Status');
                setClassFilter('Semua Kelas');
              }}
              className="px-4 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-50/70 dark:bg-slate-800/40">
                  <th className="py-3 px-4">Nama Siswa</th>
                  <th className="py-3 px-3">Kelas</th>
                  <th className="py-3 px-3 text-right">Dampak Sosial</th>
                  <th className="py-3 px-3 text-right">Computer Sys</th>
                  <th className="py-3 px-3 text-right">Keamanan</th>
                  <th className="py-3 px-3 text-right">Vibe Coding</th>
                  <th className="py-3 px-3 text-right">Rata-Rata</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {filteredTableStudents.map((stu) => {
                  const avg = getStudentAverageScore(stu);
                  const status = getMasteryStatus(avg);
                  return (
                    <tr
                      key={stu.id}
                      onClick={() => onInspectStudent(stu.id)}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                    >
                      <td className="py-2.5 px-4">
                        <p className="font-medium text-slate-900 dark:text-slate-100">{stu.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          NIS {stu.nis} · {getStudentTotalMinutes(stu)} mnt
                        </p>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-xs text-slate-600 dark:text-slate-300">
                        {stu.classGroup}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700 dark:text-slate-300">
                        {stu.modules['dampak-sosial'].score}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700 dark:text-slate-300">
                        {stu.modules['computer-system'].score}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700 dark:text-slate-300">
                        {stu.modules['keamanan-etika'].score}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700 dark:text-slate-300">
                        {stu.modules['vibe-coding'].score}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                        {avg}
                      </td>
                      <td className="py-2.5 px-3 text-xs font-medium whitespace-nowrap">
                        <span
                          className={
                            status === 'Tuntas'
                              ? 'text-emerald-700 dark:text-emerald-400'
                              : status === 'Dalam Proses'
                                ? 'text-blue-700 dark:text-blue-400'
                                : 'text-amber-700 dark:text-amber-400'
                          }
                        >
                          {status}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenReportForStudent(stu.id);
                          }}
                          className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap shrink-0"
                        >
                          Lihat Rapor
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

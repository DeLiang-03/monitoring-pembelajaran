import { useMemo, useState } from 'react';
import { Download, FileSpreadsheet, Printer } from 'lucide-react';
import { LEARNING_MODULES } from '../data/curriculum';
import {
  generateAutomatedDiagnostics,
  getClassOptions,
  getMasteryStatus,
  getStudentAverageCompletion,
  getStudentAverageScore,
  getStudentTotalMinutes
} from '../data/students';
import { ClassGroup, StudentRecord } from '../types';

interface AutomatedReportsWorkspaceProps {
  students: StudentRecord[];
  initialScopeMode: 'class' | 'student';
  initialClassFilter: 'Semua Kelas' | ClassGroup;
  initialStudentId: string;
}

export function AutomatedReportsWorkspace({
  students,
  initialScopeMode,
  initialClassFilter,
  initialStudentId
}: AutomatedReportsWorkspaceProps) {
  const [scopeMode, setScopeMode] = useState<'class' | 'student'>(initialScopeMode);
  const [classFilter, setClassFilter] = useState<'Semua Kelas' | ClassGroup>(initialClassFilter);
  const [studentId, setStudentId] = useState<string>(initialStudentId || students[0]?.id || '');
  const [periodLabel, setPeriodLabel] = useState('Semester Ganjil 2026/2027');
  const [teacherName, setTeacherName] = useState('Salman, S.Kom.');

  const scopedStudents = useMemo(() => {
    if (scopeMode === 'student') {
      const target = students.find((s) => s.id === studentId) ?? students[0];
      return target ? [target] : [];
    }
    if (classFilter === 'Semua Kelas') return students;
    return students.filter((s) => s.classGroup === classFilter);
  }, [students, scopeMode, classFilter, studentId]);

  const targetStudent = scopeMode === 'student' ? scopedStudents[0] : null;
  const scopeTitle =
    scopeMode === 'student' && targetStudent
      ? `${targetStudent.name} (${targetStudent.classGroup})`
      : classFilter;

  const diagnostics = useMemo(
    () => generateAutomatedDiagnostics(scopedStudents, scopeTitle),
    [scopedStudents, scopeTitle]
  );

  const summaryStats = useMemo(() => {
    if (scopedStudents.length === 0) {
      return { avgScore: 0, avgCompletion: 0, totalMinutes: 0 };
    }
    const avgScore = Math.round(
      scopedStudents.reduce((sum, s) => sum + getStudentAverageScore(s), 0) / scopedStudents.length
    );
    const avgCompletion = Math.round(
      scopedStudents.reduce((sum, s) => sum + getStudentAverageCompletion(s), 0) / scopedStudents.length
    );
    const totalMinutes = scopedStudents.reduce((sum, s) => sum + getStudentTotalMinutes(s), 0);
    return { avgScore, avgCompletion, totalMinutes };
  }, [scopedStudents]);

  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  const handleDownloadCsv = () => {
    const escapeCsv = (val: string | number) => {
      const str = String(val);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const headers = [
      'NIS',
      'Nama Siswa',
      'Kelas',
      'Dampak Sosial Informatika',
      'Computer System',
      'Keamanan Data & Etika Digital',
      'Vibe Coding',
      'Rata-Rata Skor',
      'Ketuntasan (%)',
      'Durasi Belajar (Menit)',
      'Status'
    ];

    const rows = scopedStudents.map((stu) => {
      const avg = getStudentAverageScore(stu);
      return [
        stu.nis,
        stu.name,
        stu.classGroup,
        stu.modules['dampak-sosial'].score,
        stu.modules['computer-system'].score,
        stu.modules['keamanan-etika'].score,
        stu.modules['vibe-coding'].score,
        avg,
        getStudentAverageCompletion(stu),
        getStudentTotalMinutes(stu),
        getMasteryStatus(avg)
      ]
        .map(escapeCsv)
        .join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `laporan-informatrack-${scopeTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadMarkdown = () => {
    const lines: string[] = [
      `# Laporan Otomatis Pembelajaran Informatika`,
      `- **Cakupan**: ${scopeTitle}`,
      `- **Periode**: ${periodLabel}`,
      `- **Tanggal Terbit**: ${formattedDate}`,
      `- **Pengampu**: ${teacherName}`,
      ``,
      `## Ringkasan Eksekutif`,
      `- Rata-rata Penguasaan: **${summaryStats.avgScore}/100**`,
      `- Ketuntasan Rangkuman & Praktik: **${summaryStats.avgCompletion}%**`,
      `- Total Durasi Belajar: **${summaryStats.totalMinutes} menit**`,
      ``,
      `## Analisis Diagnostik Otomatis`,
      diagnostics.narrativeSummary,
      ``,
      `## Rekomendasi Tindak Lanjut`,
      ...diagnostics.recommendations.map((r, i) => `${i + 1}. ${r}`),
      ``,
      `## Rincian Nilai per Modul`,
      `| Nama Siswa | Kelas | Dampak Sosial | Computer System | Keamanan & Etika | Vibe Coding | Rata-Rata | Status |`,
      `| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |`,
      ...scopedStudents.map((stu) => {
        const avg = getStudentAverageScore(stu);
        return `| ${stu.name} | ${stu.classGroup} | ${stu.modules['dampak-sosial'].score} | ${stu.modules['computer-system'].score} | ${stu.modules['keamanan-etika'].score} | ${stu.modules['vibe-coding'].score} | ${avg} | ${getMasteryStatus(avg)} |`;
      })
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rapor-informatrack-${scopeTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Control Toolbar (hidden on print) */}
      <div className="no-print space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Pelaporan Otomatis
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Generasi dokumen rapor kelas maupun individu secara otomatis lengkap dengan diagnosis dan ekspor berkas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleDownloadCsv}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Unduh CSV
            </button>

            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              Unduh Markdown
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              Cetak / Simpan PDF
            </button>
          </div>
        </div>

        {/* Report Configuration Panel */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">Jenis Laporan</span>
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <button
                type="button"
                onClick={() => setScopeMode('class')}
                className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  scopeMode === 'class'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Per Kelas
              </button>
              <button
                type="button"
                onClick={() => setScopeMode('student')}
                className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  scopeMode === 'student'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Per Siswa
              </button>
            </div>
          </div>

          <div>
            {scopeMode === 'class' ? (
              <>
                <label htmlFor="rep-class-select" className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                  Target Rombongan Kelas
                </label>
                <select
                  id="rep-class-select"
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value as 'Semua Kelas' | ClassGroup)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  {getClassOptions().map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <>
                <label htmlFor="rep-stu-select" className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                  Pilih Siswa
                </label>
                <select
                  id="rep-stu-select"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.classGroup})
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

          <div>
            <label htmlFor="rep-period" className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">
              Periode Evaluasi
            </label>
            <input
              id="rep-period"
              type="text"
              value={periodLabel}
              onChange={(e) => setPeriodLabel(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label htmlFor="rep-teacher" className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">
              Penanggung Jawab / Guru
            </label>
            <input
              id="rep-teacher"
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>
      </div>

      {/* Live Printable Report Document Sheet */}
      <article className="print-only-container max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 sm:p-10 space-y-8">
        {/* Document Header */}
        <header className="pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-mono text-blue-600 dark:text-blue-400">
              InformaTrack · Sistem Evaluasi Pembelajaran Informatika
            </p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
              {scopeMode === 'student'
                ? 'Laporan Capaian Individu Siswa'
                : 'Laporan Rekapitulasi Pembelajaran Kelas'}
            </h2>
          </div>
          <div className="text-right text-xs text-slate-500 dark:text-slate-400 space-y-0.5 font-mono">
            <p>Cakupan: {scopeTitle}</p>
            <p>Periode: {periodLabel}</p>
            <p>Terbit: {formattedDate}</p>
          </div>
        </header>

        {/* Executive Metrics */}
        <section className="grid grid-cols-3 gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Rata-Rata Penguasaan</p>
            <p className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100 mt-1">
              {summaryStats.avgScore}/100
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Ketuntasan Rangkuman</p>
            <p className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100 mt-1">
              {summaryStats.avgCompletion}%
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Akumulasi Durasi Belajar</p>
            <p className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100 mt-1">
              {summaryStats.totalMinutes} menit
            </p>
          </div>
        </section>

        {/* Automated Diagnostic Narrative */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            1. Ringkasan Diagnostik Otomatis
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {diagnostics.narrativeSummary}
          </p>
        </section>

        {/* Detailed Score Matrix */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            2. Rincian Capaian Empat Modul Kurikulum
          </h3>

          {scopeMode === 'student' && targetStudent ? (
            <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 dark:text-slate-400">
                    <th className="py-2.5 px-4">Modul Materi</th>
                    <th className="py-2.5 px-3 text-right">Sub-Topik</th>
                    <th className="py-2.5 px-3 text-center">Praktik Lab</th>
                    <th className="py-2.5 px-3 text-right">Durasi</th>
                    <th className="py-2.5 px-3 text-right">Skor</th>
                    <th className="py-2.5 px-4">Kriteria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {LEARNING_MODULES.map((mod) => {
                    const m = targetStudent.modules[mod.id];
                    return (
                      <tr key={mod.id}>
                        <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-slate-100">
                          {mod.orderLabel}. {mod.title}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-600 dark:text-slate-300">
                          {m.completedSubTopics.length}/{mod.subTopics.length} ({m.completionPct}%)
                        </td>
                        <td className="py-2.5 px-3 text-center text-xs text-slate-600 dark:text-slate-300">
                          {m.labCompleted ? 'Selesai' : 'Belum'}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-600 dark:text-slate-300">
                          {m.studyMinutes} mnt
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                          {m.score}
                        </td>
                        <td className="py-2.5 px-4 text-xs font-medium text-slate-700 dark:text-slate-300">
                          {getMasteryStatus(m.score)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400">
                    <th className="py-2.5 px-3">Nama Siswa</th>
                    <th className="py-2.5 px-2">Kelas</th>
                    <th className="py-2.5 px-2 text-right">Dampak Sosial</th>
                    <th className="py-2.5 px-2 text-right">Computer Sys</th>
                    <th className="py-2.5 px-2 text-right">Keamanan</th>
                    <th className="py-2.5 px-2 text-right">Vibe Coding</th>
                    <th className="py-2.5 px-2 text-right">Rata-Rata</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {scopedStudents.map((stu) => {
                    const avg = getStudentAverageScore(stu);
                    return (
                      <tr key={stu.id}>
                        <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-100">{stu.name}</td>
                        <td className="py-2 px-2 font-mono text-slate-600 dark:text-slate-300">{stu.classGroup}</td>
                        <td className="py-2 px-2 text-right font-mono tabular-nums">
                          {stu.modules['dampak-sosial'].score}
                        </td>
                        <td className="py-2 px-2 text-right font-mono tabular-nums">
                          {stu.modules['computer-system'].score}
                        </td>
                        <td className="py-2 px-2 text-right font-mono tabular-nums">
                          {stu.modules['keamanan-etika'].score}
                        </td>
                        <td className="py-2 px-2 text-right font-mono tabular-nums">
                          {stu.modules['vibe-coding'].score}
                        </td>
                        <td className="py-2 px-2 text-right font-mono font-semibold tabular-nums">{avg}</td>
                        <td className="py-2 px-3">{getMasteryStatus(avg)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Recommendations */}
        <section className="space-y-2.5">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            3. Rekomendasi Tindak Lanjut Pedagogis
          </h3>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
            {diagnostics.recommendations.map((rec, i) => (
              <li key={i} className="leading-relaxed">
                {rec}
              </li>
            ))}
          </ol>
        </section>

        {/* Sign-Off Block */}
        <footer className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-end justify-between text-xs text-slate-500 dark:text-slate-400">
          <div>
            <p>Dokumen disusun otomatis berdasarkan rekaman pembelajaran sistem.</p>
            <p className="font-mono mt-1">InformaTrack · Kurikulum Informatika</p>
          </div>
          <div className="text-right">
            <p>Guru Pengampu Informatika,</p>
            <p className="font-semibold text-slate-900 dark:text-slate-100 mt-8">{teacherName}</p>
          </div>
        </footer>
      </article>
    </div>
  );
}

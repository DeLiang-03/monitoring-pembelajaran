import { ActivityEvent, ClassGroup, DailyEngagement, MasteryStatus, ModuleId, StudentRecord } from '../types';
import { LEARNING_MODULES } from './curriculum';

export const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: 'stu-01',
    name: 'Nadia Kusuma Wardani',
    nis: '20260801',
    classGroup: 'VIII-A',
    lastActive: 'Hari ini · 09:42',
    modules: {
      'dampak-sosial': {
        score: 94,
        completionPct: 100,
        completedSubTopics: ['dsi-1', 'dsi-2', 'dsi-3', 'dsi-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 52,
        lastUpdated: '2026-11-22'
      },
      'computer-system': {
        score: 88,
        completionPct: 100,
        completedSubTopics: ['cs-1', 'cs-2', 'cs-3', 'cs-4'],
        labCompleted: true,
        quizAttempts: 2,
        studyMinutes: 64,
        lastUpdated: '2026-11-21'
      },
      'keamanan-etika': {
        score: 92,
        completionPct: 100,
        completedSubTopics: ['ke-1', 'ke-2', 'ke-3', 'ke-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 48,
        lastUpdated: '2026-11-22'
      },
      'vibe-coding': {
        score: 90,
        completionPct: 100,
        completedSubTopics: ['vc-1', 'vc-2', 'vc-3', 'vc-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 61,
        lastUpdated: '2026-11-22'
      }
    }
  },
  {
    id: 'stu-02',
    name: 'Rafi Pratama Putra',
    nis: '20260802',
    classGroup: 'VIII-A',
    lastActive: 'Hari ini · 08:15',
    modules: {
      'dampak-sosial': {
        score: 84,
        completionPct: 100,
        completedSubTopics: ['dsi-1', 'dsi-2', 'dsi-3', 'dsi-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 44,
        lastUpdated: '2026-11-20'
      },
      'computer-system': {
        score: 76,
        completionPct: 75,
        completedSubTopics: ['cs-1', 'cs-2', 'cs-3'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 41,
        lastUpdated: '2026-11-21'
      },
      'keamanan-etika': {
        score: 82,
        completionPct: 100,
        completedSubTopics: ['ke-1', 'ke-2', 'ke-3', 'ke-4'],
        labCompleted: false,
        quizAttempts: 1,
        studyMinutes: 39,
        lastUpdated: '2026-11-22'
      },
      'vibe-coding': {
        score: 85,
        completionPct: 75,
        completedSubTopics: ['vc-1', 'vc-2', 'vc-3'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 49,
        lastUpdated: '2026-11-22'
      }
    }
  },
  {
    id: 'stu-03',
    name: 'Siti Rahmawati',
    nis: '20260803',
    classGroup: 'VIII-A',
    lastActive: 'Kemarin · 15:20',
    modules: {
      'dampak-sosial': {
        score: 75,
        completionPct: 75,
        completedSubTopics: ['dsi-1', 'dsi-2', 'dsi-3'],
        labCompleted: false,
        quizAttempts: 1,
        studyMinutes: 35,
        lastUpdated: '2026-11-19'
      },
      'computer-system': {
        score: 58,
        completionPct: 50,
        completedSubTopics: ['cs-1', 'cs-2'],
        labCompleted: false,
        quizAttempts: 2,
        studyMinutes: 28,
        lastUpdated: '2026-11-20'
      },
      'keamanan-etika': {
        score: 68,
        completionPct: 75,
        completedSubTopics: ['ke-1', 'ke-2', 'ke-3'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 33,
        lastUpdated: '2026-11-21'
      },
      'vibe-coding': {
        score: 54,
        completionPct: 50,
        completedSubTopics: ['vc-1', 'vc-2'],
        labCompleted: false,
        quizAttempts: 1,
        studyMinutes: 24,
        lastUpdated: '2026-11-21'
      }
    }
  },
  {
    id: 'stu-04',
    name: 'Bagas Wijaya',
    nis: '20260804',
    classGroup: 'VIII-A',
    lastActive: 'Hari ini · 10:05',
    modules: {
      'dampak-sosial': {
        score: 88,
        completionPct: 100,
        completedSubTopics: ['dsi-1', 'dsi-2', 'dsi-3', 'dsi-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 46,
        lastUpdated: '2026-11-21'
      },
      'computer-system': {
        score: 91,
        completionPct: 100,
        completedSubTopics: ['cs-1', 'cs-2', 'cs-3', 'cs-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 58,
        lastUpdated: '2026-11-22'
      },
      'keamanan-etika': {
        score: 85,
        completionPct: 100,
        completedSubTopics: ['ke-1', 'ke-2', 'ke-3', 'ke-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 45,
        lastUpdated: '2026-11-22'
      },
      'vibe-coding': {
        score: 92,
        completionPct: 100,
        completedSubTopics: ['vc-1', 'vc-2', 'vc-3', 'vc-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 63,
        lastUpdated: '2026-11-22'
      }
    }
  },
  {
    id: 'stu-05',
    name: 'Aulia Putri Maharani',
    nis: '20260811',
    classGroup: 'VIII-B',
    lastActive: 'Hari ini · 07:50',
    modules: {
      'dampak-sosial': {
        score: 90,
        completionPct: 100,
        completedSubTopics: ['dsi-1', 'dsi-2', 'dsi-3', 'dsi-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 50,
        lastUpdated: '2026-11-22'
      },
      'computer-system': {
        score: 82,
        completionPct: 100,
        completedSubTopics: ['cs-1', 'cs-2', 'cs-3', 'cs-4'],
        labCompleted: true,
        quizAttempts: 2,
        studyMinutes: 54,
        lastUpdated: '2026-11-21'
      },
      'keamanan-etika': {
        score: 88,
        completionPct: 100,
        completedSubTopics: ['ke-1', 'ke-2', 'ke-3', 'ke-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 47,
        lastUpdated: '2026-11-22'
      },
      'vibe-coding': {
        score: 79,
        completionPct: 75,
        completedSubTopics: ['vc-1', 'vc-2', 'vc-3'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 44,
        lastUpdated: '2026-11-22'
      }
    }
  },
  {
    id: 'stu-06',
    name: 'Dimas Saputra',
    nis: '20260812',
    classGroup: 'VIII-B',
    lastActive: 'Kemarin · 19:10',
    modules: {
      'dampak-sosial': {
        score: 78,
        completionPct: 75,
        completedSubTopics: ['dsi-1', 'dsi-2', 'dsi-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 38,
        lastUpdated: '2026-11-20'
      },
      'computer-system': {
        score: 72,
        completionPct: 75,
        completedSubTopics: ['cs-1', 'cs-2', 'cs-3'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 40,
        lastUpdated: '2026-11-21'
      },
      'keamanan-etika': {
        score: 75,
        completionPct: 75,
        completedSubTopics: ['ke-1', 'ke-2', 'ke-3'],
        labCompleted: false,
        quizAttempts: 1,
        studyMinutes: 34,
        lastUpdated: '2026-11-21'
      },
      'vibe-coding': {
        score: 68,
        completionPct: 50,
        completedSubTopics: ['vc-1', 'vc-2'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 31,
        lastUpdated: '2026-11-21'
      }
    }
  },
  {
    id: 'stu-07',
    name: 'Keisha Azzahra',
    nis: '20260813',
    classGroup: 'VIII-B',
    lastActive: '2 hari lalu · 14:30',
    modules: {
      'dampak-sosial': {
        score: 64,
        completionPct: 50,
        completedSubTopics: ['dsi-1', 'dsi-2'],
        labCompleted: false,
        quizAttempts: 1,
        studyMinutes: 27,
        lastUpdated: '2026-11-19'
      },
      'computer-system': {
        score: 55,
        completionPct: 50,
        completedSubTopics: ['cs-1', 'cs-2'],
        labCompleted: false,
        quizAttempts: 1,
        studyMinutes: 25,
        lastUpdated: '2026-11-20'
      },
      'keamanan-etika': {
        score: 62,
        completionPct: 50,
        completedSubTopics: ['ke-1', 'ke-3'],
        labCompleted: false,
        quizAttempts: 1,
        studyMinutes: 29,
        lastUpdated: '2026-11-20'
      },
      'vibe-coding': {
        score: 52,
        completionPct: 25,
        completedSubTopics: ['vc-1'],
        labCompleted: false,
        quizAttempts: 1,
        studyMinutes: 19,
        lastUpdated: '2026-11-20'
      }
    }
  },
  {
    id: 'stu-08',
    name: 'Fajar Ramadhan',
    nis: '20260814',
    classGroup: 'VIII-B',
    lastActive: 'Hari ini · 09:12',
    modules: {
      'dampak-sosial': {
        score: 82,
        completionPct: 100,
        completedSubTopics: ['dsi-1', 'dsi-2', 'dsi-3', 'dsi-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 43,
        lastUpdated: '2026-11-21'
      },
      'computer-system': {
        score: 86,
        completionPct: 100,
        completedSubTopics: ['cs-1', 'cs-2', 'cs-3', 'cs-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 55,
        lastUpdated: '2026-11-22'
      },
      'keamanan-etika': {
        score: 80,
        completionPct: 75,
        completedSubTopics: ['ke-1', 'ke-2', 'ke-3'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 40,
        lastUpdated: '2026-11-22'
      },
      'vibe-coding': {
        score: 84,
        completionPct: 100,
        completedSubTopics: ['vc-1', 'vc-2', 'vc-3', 'vc-4'],
        labCompleted: true,
        quizAttempts: 2,
        studyMinutes: 57,
        lastUpdated: '2026-11-22'
      }
    }
  },
  {
    id: 'stu-09',
    name: 'Zahra Nabila',
    nis: '20260901',
    classGroup: 'IX-A',
    lastActive: 'Hari ini · 10:18',
    modules: {
      'dampak-sosial': {
        score: 96,
        completionPct: 100,
        completedSubTopics: ['dsi-1', 'dsi-2', 'dsi-3', 'dsi-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 56,
        lastUpdated: '2026-11-22'
      },
      'computer-system': {
        score: 92,
        completionPct: 100,
        completedSubTopics: ['cs-1', 'cs-2', 'cs-3', 'cs-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 62,
        lastUpdated: '2026-11-22'
      },
      'keamanan-etika': {
        score: 95,
        completionPct: 100,
        completedSubTopics: ['ke-1', 'ke-2', 'ke-3', 'ke-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 51,
        lastUpdated: '2026-11-22'
      },
      'vibe-coding': {
        score: 94,
        completionPct: 100,
        completedSubTopics: ['vc-1', 'vc-2', 'vc-3', 'vc-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 66,
        lastUpdated: '2026-11-22'
      }
    }
  },
  {
    id: 'stu-10',
    name: 'Alif Mahendra',
    nis: '20260902',
    classGroup: 'IX-A',
    lastActive: 'Kemarin · 16:40',
    modules: {
      'dampak-sosial': {
        score: 86,
        completionPct: 100,
        completedSubTopics: ['dsi-1', 'dsi-2', 'dsi-3', 'dsi-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 45,
        lastUpdated: '2026-11-20'
      },
      'computer-system': {
        score: 80,
        completionPct: 100,
        completedSubTopics: ['cs-1', 'cs-2', 'cs-3', 'cs-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 49,
        lastUpdated: '2026-11-21'
      },
      'keamanan-etika': {
        score: 78,
        completionPct: 75,
        completedSubTopics: ['ke-1', 'ke-2', 'ke-3'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 37,
        lastUpdated: '2026-11-21'
      },
      'vibe-coding': {
        score: 88,
        completionPct: 100,
        completedSubTopics: ['vc-1', 'vc-2', 'vc-3', 'vc-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 58,
        lastUpdated: '2026-11-21'
      }
    }
  },
  {
    id: 'stu-11',
    name: 'Tiara Puspitasari',
    nis: '20260903',
    classGroup: 'IX-A',
    lastActive: 'Kemarin · 13:05',
    modules: {
      'dampak-sosial': {
        score: 80,
        completionPct: 100,
        completedSubTopics: ['dsi-1', 'dsi-2', 'dsi-3', 'dsi-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 41,
        lastUpdated: '2026-11-20'
      },
      'computer-system': {
        score: 68,
        completionPct: 75,
        completedSubTopics: ['cs-1', 'cs-2', 'cs-3'],
        labCompleted: false,
        quizAttempts: 1,
        studyMinutes: 36,
        lastUpdated: '2026-11-21'
      },
      'keamanan-etika': {
        score: 76,
        completionPct: 75,
        completedSubTopics: ['ke-1', 'ke-2', 'ke-4'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 38,
        lastUpdated: '2026-11-21'
      },
      'vibe-coding': {
        score: 72,
        completionPct: 75,
        completedSubTopics: ['vc-1', 'vc-2', 'vc-3'],
        labCompleted: false,
        quizAttempts: 1,
        studyMinutes: 35,
        lastUpdated: '2026-11-21'
      }
    }
  },
  {
    id: 'stu-12',
    name: 'Ilham Kurniawan',
    nis: '20260904',
    classGroup: 'IX-A',
    lastActive: 'Hari ini · 08:55',
    modules: {
      'dampak-sosial': {
        score: 72,
        completionPct: 75,
        completedSubTopics: ['dsi-1', 'dsi-2', 'dsi-3'],
        labCompleted: true,
        quizAttempts: 1,
        studyMinutes: 34,
        lastUpdated: '2026-11-21'
      },
      'computer-system': {
        score: 62,
        completionPct: 50,
        completedSubTopics: ['cs-1', 'cs-2'],
        labCompleted: false,
        quizAttempts: 2,
        studyMinutes: 29,
        lastUpdated: '2026-11-22'
      },
      'keamanan-etika': {
        score: 66,
        completionPct: 75,
        completedSubTopics: ['ke-1', 'ke-2', 'ke-3'],
        labCompleted: false,
        quizAttempts: 1,
        studyMinutes: 31,
        lastUpdated: '2026-11-22'
      },
      'vibe-coding': {
        score: 58,
        completionPct: 50,
        completedSubTopics: ['vc-1', 'vc-2'],
        labCompleted: false,
        quizAttempts: 1,
        studyMinutes: 26,
        lastUpdated: '2026-11-22'
      }
    }
  }
];

export const INITIAL_ENGAGEMENT: DailyEngagement[] = [
  { dayLabel: 'Sen', studyMinutes: 420, quizzesCompleted: 8, activeStudents: 10 },
  { dayLabel: 'Sel', studyMinutes: 510, quizzesCompleted: 11, activeStudents: 11 },
  { dayLabel: 'Rab', studyMinutes: 485, quizzesCompleted: 9, activeStudents: 10 },
  { dayLabel: 'Kam', studyMinutes: 615, quizzesCompleted: 14, activeStudents: 12 },
  { dayLabel: 'Jum', studyMinutes: 540, quizzesCompleted: 10, activeStudents: 11 },
  { dayLabel: 'Sab', studyMinutes: 390, quizzesCompleted: 7, activeStudents: 8 },
  { dayLabel: 'Min', studyMinutes: 575, quizzesCompleted: 12, activeStudents: 12 }
];

export const INITIAL_ACTIVITIES: ActivityEvent[] = [
  {
    id: 'act-1',
    studentId: 'stu-09',
    studentName: 'Zahra Nabila',
    classGroup: 'IX-A',
    moduleId: 'vibe-coding',
    actionType: 'Evaluasi Kuis',
    detail: 'Menyelesaikan evaluasi modul Vibe Coding dengan skor 94',
    scoreDelta: 94,
    timestamp: '22 Nov · 10:18'
  },
  {
    id: 'act-2',
    studentId: 'stu-04',
    studentName: 'Bagas Wijaya',
    classGroup: 'VIII-A',
    moduleId: 'computer-system',
    actionType: 'Lab Interaktif',
    detail: 'Menuntaskan simulator Fetch-Decode-Execute dan Gerbang Logika',
    timestamp: '22 Nov · 10:05'
  },
  {
    id: 'act-3',
    studentId: 'stu-01',
    studentName: 'Nadia Kusuma Wardani',
    classGroup: 'VIII-A',
    moduleId: 'keamanan-etika',
    actionType: 'Evaluasi Kuis',
    detail: 'Menyelesaikan evaluasi modul Keamanan Data & Etika Digital (92)',
    scoreDelta: 92,
    timestamp: '22 Nov · 09:42'
  },
  {
    id: 'act-4',
    studentId: 'stu-08',
    studentName: 'Fajar Ramadhan',
    classGroup: 'VIII-B',
    moduleId: 'vibe-coding',
    actionType: 'Rangkuman Sub-topik',
    detail: 'Menandai seluruh 4 sub-topik Vibe Coding sebagai dipahami',
    timestamp: '22 Nov · 09:12'
  },
  {
    id: 'act-5',
    studentId: 'stu-12',
    studentName: 'Ilham Kurniawan',
    classGroup: 'IX-A',
    moduleId: 'computer-system',
    actionType: 'Evaluasi Kuis',
    detail: 'Mengulang evaluasi Computer System dengan capaian skor 62',
    scoreDelta: 62,
    timestamp: '22 Nov · 08:55'
  },
  {
    id: 'act-6',
    studentId: 'stu-02',
    studentName: 'Rafi Pratama Putra',
    classGroup: 'VIII-A',
    moduleId: 'keamanan-etika',
    actionType: 'Evaluasi Kuis',
    detail: 'Menyelesaikan evaluasi Keamanan Data dan Etika Digital (82)',
    scoreDelta: 82,
    timestamp: '22 Nov · 08:15'
  }
];

export function getStudentAverageScore(student: StudentRecord): number {
  const scores = Object.values(student.modules).map((m) => m.score);
  return Math.round(scores.reduce((acc, s) => acc + s, 0) / scores.length);
}

export function getStudentAverageCompletion(student: StudentRecord): number {
  const pcts = Object.values(student.modules).map((m) => m.completionPct);
  return Math.round(pcts.reduce((acc, p) => acc + p, 0) / pcts.length);
}

export function getStudentTotalMinutes(student: StudentRecord): number {
  return Object.values(student.modules).reduce((acc, m) => acc + m.studyMinutes, 0);
}

export function getMasteryStatus(score: number): MasteryStatus {
  if (score >= 80) return 'Tuntas';
  if (score >= 65) return 'Dalam Proses';
  return 'Perlu Pendampingan';
}

export function getModuleTitle(moduleId: ModuleId): string {
  return LEARNING_MODULES.find((m) => m.id === moduleId)?.title ?? moduleId;
}

export function getClassOptions(): Array<'Semua Kelas' | ClassGroup> {
  return ['Semua Kelas', 'VIII-A', 'VIII-B', 'IX-A'];
}

export interface DiagnosticInsight {
  headline: string;
  strongestModule: { id: ModuleId; title: string; avgScore: number };
  weakestModule: { id: ModuleId; title: string; avgScore: number };
  tuntasCount: number;
  prosesCount: number;
  pendampinganCount: number;
  narrativeSummary: string;
  recommendations: string[];
}

export function generateAutomatedDiagnostics(students: StudentRecord[], scopeLabel: string): DiagnosticInsight {
  if (students.length === 0) {
    return {
      headline: `Belum ada data siswa pada cakupan ${scopeLabel}`,
      strongestModule: { id: 'dampak-sosial', title: 'Dampak Sosial Informatika', avgScore: 0 },
      weakestModule: { id: 'vibe-coding', title: 'Vibe Coding', avgScore: 0 },
      tuntasCount: 0,
      prosesCount: 0,
      pendampinganCount: 0,
      narrativeSummary: 'Tambahkan data siswa atau ubah filter kelas untuk menghasilkan analisis pembelajaran otomatis.',
      recommendations: ['Pilih cakupan kelas lain atau catat entri pembelajaran siswa pertama.']
    };
  }

  const moduleAverages = LEARNING_MODULES.map((mod) => {
    const avg = Math.round(
      students.reduce((sum, stu) => sum + stu.modules[mod.id].score, 0) / students.length
    );
    return { id: mod.id, title: mod.title, avgScore: avg };
  });

  const sortedByScore = [...moduleAverages].sort((a, b) => b.avgScore - a.avgScore);
  const strongestModule = sortedByScore[0];
  const weakestModule = sortedByScore[sortedByScore.length - 1];

  let tuntasCount = 0;
  let prosesCount = 0;
  let pendampinganCount = 0;

  const strugglingStudents: string[] = [];

  students.forEach((stu) => {
    const avg = getStudentAverageScore(stu);
    const status = getMasteryStatus(avg);
    if (status === 'Tuntas') tuntasCount += 1;
    else if (status === 'Dalam Proses') prosesCount += 1;
    else {
      pendampinganCount += 1;
      strugglingStudents.push(stu.name);
    }
  });

  const overallAvg = Math.round(
    students.reduce((sum, s) => sum + getStudentAverageScore(s), 0) / students.length
  );

  const avgCompletion = Math.round(
    students.reduce((sum, s) => sum + getStudentAverageCompletion(s), 0) / students.length
  );

  const narrativeSummary =
    `Pada cakupan ${scopeLabel} (${students.length} siswa terpantau), rata-rata penguasaan materi berada pada angka ${overallAvg}/100 dengan tingkat ketuntasan membaca & praktik sebesar ${avgCompletion}%. ` +
    `Kompetensi tertinggi dicapai pada modul ${strongestModule.title} (rata-rata ${strongestModule.avgScore}), sedangkan topik yang paling memerlukan penguatan adalah ${weakestModule.title} (rata-rata ${weakestModule.avgScore}). ` +
    `Sebanyak ${tuntasCount} siswa telah mencapai kriteria Tuntas (≥ 80), ${prosesCount} siswa berada pada tahap Dalam Proses, dan ${pendampinganCount} siswa memerlukan pendampingan terarah.`;

  const recommendations: string[] = [
    `Fokuskan sesi pendalaman dan praktik lab terbimbing pada modul ${weakestModule.title} untuk menaikkan rata-rata kelas dari ${weakestModule.avgScore} menuju target ≥ 80.`,
    strugglingStudents.length > 0
      ? `Jadwalkan klinik remedial dan evaluasi ulang bagi ${strugglingStudents.join(', ')} yang saat ini berada pada kategori Perlu Pendampingan.`
      : `Seluruh siswa dalam cakupan ini berada di atas ambang dasar; berikan proyek pengayaan lintas modul (misal: merancang aplikasi aman berbasis Vibe Coding).`,
    `Pertahankan momentum belajar pada modul ${strongestModule.title} dengan menugaskan siswa berkategori Tuntas sebagai tutor sebaya.`
  ];

  return {
    headline: `Ringkasan Diagnostik Otomatis · ${scopeLabel}`,
    strongestModule,
    weakestModule,
    tuntasCount,
    prosesCount,
    pendampinganCount,
    narrativeSummary,
    recommendations
  };
}

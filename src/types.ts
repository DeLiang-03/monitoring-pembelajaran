export type ModuleId = 'dampak-sosial' | 'computer-system' | 'keamanan-etika' | 'vibe-coding';

export type WorkspaceView = 'analytics' | 'modules' | 'monitoring' | 'reports';

export type MasteryStatus = 'Tuntas' | 'Dalam Proses' | 'Perlu Pendampingan';

export type ClassGroup = 'VIII-A' | 'VIII-B' | 'IX-A';

export interface SubTopic {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
  practicalExample: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LearningModule {
  id: ModuleId;
  orderLabel: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  imagePath: string;
  estimatedMinutes: number;
  competencyTarget: string;
  subTopics: SubTopic[];
  quiz: QuizQuestion[];
}

export interface ModuleProgress {
  score: number; // 0 - 100
  completionPct: number; // 0 - 100
  completedSubTopics: string[];
  labCompleted: boolean;
  quizAttempts: number;
  studyMinutes: number;
  lastUpdated: string;
}

export interface StudentRecord {
  id: string;
  name: string;
  nis: string;
  classGroup: ClassGroup;
  modules: Record<ModuleId, ModuleProgress>;
  lastActive: string;
}

export interface ActivityEvent {
  id: string;
  studentId: string;
  studentName: string;
  classGroup: ClassGroup;
  moduleId: ModuleId;
  actionType: 'Evaluasi Kuis' | 'Rangkuman Sub-topik' | 'Lab Interaktif' | 'Pembaruan Guru';
  detail: string;
  scoreDelta?: number;
  timestamp: string;
}

export interface DailyEngagement {
  dayLabel: string;
  studyMinutes: number;
  quizzesCompleted: number;
  activeStudents: number;
}

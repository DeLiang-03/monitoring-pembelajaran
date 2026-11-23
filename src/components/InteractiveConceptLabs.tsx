import { useMemo, useState } from 'react';
import { CheckCircle2, Play, RotateCcw, Lock, Unlock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ModuleId } from '../types';

interface InteractiveConceptLabProps {
  moduleId: ModuleId;
  isCompleted: boolean;
  onCompleteLab: (moduleId: ModuleId) => void;
}

export function InteractiveConceptLab({ moduleId, isCompleted, onCompleteLab }: InteractiveConceptLabProps) {
  return (
    <section className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
            Laboratorium Konsep Interaktif
          </p>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
            {moduleId === 'dampak-sosial' && 'Simulasi Keseimbangan Adopsi Teknologi & Etika'}
            {moduleId === 'computer-system' && 'Simulator Siklus CPU & Gerbang Logika Biner'}
            {moduleId === 'keamanan-etika' && 'Uji Ketahanan Kata Sandi & Enkripsi Caesar'}
            {moduleId === 'vibe-coding' && 'Workbench Spesifikasi Prompt & Kualitas Arsitektur'}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => onCompleteLab(moduleId)}
          className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            isCompleted
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          {isCompleted ? 'Praktik Lab Selesai' : 'Tandai Lab Selesai'}
        </button>
      </div>

      <div className="pt-5">
        {moduleId === 'dampak-sosial' && <SocialImpactLab />}
        {moduleId === 'computer-system' && <ComputerSystemLab />}
        {moduleId === 'keamanan-etika' && <SecurityLab />}
        {moduleId === 'vibe-coding' && <VibeCodingLab />}
      </div>
    </section>
  );
}

function SocialImpactLab() {
  const [automation, setAutomation] = useState(65);
  const [transparency, setTransparency] = useState(55);
  const [infrastructure, setInfrastructure] = useState(50);

  const productivity = Math.round(automation * 0.6 + infrastructure * 0.4);
  const fairness = Math.round(transparency * 0.55 + infrastructure * 0.45 - Math.max(0, automation - transparency) * 0.25);
  const clampedFairness = Math.max(10, Math.min(100, fairness));
  const digitalDivideRisk = Math.max(5, Math.min(95, Math.round(100 - infrastructure * 0.7 - transparency * 0.2)));

  const statusText =
    clampedFairness >= 70 && digitalDivideRisk <= 40
      ? 'Seimbang — Otomasi terkelola dengan pemerataan akses dan audit algoritma.'
      : digitalDivideRisk > 55
        ? 'Risiko Kesenjangan Tinggi — Percepat pemerataan infrastruktur dan literasi digital.'
        : 'Perlu Audit Transparansi — Otomasi tinggi tanpa transparansi memicu bias keputusan.';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-6 space-y-5">
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <label htmlFor="slider-automation" className="font-medium text-slate-700 dark:text-slate-200">
              Tingkat Otomasi & AI
            </label>
            <span className="font-mono tabular-nums text-xs text-slate-600 dark:text-slate-400">
              {automation}%
            </span>
          </div>
          <input
            id="slider-automation"
            type="range"
            min={10}
            max={100}
            value={automation}
            onChange={(e) => setAutomation(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <label htmlFor="slider-transparency" className="font-medium text-slate-700 dark:text-slate-200">
              Transparansi & Audit Algoritma
            </label>
            <span className="font-mono tabular-nums text-xs text-slate-600 dark:text-slate-400">
              {transparency}%
            </span>
          </div>
          <input
            id="slider-transparency"
            type="range"
            min={10}
            max={100}
            value={transparency}
            onChange={(e) => setTransparency(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <label htmlFor="slider-infra" className="font-medium text-slate-700 dark:text-slate-200">
              Pemerataan Akses & Literasi
            </label>
            <span className="font-mono tabular-nums text-xs text-slate-600 dark:text-slate-400">
              {infrastructure}%
            </span>
          </div>
          <input
            id="slider-infra"
            type="range"
            min={10}
            max={100}
            value={infrastructure}
            onChange={(e) => setInfrastructure(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>
      </div>

      <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-lg p-5 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Produktivitas</p>
            <p className="text-2xl font-semibold font-mono tabular-nums text-slate-900 dark:text-slate-100 mt-1">
              {productivity}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Keadilan Etis</p>
            <p className="text-2xl font-semibold font-mono tabular-nums text-emerald-700 dark:text-emerald-400 mt-1">
              {clampedFairness}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Risiko Jurang Digital</p>
            <p className="text-2xl font-semibold font-mono tabular-nums text-amber-700 dark:text-amber-400 mt-1">
              {digitalDivideRisk}%
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Hasil Analisis Kebijakan</p>
          <p className="text-sm text-slate-800 dark:text-slate-200 mt-1 leading-relaxed">{statusText}</p>
        </div>
      </div>
    </div>
  );
}

const CPU_STEPS = [
  {
    phase: '1. Fetch',
    pc: '0x0010',
    ir: 'LOAD R1, [5]',
    alu: 'Siaga',
    acc: '0',
    note: 'Control Unit membaca alamat instruksi dari Program Counter (0x0010) lalu mengambil instruksi LOAD dari RAM.'
  },
  {
    phase: '2. Decode',
    pc: '0x0014',
    ir: 'ADD R1, #7',
    alu: 'Dekode Operasi Penjumlahan',
    acc: '5',
    note: 'Control Unit menerjemahkan opcode ADD dan menyiapkan nilai awal 5 ke dalam Register.'
  },
  {
    phase: '3. Execute',
    pc: '0x0014',
    ir: 'ADD R1, #7',
    alu: '5 + 7 = 12',
    acc: '12',
    note: 'ALU menjalankan operasi penjumlahan biner antara 5 dan 7 menghasilkan nilai 12 di Accumulator.'
  },
  {
    phase: '4. Store',
    pc: '0x0018',
    ir: 'STORE [0x0200], R1',
    alu: 'Selesai',
    acc: '12',
    note: 'Hasil 12 ditulis kembali ke alamat memori RAM 0x0200 dan Program Counter maju ke instruksi berikutnya.'
  }
];

function ComputerSystemLab() {
  const [stepIdx, setStepIdx] = useState(0);
  const [gateType, setGateType] = useState<'AND' | 'OR' | 'XOR' | 'NAND'>('AND');
  const [inputA, setInputA] = useState<0 | 1>(1);
  const [inputB, setInputB] = useState<0 | 1>(0);

  const currentStep = CPU_STEPS[stepIdx];

  const gateOutput = useMemo(() => {
    switch (gateType) {
      case 'AND':
        return inputA & inputB;
      case 'OR':
        return inputA | inputB;
      case 'XOR':
        return inputA ^ inputB;
      case 'NAND':
        return inputA & inputB ? 0 : 1;
    }
  }, [gateType, inputA, inputB]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-lg p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Siklus Instruksi Von Neumann</p>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{currentStep.phase}</h4>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setStepIdx((prev) => (prev + 1) % CPU_STEPS.length)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0"
            >
              <Play className="w-3.5 h-3.5" />
              Langkah Berikutnya
            </button>
            <button
              type="button"
              onClick={() => setStepIdx(0)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Program Counter</p>
            <p className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-100 mt-1 tabular-nums">
              {currentStep.pc}
            </p>
          </div>
          <div className="p-3 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Instruction Reg</p>
            <p className="font-mono text-xs font-semibold text-blue-700 dark:text-blue-400 mt-1 truncate">
              {currentStep.ir}
            </p>
          </div>
          <div className="p-3 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Status ALU</p>
            <p className="font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 mt-1 truncate">
              {currentStep.alu}
            </p>
          </div>
          <div className="p-3 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Accumulator</p>
            <p className="font-mono text-sm font-semibold text-emerald-700 dark:text-emerald-400 mt-1 tabular-nums">
              {currentStep.acc}
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{currentStep.note}</p>
      </div>

      <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-lg p-5 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Penguji Gerbang Logika</p>
          <div className="flex items-center gap-1 p-0.5 bg-slate-200/70 dark:bg-slate-900 rounded-md">
            {(['AND', 'OR', 'XOR', 'NAND'] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGateType(g)}
                className={`px-2.5 py-1 text-xs font-mono font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                  gateType === g
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-2">
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setInputA(inputA === 1 ? 0 : 1)}
              className="flex items-center justify-between w-32 px-3 py-2 text-xs font-mono rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:border-blue-500"
            >
              <span>Input A</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">{inputA}</span>
            </button>
            <button
              type="button"
              onClick={() => setInputB(inputB === 1 ? 0 : 1)}
              className="flex items-center justify-between w-32 px-3 py-2 text-xs font-mono rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:border-blue-500"
            >
              <span>Input B</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">{inputB}</span>
            </button>
          </div>

          <div className="text-center px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 min-w-[110px]">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Output {gateType}</p>
            <p
              className={`text-2xl font-mono font-bold tabular-nums mt-0.5 ${
                gateOutput === 1 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {gateOutput}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {gateOutput === 1 ? 'HIGH (True)' : 'LOW (False)'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecurityLab() {
  const [passwordSample, setPasswordSample] = useState('Belajar#2026!');
  const [plainText, setPlainText] = useState('INFORMATIKA AMAN');
  const [shift, setShift] = useState(3);

  const passwordMetrics = useMemo(() => {
    const len = passwordSample.length;
    const hasLower = /[a-z]/.test(passwordSample);
    const hasUpper = /[A-Z]/.test(passwordSample);
    const hasDigit = /[0-9]/.test(passwordSample);
    const hasSymbol = /[^a-zA-Z0-9]/.test(passwordSample);

    let charset = 0;
    if (hasLower) charset += 26;
    if (hasUpper) charset += 26;
    if (hasDigit) charset += 10;
    if (hasSymbol) charset += 32;

    const entropy = len > 0 && charset > 0 ? Math.round(len * Math.log2(charset)) : 0;
    const rating =
      entropy >= 70
        ? { label: 'Kuat (Tahan Brute-Force)', color: 'text-emerald-700 dark:text-emerald-400' }
        : entropy >= 45
          ? { label: 'Sedang (Tambahkan Panjang/Simbol)', color: 'text-amber-700 dark:text-amber-400' }
          : { label: 'Lemah (Mudah Ditebak)', color: 'text-rose-700 dark:text-rose-400' };

    return { entropy, rating, hasLower, hasUpper, hasDigit, hasSymbol };
  }, [passwordSample]);

  const cipherText = useMemo(() => {
    return plainText
      .toUpperCase()
      .split('')
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + shift) % 26) + 65);
        }
        return char;
      })
      .join('');
  }, [plainText, shift]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-lg p-5 space-y-4">
        <div>
          <label htmlFor="pwd-test" className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
            Uji Entropi Kata Sandi (Simulasi Lokal)
          </label>
          <input
            id="pwd-test"
            type="text"
            value={passwordSample}
            onChange={(e) => setPasswordSample(e.target.value)}
            placeholder="Ketik contoh frasa sandi..."
            className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <span className={`font-semibold inline-flex items-center gap-1.5 ${passwordMetrics.rating.color}`}>
            {passwordMetrics.entropy >= 70 ? (
              <ShieldCheck className="w-4 h-4" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
            {passwordMetrics.rating.label}
          </span>
          <span className="font-mono tabular-nums text-slate-600 dark:text-slate-400">
            Entropi: {passwordMetrics.entropy} bit
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-700">
          <span>Huruf kecil: {passwordMetrics.hasLower ? 'Ada' : 'Belum'}</span>
          <span>Huruf kapital: {passwordMetrics.hasUpper ? 'Ada' : 'Belum'}</span>
          <span>Angka numerik: {passwordMetrics.hasDigit ? 'Ada' : 'Belum'}</span>
          <span>Karakter simbol: {passwordMetrics.hasSymbol ? 'Ada' : 'Belum'}</span>
        </div>
      </div>

      <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-lg p-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="caesar-input" className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Simulasi Enkripsi Substitusi (Shift Cipher)
          </label>
          <span className="font-mono tabular-nums text-xs text-blue-600 dark:text-blue-400">
            Kunci Geser: +{shift}
          </span>
        </div>

        <input
          id="caesar-input"
          type="text"
          value={plainText}
          onChange={(e) => setPlainText(e.target.value)}
          className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="range"
          min={1}
          max={25}
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
          aria-label="Kunci geser enkripsi"
          className="w-full accent-blue-600 cursor-pointer"
        />

        <div className="p-3 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Ciphertext Tersandi
            </p>
            <p className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-100 truncate mt-0.5">
              {cipherText || '(kosong)'}
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 inline-flex items-center gap-1 shrink-0">
            <Unlock className="w-3 h-3" /> Dekripsi: -{shift}
          </span>
        </div>
      </div>
    </div>
  );
}

function VibeCodingLab() {
  const [checks, setChecks] = useState({
    goal: true,
    schema: true,
    validation: false,
    security: false
  });

  const activeCount = Object.values(checks).filter(Boolean).length;
  const qualityScore = activeCount * 25;

  const toggle = (key: keyof typeof checks) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const generatedSpec = [
    checks.goal ? 'Tujuan: Buat modul pelaporan nilai siswa per kelas untuk guru SMP.' : '',
    checks.schema ? 'Struktur Data: StudentRecord { id, name, classGroup, modules[4] }.' : '',
    checks.validation ? 'Validasi & Edge Case: Tangani daftar kosong, skor 0–100, dan escape koma pada ekspor CSV.' : '',
    checks.security ? 'Keamanan: Jangan simpan kredensial di klien; sanitasi input pencarian.' : ''
  ]
    .filter(Boolean)
    .join('\n');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-6 space-y-3">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Aktifkan elemen spesifikasi prompt untuk melihat dampaknya terhadap keandalan kode:
        </p>

        {[
          { key: 'goal' as const, label: '1. Tujuan Fungsional & Pengguna Target' },
          { key: 'schema' as const, label: '2. Skema Model Data & Tipe TypeScript' },
          { key: 'validation' as const, label: '3. Penanganan Edge Case & Validasi Input' },
          { key: 'security' as const, label: '4. Batasan Keamanan & Privasi Klien/Server' }
        ].map((item) => (
          <label
            key={item.key}
            className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:border-blue-400 transition-colors"
          >
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{item.label}</span>
            <input
              type="checkbox"
              checked={checks[item.key]}
              onChange={() => toggle(item.key)}
              className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
            />
          </label>
        ))}
      </div>

      <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-lg p-5 flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Pratinjau Spesifikasi Prompt</span>
            <span
              className={`text-xs font-mono font-semibold tabular-nums ${
                qualityScore >= 75
                  ? 'text-emerald-700 dark:text-emerald-400'
                  : qualityScore >= 50
                    ? 'text-amber-700 dark:text-amber-400'
                    : 'text-rose-700 dark:text-rose-400'
              }`}
            >
              Presisi Spesifikasi: {qualityScore}%
            </span>
          </div>
          <pre className="p-3 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed min-h-[116px]">
            {generatedSpec || 'Belum ada spesifikasi terpilih — hasil kode berisiko ambigu.'}
          </pre>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300">
          {qualityScore === 100
            ? 'Spesifikasi siap pakai: AI memahami kontrak data, kasus batas, dan keamanan sebelum menulis kode.'
            : 'Tambahkan komponen validasi dan keamanan agar kode yang dihasilkan tidak rentan bug logika.'}
        </p>
      </div>
    </div>
  );
}

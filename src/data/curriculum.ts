import { LearningModule } from '../types';

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'dampak-sosial',
    orderLabel: '01',
    title: 'Dampak Sosial Informatika',
    shortTitle: 'Dampak Sosial',
    subtitle: 'Transformasi masyarakat digital, etika kecerdasan buatan, hak kekayaan intelektual, dan literasi informasi.',
    imagePath: '/src/assets/images/module_dampak_sosial_1795414293296.jpg',
    estimatedMinutes: 45,
    competencyTarget: 'Menganalisis implikasi sosial, ekonomi, hukum, dan etika dari adopsi teknologi informatika modern.',
    subTopics: [
      {
        id: 'dsi-1',
        title: 'Transformasi Digital & Kesenjangan Akses (Digital Divide)',
        summary:
          'Digitalisasi mempercepat layanan publik, pendidikan, dan ekonomi, namun ketimpangan infrastruktur internet dan literasi digital menciptakan jurang peluang antarwilayah.',
        keyPoints: [
          'Kesenjangan digital meliputi tiga lapis: akses perangkat/internet, kemampuan teknis, dan pemanfaatan produktif.',
          'Kolaborasi sektor pendidikan dan pemerintah diperlukan untuk menyediakan akses inklusif di daerah terpencil.',
          'Desain aplikasi ringan dan ramah aksesibilitas membantu menjangkau pengguna dengan perangkat terbatas.'
        ],
        practicalExample: 'Platform pembelajaran daring yang menyediakan mode hemat kuota serta akses materi luring bagi siswa di daerah sinyal lemah.'
      },
      {
        id: 'dsi-2',
        title: 'Etika Kecerdasan Buatan, Bias Algoritma & Otomasi',
        summary:
          'Sistem AI dan algoritma rekomendasi belajar dari data historis manusia. Jika data latih tidak seimbang, keputusan otomatis berpotensi mereplikasi bias sosial.',
        keyPoints: [
          'Transparansi algoritma (explainability) penting agar pengguna memahami alasan di balik rekomendasi atau keputusan sistem.',
          'Otomasi menggeser peran pekerjaan repetitif menuju peran pengawasan sistem, analisis kritis, dan kreativitas.',
          'Pengembang perangkat lunak bertanggung jawab melakukan audit keadilan (fairness audit) pada data latih.'
        ],
        practicalExample: 'Sistem seleksi beasiswa otomatis harus diaudit agar tidak mendiskriminasi pelamar berdasarkan kode pos atau asal sekolah.'
      },
      {
        id: 'dsi-3',
        title: 'Hak Kekayaan Intelektual (HKI) & Regulasi Digital',
        summary:
          'Karya perangkat lunak, kode sumber, desain, dan konten digital dilindungi hukum hak cipta. Pembuat aplikasi wajib menghormati lisensi sumber terbuka maupun komersial.',
        keyPoints: [
          'Lisensi Open Source (MIT, Apache 2.0, GPL) mengatur kebebasan memakai, memodifikasi, dan mendistribusikan ulang kode.',
          'Creative Commons (CC-BY, CC-NC) memberi kerangka jelas untuk penggunaan materi edukasi dan media digital.',
          'UU ITE dan UU Perlindungan Data Pribadi (UU PDP) mengatur batas etis dan sanksi penyalahgunaan informasi digital.'
        ],
        practicalExample: 'Mencantumkan atribusi penulis asli saat menggunakan pustaka grafik atau ikon berlisensi CC-BY 4.0 dalam proyek sekolah.'
      },
      {
        id: 'dsi-4',
        title: 'Literasi Media & Verifikasi Informasi',
        summary:
          'Arus informasi cepat di media sosial memudahkan penyebaran disinformasi dan misinformasi. Sikap skeptis terstruktur diperlukan sebelum membagikan berita.',
        keyPoints: [
          'Terapkan metode SIFT: Stop, Investigate the source, Find better coverage, Trace claims to the original context.',
          'Algoritma media sosial cenderung memperkuat ruang gema (echo chamber) melalui konten yang memicu emosi.',
          'Verifikasi metadata gambar, tanggal publikasi, dan kredibilitas domain sebelum mengutip sumber.'
        ],
        practicalExample: 'Memeriksa situs resmi instansi atau portal cek fakta sebelum meneruskan pesan berantai mengenai jadwal libur atau beasiswa.'
      }
    ],
    quiz: [
      {
        id: 'dsi-q1',
        question: 'Apa penyebab utama munculnya bias pada sistem kecerdasan buatan yang digunakan dalam pengambilan keputusan?',
        options: [
          'Kecepatan prosesor server yang terlalu rendah',
          'Data latih historis yang tidak seimbang atau mengandung prasangka manusia',
          'Penggunaan bahasa pemrograman berlisensi terbuka',
          'Ukuran layar perangkat pengguna yang berbeda-beda'
        ],
        correctIndex: 1,
        explanation: 'Model AI mempelajari pola dari data latih. Jika data tersebut timpang atau bias, model akan meniru dan memperkuat ketimpangan tersebut.'
      },
      {
        id: 'dsi-q2',
        question: 'Manakah praktik paling tepat saat memanfaatkan kode pustaka berlisensi MIT dalam aplikasi pembelajaran?',
        options: [
          'Menghapus nama pembuat asli agar terlihat seperti karya sendiri',
          'Menyertakan pemberitahuan hak cipta dan teks lisensi asli pada proyek',
          'Membayar biaya royalti tahunan wajib untuk setiap baris kode',
          'Melarang pengguna lain menjalankan aplikasi yang dibuat'
        ],
        correctIndex: 1,
        explanation: 'Lisensi MIT memperbolehkan penggunaan komersial maupun modifikasi dengan syarat mempertahankan pemberitahuan hak cipta dan lisensi asli.'
      },
      {
        id: 'dsi-q3',
        question: 'Langkah pertama dalam kerangka verifikasi informasi SIFT sebelum membagikan berita viral adalah...',
        options: [
          'Langsung menyalin tautan ke grup kelas untuk bertanya',
          'Berhenti sejenak (Stop) dan menahan dorongan membagikan sebelum memeriksa sumber',
          'Membuat tangkapan layar tanpa membaca isi artikel lengkap',
          'Menilai kebenaran berita hanya dari jumlah komentar yang menyetujui'
        ],
        correctIndex: 1,
        explanation: 'Huruf S pada SIFT adalah Stop — berhenti sejenak untuk menilai emosi dan mengecek apakah sumber informasi tersebut kredibel.'
      },
      {
        id: 'dsi-q4',
        question: 'Kesenjangan digital tingkat lanjut tidak hanya soal kepemilikan gawai atau sinyal, melainkan juga...',
        options: [
          'Kapasitas baterai perangkat genggam di perkotaan',
          'Kemampuan memanfaatkan teknologi secara kritis, aman, dan produktif',
          'Jumlah aplikasi gim yang terpasang pada ponsel siswa',
          'Warna tema antarmuka perangkat lunak yang dipilih pengguna'
        ],
        correctIndex: 1,
        explanation: 'Kesenjangan digital mencakup akses fisik, keterampilan operasional, serta literasi pemanfaatan teknologi untuk nilai tambah ekonomi dan pendidikan.'
      }
    ]
  },
  {
    id: 'computer-system',
    orderLabel: '02',
    title: 'Computer System',
    shortTitle: 'Computer System',
    subtitle: 'Arsitektur Von Neumann, hierarki memori, peran sistem operasi, serta representasi biner dan gerbang logika.',
    imagePath: '/src/assets/images/module_computer_system_1795414294060.jpg',
    estimatedMinutes: 50,
    competencyTarget: 'Memahami alur kerja perangkat keras, manajemen memori oleh sistem operasi, dan eksekusi instruksi mesin.',
    subTopics: [
      {
        id: 'cs-1',
        title: 'Arsitektur Von Neumann & Siklus Fetch-Decode-Execute',
        summary:
          'Komputer modern menyimpan data dan instruksi program dalam memori yang sama. Prosesor (CPU) mengeksekusi instruksi melalui siklus berulang secara presisi.',
        keyPoints: [
          'Control Unit (CU) mengambil (Fetch) dan menerjemahkan (Decode) instruksi dari memori menggunakan Program Counter (PC).',
          'Arithmetic Logic Unit (ALU) menjalankan operasi aritmetika (tambah, kurang) dan logika (perbandingan).',
          'Register adalah memori internal tercepat di dalam CPU untuk menyimpan operan sementara.'
        ],
        practicalExample: 'Saat menjalankan operasi `C = A + B`, CU mengambil instruksi penjumlahan, lalu ALU menjumlahkan isi register A dan B dan menyimpan hasilnya.'
      },
      {
        id: 'cs-2',
        title: 'Hierarki Memori: Cache, RAM, ROM & Penyimpanan Sekunder',
        summary:
          'Sistem komputer menyeimbangkan kecepatan akses, kapasitas, dan sifat volatilitas memori melalui struktur berlapis.',
        keyPoints: [
          'CPU Cache (L1/L2/L3) berkapasitas kecil (MB) namun sangat cepat untuk mengurangi jeda akses ke RAM.',
          'RAM bersifat volatile (data hilang saat listrik mati) dan menyimpan proses aktif yang sedang berjalan.',
          'ROM/UEFI menyimpan firmware awal untuk proses booting, sedangkan SSD/HDD menyimpan berkas secara permanen.'
        ],
        practicalExample: 'Membuka banyak tab peramban sekaligus memenuhi kapasitas RAM sehingga sistem memindahkan sebagian data ke virtual memory di SSD yang lebih lambat.'
      },
      {
        id: 'cs-3',
        title: 'Sistem Operasi & Manajemen Sumber Daya',
        summary:
          'Sistem operasi (OS) menjadi jembatan antara perangkat keras dan aplikasi pengguna dengan mengatur penjadwalan CPU, memori, dan perangkat I/O.',
        keyPoints: [
          'Kernel mengatur pembagian waktu CPU (multitasking) melalui algoritma penjadwalan proses.',
          'Device Driver menerjemahkan perintah standar OS ke sinyal spesifik perangkat keras seperti printer atau GPU.',
          'Sistem berkas (File System seperti NTFS, ext4, APFS) mengelola struktur direktori dan izin akses data.'
        ],
        practicalExample: 'Pengguna dapat memutar musik sambil mengetik dokumen dan mengunduh file secara bersamaan karena OS melakukan context switching sangat cepat.'
      },
      {
        id: 'cs-4',
        title: 'Representasi Data Biner & Gerbang Logika',
        summary:
          'Seluruh teks, gambar, suara, dan instruksi di dalam komputer direpresentasikan sebagai kombinasi bit 0 dan 1 yang diproses oleh gerbang logika.',
        keyPoints: [
          '1 Byte terdiri dari 8 bit yang mampu merepresentasikan 256 kombinasi nilai (0 sampai 255).',
          'Gerbang AND menghasilkan 1 hanya jika semua masukan bernilai 1; gerbang OR menghasilkan 1 jika minimal satu masukan bernilai 1.',
          'Gerbang NOT membalik logika masukan, sedangkan XOR menghasilkan 1 jika kedua masukan berbeda.'
        ],
        practicalExample: 'Rangkaian penjumlah biner (Half Adder) di dalam ALU dibangun langsung dari kombinasi gerbang XOR untuk hasil jumlah dan gerbang AND untuk nilai simpanan (carry).'
      }
    ],
    quiz: [
      {
        id: 'cs-q1',
        question: 'Komponen di dalam CPU yang bertugas melakukan perhitungan matematika dan perbandingan logika adalah...',
        options: [
          'Read-Only Memory (ROM)',
          'Arithmetic Logic Unit (ALU)',
          'Solid State Drive (SSD)',
          'Power Supply Unit (PSU)'
        ],
        correctIndex: 1,
        explanation: 'ALU (Arithmetic Logic Unit) merupakan unit eksekusi dalam CPU yang menangani seluruh operasi aritmetika dan logika.'
      },
      {
        id: 'cs-q2',
        question: 'Mengapa data di dalam RAM akan hilang ketika komputer dimatikan secara penuh?',
        options: [
          'Karena RAM memiliki kapasitas lebih kecil dari SSD',
          'Karena RAM bersifat volatile yang membutuhkan aliran daya listrik untuk mempertahankan muatan data',
          'Karena sistem operasi otomatis menghapus semua aplikasi berlisensi',
          'Karena Control Unit memindahkan semua data ke printer'
        ],
        correctIndex: 1,
        explanation: 'RAM adalah memori sementara (volatile) sehingga data hanya bertahan selama arus listrik mengalir; penyimpanan permanen menggunakan SSD/HDD.'
      },
      {
        id: 'cs-q3',
        question: 'Jika masukan A = 1 dan masukan B = 0 pada gerbang logika XOR, berapakah nilai keluarannya?',
        options: [
          '0',
          '1',
          '2',
          'Tidak terdefinisi'
        ],
        correctIndex: 1,
        explanation: 'Gerbang XOR (Exclusive OR) bernilai 1 apabila kedua nilai masukan berbeda (1 dan 0, atau 0 dan 1).'
      },
      {
        id: 'cs-q4',
        question: 'Urutan tahapan siklus eksekusi instruksi mesin yang benar pada CPU adalah...',
        options: [
          'Execute → Fetch → Decode',
          'Decode → Store → Fetch',
          'Fetch → Decode → Execute',
          'Store → Execute → Decode'
        ],
        correctIndex: 2,
        explanation: 'CPU pertama kali mengambil instruksi dari memori (Fetch), menerjemahkannya (Decode), lalu menjalankannya (Execute).'
      }
    ]
  },
  {
    id: 'keamanan-etika',
    orderLabel: '03',
    title: 'Keamanan Data dan Etika Digital',
    shortTitle: 'Keamanan & Etika',
    subtitle: 'Prinsip CIA Triad, kriptografi dasar, pertahanan terhadap phishing, jejak digital, dan etika berinteraksi daring.',
    imagePath: '/src/assets/images/module_keamanan_data_1795414293166.jpg',
    estimatedMinutes: 45,
    competencyTarget: 'Menerapkan perlindungan data pribadi, mengenali pola rekayasa sosial, dan menjaga etika komunikasi digital.',
    subTopics: [
      {
        id: 'ke-1',
        title: 'Prinsip CIA Triad dalam Keamanan Informasi',
        summary:
          'Keamanan data bertumpu pada tiga pilar utama agar informasi tetap aman, akurat, dan dapat digunakan saat dibutuhkan oleh pihak yang berhak.',
        keyPoints: [
          'Confidentiality (Kerahasiaan): Memastikan data hanya diakses oleh pengguna berwenang melalui enkripsi dan kontrol akses.',
          'Integrity (Integritas): Menjamin data tidak diubah atau dirusak tanpa izin selama penyimpanan maupun pengiriman.',
          'Availability (Ketersediaan): Menjaga sistem dan layanan tetap dapat diakses kapan pun pengguna membutuhkannya.'
        ],
        practicalExample: 'Sistem rapor sekolah menggunakan enkripsi HTTPS (Confidentiality), checksum/audit log nilai (Integrity), dan cadangan server rutin (Availability).'
      },
      {
        id: 'ke-2',
        title: 'Kriptografi Dasar: Enkripsi & Hashing Kata Sandi',
        summary:
          'Enkripsi mengubah teks terang (plaintext) menjadi teks sandi (ciphertext) yang dapat dibuka kembali dengan kunci, sedangkan hashing bersifat satu arah.',
        keyPoints: [
          'Enkripsi simetris menggunakan satu kunci rahasia yang sama untuk mengenkripsi dan mendekripsi (misal AES).',
          'Enkripsi asimetris menggunakan pasangan kunci publik dan kunci privat (misal RSA / TLS sertifikat web).',
          'Kata sandi di basis data tidak boleh disimpan sebagai teks biasa, melainkan harus di-hash dengan salt (seperti bcrypt/Argon2).'
        ],
        practicalExample: 'Ikon gembok HTTPS pada peramban menandakan komunikasi antara browser dan server dilindungi enkripsi TLS.'
      },
      {
        id: 'ke-3',
        title: 'Pertahanan Terhadap Phishing & Autentikasi Multi-Faktor',
        summary:
          'Sebagian besar insiden peretasan berawal dari manipulasi psikologis (social engineering) untuk mencuri kredensial pengguna.',
        keyPoints: [
          'Kenali ciri phishing: alamat domain mirip tetapi salah eja (typosquatting), nada mendesak, dan permintaan kode OTP.',
          'Gunakan kombinasi kata sandi panjang dan unik (passphrase) serta pengelola kata sandi.',
          'Aktifkan Autentikasi Dua Faktor (2FA) berbasis aplikasi autentikator atau kunci keamanan fisik.'
        ],
        practicalExample: 'Memeriksa alamat URL pengirim email resmi `akun.belajar.id` dan menolak memasukkan kata sandi pada tautan domain mencurigakan.'
      },
      {
        id: 'ke-4',
        title: 'Jejak Digital, Privasi & Etika Komunikasi (Netiket)',
        summary:
          'Setiap unggahan, komentar, dan riwayat akses meninggalkan jejak digital permanen yang membentuk reputasi seseorang di masa depan.',
        keyPoints: [
          'Bedakan jejak digital aktif (unggahan sadar) dan jejak digital pasif (cookie pelacakan, lokasi IP).',
          'Terapkan prinsip minimisasi data: hanya bagikan data pribadi seperlunya dan tinjau izin aplikasi secara berkala.',
          'Junjung netiket: hindari doxxing, perundungan siber (cyberbullying), dan hormati privasi orang lain sebelum mengunggah foto.'
        ],
        practicalExample: 'Menonaktifkan izin akses lokasi latar belakang untuk aplikasi penyunting gambar yang tidak memerlukan data GPS.'
      }
    ],
    quiz: [
      {
        id: 'ke-q1',
        question: 'Pilar CIA Triad yang memastikan nilai rapor siswa tidak dapat diubah secara diam-diam oleh pihak yang tidak berhak adalah...',
        options: [
          'Availability',
          'Integrity',
          'Portability',
          'Scalability'
        ],
        correctIndex: 1,
        explanation: 'Integrity (Integritas) berfokus pada menjaga keaslian, konsistensi, dan keakuratan data dari modifikasi tidak sah.'
      },
      {
        id: 'ke-q2',
        question: 'Mengapa sistem aplikasi modern menyimpan kata sandi dalam bentuk hash (disertai salt) alih-alih teks biasa?',
        options: [
          'Agar ukuran basis data menjadi jauh lebih besar',
          'Karena hashing bersifat satu arah sehingga kata sandi asli tidak terbaca jika basis data bocor',
          'Supaya admin aplikasi bisa melihat dan mengingatkan kata sandi pengguna',
          'Agar pengguna tidak perlu mengetik kata sandi saat masuk'
        ],
        correctIndex: 1,
        explanation: 'Fungsi hash kriptografis tidak dapat dibalik menjadi teks asli, sehingga kebocoran basis data tidak langsung mengungkap sandi pengguna.'
      },
      {
        id: 'ke-q3',
        question: 'Sebuah pesan mengatasnamakan bank meminta Anda mengeklik tautan dalam 10 menit dan memasukkan kode OTP agar akun tidak diblokir. Tindakan ini adalah...',
        options: [
          'Pembaruan sistem operasi otomatis',
          'Serangan Phishing berbasis rekayasa sosial (Social Engineering)',
          'Enkripsi asimetris dua arah',
          'Pencadangan awan terjadwal'
        ],
        correctIndex: 1,
        explanation: 'Rasa mendesak buatan, tautan mencurigakan, dan permintaan OTP adalah indikator klasik serangan phishing.'
      },
      {
        id: 'ke-q4',
        question: 'Contoh jejak digital pasif saat seseorang berselancar di internet adalah...',
        options: [
          'Menulis artikel blog dan menerbitkannya',
          'Mengunggah foto kegiatan kelas ke media sosial',
          'Riwayat alamat IP dan cookie pelacakan yang terekam otomatis oleh situs web',
          'Mengirim email tugas ke guru informatika'
        ],
        correctIndex: 2,
        explanation: 'Jejak digital pasif dikumpulkan di latar belakang tanpa tindakan unggah eksplisit oleh pengguna, seperti IP dan cookie.'
      }
    ]
  },
  {
    id: 'vibe-coding',
    orderLabel: '04',
    title: 'Vibe Coding',
    shortTitle: 'Vibe Coding',
    subtitle: 'Orkestrasi pengembangan perangkat lunak berbasis niat, perancangan spesifikasi, iterasi modular, dan verifikasi manusia.',
    imagePath: '/src/assets/images/module_vibe_coding_1795414293173.jpg',
    estimatedMinutes: 55,
    competencyTarget: 'Merancang aplikasi terstruktur menggunakan kolaborasi AI dengan kontrol kualitas, arsitektur, dan pengujian mandiri.',
    subTopics: [
      {
        id: 'vc-1',
        title: 'Paradigma Vibe Coding: Orkestrasi Niat & Arsitektur',
        summary:
          'Vibe coding menggeser fokus pembuat perangkat lunak dari sekadar mengetik sintaks boilerplate menjadi merumuskan tujuan sistem, aliran data, dan pengalaman pengguna secara presisi.',
        keyPoints: [
          'Pengembang berperan sebagai arsitek produk yang mendefinisikan masalah, pengguna target, dan batasan teknis.',
          'AI bertindak sebagai mitra implementasi cepat, bukan pengganti logika berpikir komputasional.',
          'Keberhasilan proyek ditentukan oleh kejelasan model data dan alur antarmuka sejak awal.'
        ],
        practicalExample: 'Merancang skema data siswa dan alur cetak rapor sebelum meminta asisten kode membangun komponen antarmuka React.'
      },
      {
        id: 'vc-2',
        title: 'Anatomi Spesifikasi Prompt yang Terstruktur',
        summary:
          'Instruksi yang kabur menghasilkan kode rapuh. Prompt engineering untuk rekayasa perangkat lunak memadukan konteks, aturan desain, struktur data, dan kasus batas.',
        keyPoints: [
          'Sertakan 4 elemen kunci: Tujuan Fungsional, Struktur Data, Aturan Antarmuka/UX, dan Batasan Keamanan.',
          'Hindari meminta seluruh aplikasi kompleks sekaligus tanpa memecah fitur inti.',
          'Gunakan terminologi teknis yang konsisten (misal: nama komponen, tipe data, validasi input).'
        ],
        practicalExample: 'Daripada menulis "buatkan dashboard nilai", tuliskan spesifikasi metrik KPI, filter kelas, format tabel tabular, dan fitur ekspor CSV.'
      },
      {
        id: 'vc-3',
        title: 'Siklus Iteratif & Dekomposisi Modular',
        summary:
          'Pengembangan yang efektif dilakukan dalam putaran pendek: buat fondasi data, bangun tampilan utama, uji interaksi, lalu sempurnakan detail.',
        keyPoints: [
          'Pecah sistem menjadi modul kecil yang terisolasi (data, komponen UI, fungsi utilitas) agar mudah diperbaiki.',
          'Lakukan satu perubahan terfokus per iterasi untuk mencegah regresi pada fitur yang sudah berjalan.',
          'Gunakan kontrol versi (Git) atau checkpoint sebelum melakukan perombakan besar.'
        ],
        practicalExample: 'Membangun komponen kuis interaktif secara terpisah terlebih dahulu, menguji perhitungan skornya, baru menghubungkannya ke halaman analitik.'
      },
      {
        id: 'vc-4',
        title: 'Human-in-the-Loop: Code Review, Debugging & Keamanan',
        summary:
          'Kode hasil generasi AI wajib ditinjau, dikompilasi, dan diuji oleh manusia untuk memastikan bebas bug logika maupun celah keamanan.',
        keyPoints: [
          'Jangan pernah memasukkan kunci rahasia (API Key, kredensial basis data) di sisi klien/browser.',
          'Periksa edge case seperti input kosong, pembagian dengan nol, atau tata letak pecah di layar ponsel.',
          'Pahami kode yang dihasilkan agar pengembang mampu memelihara dan menjelaskan cara kerjanya.'
        ],
        practicalExample: 'Menemukan bahwa hasil ekspor CSV belum menangani tanda koma di dalam nama siswa, lalu memperbaikinya dengan membungkus nilai dalam tanda kutip.'
      }
    ],
    quiz: [
      {
        id: 'vc-q1',
        question: 'Apa peran paling krusial seorang pembuat perangkat lunak saat mempraktikkan Vibe Coding secara profesional?',
        options: [
          'Menyerahkan seluruh keputusan keamanan dan logika tanpa membaca kode hasil AI',
          'Bertindak sebagai arsitek yang merumuskan spesifikasi jelas, memandu iterasi, dan memverifikasi hasil',
          'Menghindari penggunaan tipe data atau pengujian kompilasi agar lebih cepat',
          'Menulis ulang seluruh pustaka standar dari nol tanpa bantuan alat modern'
        ],
        correctIndex: 1,
        explanation: 'Vibe coding yang efektif menempatkan manusia sebagai pengendali arsitektur, kualitas spesifikasi, dan verifikator akhir.'
      },
      {
        id: 'vc-q2',
        question: 'Mengapa pendekatan dekomposisi modular sangat dianjurkan dalam siklus Vibe Coding?',
        options: [
          'Memudahkan isolasi bug, pengujian bertahap, dan pemeliharaan tiap komponen tanpa merusak bagian lain',
          'Membuat jumlah baris kode menjadi sangat panjang dan sulit dibaca',
          'Menghilangkan kebutuhan terhadap antarmuka pengguna yang responsif',
          'Mencegah kode berjalan di peramban modern'
        ],
        correctIndex: 0,
        explanation: 'Memecah aplikasi menjadi modul-modul kecil membuat AI dan manusia lebih mudah menalar, menguji, dan memperbaiki kesalahan.'
      },
      {
        id: 'vc-q3',
        question: 'Saat meninjau kode aplikasi web yang dihasilkan, temuan manakah yang merupakan pelanggaran keamanan serius?',
        options: [
          'Menggunakan font monospace untuk kolom angka di tabel',
          'Menyimpan kunci API rahasia (Secret API Key) langsung di kode frontend React',
          'Memisahkan data kurikulum ke dalam berkas TypeScript tersendiri',
          'Menambahkan tombol reset filter pada tabel pencarian'
        ],
        correctIndex: 1,
        explanation: 'Kode frontend dikirim ke browser pengguna dan dapat diinspeksi siapa saja; kunci rahasia harus selalu disimpan di server/environment variable backend.'
      },
      {
        id: 'vc-q4',
        question: 'Langkah terbaik ketika mendapati fitur baru hasil generasi mengalami error kompilasi TypeScript adalah...',
        options: [
          'Mengabaikan pesan error dan langsung menerbitkan aplikasi',
          'Membaca pesan error secara spesifik, memeriksa tipe data yang tidak cocok, lalu memperbaiki modul terkait',
          'Menghapus seluruh berkas proyek dan memulai dari awal tanpa diagnosis',
          'Mengubah ekstensi berkas menjadi teks biasa'
        ],
        correctIndex: 1,
        explanation: 'Debugging berbasis pesan error compiler mempercepat identifikasi akar masalah tanpa merusak komponen yang sudah valid.'
      }
    ]
  }
];

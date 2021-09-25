import Accordion from "components/elements/Accordion";

const FAQ_CONTENT = [
  {
    title: "Apa beda Trooops dengan Google Classroom?",
    content:
      "Google Classroom biasa digunakan untuk mengumpulkan tugas. Fitur utama Trooops yang sekarang adalah Chatting dan Q&A. Namun ke depannya, akan ada fitur pengumpulan tugas seperti Google Classroom supaya siswa tidak perlu lagi pindah-pindah platform.",
  },
  {
    title: "Apa beda Trooops dengan Line/Whatsapp?",
    content:
      "Line/Whatsapp biasa digunakan untuk chatting dengan personal dan group. Namun sering kali chatnya terlalu banyak dan menumpuk sehingga sulit untuk mengaturnya. Trooops di design agar chatting dapat dilakukan berdasarkan kategori. Sehingga, siswa dan guru dapat mengirim, menerima, dan mengelola informasi dengan terstruktur.",
  },
  {
    title: "Apakah saya harus membayar untuk menggunakan Trooops?",
    content:
      "<b>Tidak.</b> Anda bisa langsung menggunakan Trooops secara gratis.",
  },
  {
    title: "Fitur apa saja yang ada di Trooops?",
    content:
      "Trooops akan terus berinovasi sesuai dengan kebutuhan siswa dan guru. Fitur terdekat yang akan kami keluarkan adalah pengumpulan tugas seperti Google Classroom.",
  },
  {
    title: "Siapa saja yang bisa menggunakan Trooops?",
    content:
      "Trooops ditujukan untuk aktivitas belajar mengajar. Kelas sekolah, kuliah, maupun bimbel dapat menggunakan Trooops secara maksimal.",
  },
];

const Faq = () => {
  return (
    <div className="w-screen flex lg:px-20 px-4 md:px-15 py-16">
      <div className="w-full">
        <h1 className="text-5xl">Pertanyaan yang sering ditanyakan.</h1>
      </div>
      <div className="w-full">
        <Accordion item={FAQ_CONTENT} />
      </div>
    </div>
  );
};

export default Faq;

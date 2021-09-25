import benefit from "assets/landing/benefit.png";
import Button from "components/elements/Button";

const Benefit = () => {
  return (
    <div className="w-screen bg-gray-800 flex lg:px-20 px-4 md:px-15 flex-col items-center pb-16">
      <h1 className="text-5xl font-bold">
        Kelas yang Aktif Bermula Dari Kontribusi Siswa.
      </h1>
      <h1 className="text-3xl font-thin">
        Semua Berhak Bertanya dan Mendapatkan Jawaban
      </h1>
      <img src={benefit} alt="benefit" width="60%" />
      <Button variant="primary">Daftar Gratis</Button>
    </div>
  );
};

export default Benefit;

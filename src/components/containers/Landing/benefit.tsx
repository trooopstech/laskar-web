import benefit from "assets/landing/benefit.png";
import Button from "components/elements/Button";
import { LandingComponentProps } from ".";

const Benefit: React.FC<LandingComponentProps> = ({ openRegister }) => {
  return (
    <div className="w-screen bg-gray-800 flex lg:px-20 px-4 md:px-15 flex-col items-center pb-16 md:pt-0 pt-16">
      <h1 className="text-2xl text-center md:text-left md:text-5xl font-bold">
        Kelas yang Aktif Bermula Dari Kontribusi Siswa.
      </h1>
      <h1 className="md:text-3xl font-thin">
        Semua Berhak Bertanya dan Mendapatkan Jawaban
      </h1>
      <img src={benefit} alt="benefit" className="w-full md:w-2/3" />
      <Button variant="primary" onClick={openRegister}>
        Daftar Gratis
      </Button>
    </div>
  );
};

export default Benefit;

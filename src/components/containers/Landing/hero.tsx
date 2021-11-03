import Button from "components/elements/Button";
import { LandingComponentProps } from ".";

const Hero: React.FC<LandingComponentProps> = ({ openRegister }) => {
  return (
    <div
      className="bg-gray-1000 lg:px-20 px-4 md:px-15 pt-16 h-screen flex flex-col items-center justify-center"
      id="hero-section"
    >
      <h1 className="text-xl md:text-3xl my-2 text-center">
        Platform Teknologi untuk Pendidikan
      </h1>
      <h1 className="text-3xl md:text-6xl font-bold my-3 text-center">
        Tanya, Jawab & Diskusi di 1 Aplikasi{" "}
      </h1>
      <p className="text-xl md:text-3xl font-thin my-2 text-center">
        Bantu Siswa Belajar dengan Kelas Online yang Aktif
      </p>
      <Button variant="primary" className="mt-4" onClick={openRegister}>
        Daftar Gratis
      </Button>
    </div>
  );
};

export default Hero;

import Button from "components/elements/Button";
import { FaCheck } from "react-icons/fa";
import feature from "assets/landing/feature.png";

const Feature = () => {
  return (
    <div className="h-screen w-screen bg-gray-800 flex lg:px-20 px-4 md:px-15">
      <div className="w-full h-full flex flex-col justify-center">
        <h1 className="text-5xl my-4">
          Kelas, Asistensi, dan Diskusi dalam 1 Platform
        </h1>
        <div>
          <div className="flex items-center py-2">
            <FaCheck className="text-xl mr-4" />
            <h1 className="text-xl">Fitur tanya jawab asinkronus</h1>
          </div>
          <div className="flex items-center py-2">
            <FaCheck className="text-xl mr-4" />
            <h1 className="text-xl">
              Kirim pertanyaan sebagai anonim agar si pemalu bisa berpartisipasi
            </h1>
          </div>
          <div className="flex items-center py-2">
            <FaCheck className="text-xl mr-4" />
            <h1 className="text-xl">Atur kelompok chat sesuai topik</h1>
          </div>
          <div className="flex items-center py-2">
            <FaCheck className="text-xl mr-4" />
            <h1 className="text-xl">
              Fitur <b>Dashboards</b> supaya kamu ga ketinggalan dengan updates
              & deadline
            </h1>
          </div>
        </div>
        <div className="w-1/3 my-4">
          <Button variant="primary">Daftar Gratis</Button>
        </div>
      </div>
      <div className="w-full h-full pt-4 flex items-center">
        <img src={feature} alt="feature" />
      </div>
    </div>
  );
};

export default Feature;

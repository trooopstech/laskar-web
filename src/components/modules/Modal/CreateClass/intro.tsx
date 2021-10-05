import Button from "components/elements/Button";
import { FaChevronRight } from "react-icons/fa";

const PurposeButton = ({
  value,
  setPurpose,
}: {
  value: { [key: string]: string };
  setPurpose: (value: string) => void;
}) => {
  return (
    <div
      className="rounded-lg bg-gray-700 w-full p-4 flex hover:bg-gray-600 justify-between items-center my-2 cursor-pointer"
      onClick={() => setPurpose(value.key)}
    >
      <h1 className="font-bold text-white">{value.value}</h1>
      <FaChevronRight />
    </div>
  );
};

interface IntroSectionProps extends ModalProps {
  setPurpose: (value: string) => void;
}

const IntroSection: React.FC<IntroSectionProps> = ({
  onClose,
  openOther,
  setPurpose,
}) => {
  return (
    <div className="container flex flex-col md:w-120">
      <div
        id="title"
        className="px-4 py-4 w-full flex items-center justify-center"
      >
        <h1 className="font-bold text-xl">Buat Kelas</h1>
      </div>
      <div id="purpose" className="px-4 flex flex-col mb-2">
        <p className="font-thin">Kelas digunakan untuk?</p>
        <PurposeButton
          setPurpose={setPurpose}
          value={{ value: "Kelas Sekolah/Kuliah", key: "SCHOOL" }}
        />
        <PurposeButton
          setPurpose={setPurpose}
          value={{ value: "Bimbel/Kursus", key: "COURSES" }}
        />
        <PurposeButton
          setPurpose={setPurpose}
          value={{ value: "Komunitas", key: "COMMUNITY" }}
        />
        <PurposeButton
          setPurpose={setPurpose}
          value={{ value: "Lainnya", key: "OTHER" }}
        />
      </div>
      <div
        id="join-action"
        className="w-full bg-gray-700 p-5 flex flex-col justify-center items-center"
      >
        <h1 className="font-bold text-base mb-2">Sudah ada yang Mengundang?</h1>
        <Button
          variant="primary"
          className="w-full"
          onClick={() => {
            onClose();
            if (openOther) {
              openOther();
            }
          }}
        >
          Gabung Kelas
        </Button>
      </div>
    </div>
  );
};

export default IntroSection;

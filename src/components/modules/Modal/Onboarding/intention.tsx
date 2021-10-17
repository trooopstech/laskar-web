import Button from "components/elements/Button";
import { FaChevronRight } from "react-icons/fa";

interface IntentionSectionProps {
  onClose: () => void;
  openCreateClass: () => void;
  openJoinClass: () => void;
}

const IntentionSection = ({
  onClose,
  openCreateClass,
  openJoinClass,
}: IntentionSectionProps): JSX.Element => {
  return (
    <div className="container flex flex-col items-center justify-center md:w-120 p-4">
      <div
        className="rounded-lg bg-gray-700 w-full p-4 flex hover:bg-gray-600 justify-between items-center my-2 cursor-pointer"
        onClick={() => {
          onClose();
          openCreateClass();
        }}
      >
        <h1 className="font-bold text-white">Buat Kelas</h1>
        <FaChevronRight />
      </div>
      <div
        className="rounded-lg bg-gray-700 w-full p-4 flex hover:bg-gray-600 justify-between items-center my-2 cursor-pointer"
        onClick={() => {
          onClose();
          openJoinClass();
        }}
      >
        <h1 className="font-bold text-white">Gabung Kelas</h1>
        <FaChevronRight />
      </div>
      <div className="w-full justify-end flex my-4">
        <p
          className="text-base font-bold text-red-500 cursor-pointer"
          onClick={onClose}
        >
          Lewati
        </p>
      </div>
    </div>
  );
};

export default IntentionSection;

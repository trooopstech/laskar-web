import { MdAdd } from "react-icons/md";

const AnnouncementSection = () => {
  return (
    <div className="w-full bg-gray-700 h-full rounded-lg">
      <div
        className="flex items-center justify-between p-4 border-b border-gray-600"
        id="title"
      >
        <h1 className="font-bold">Pengumuman</h1>
        <MdAdd
          style={{ fontWeight: "bolder", fontSize: "20px", strokeWidth: "1" }}
        />
      </div>
    </div>
  );
};

export default AnnouncementSection;
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";

interface ClassCardProps {
  data?: Class;
  isExtra?: boolean;
  openCreateClass?: () => void;
}

const ClassCard: React.FC<ClassCardProps> = ({
  data,
  isExtra,
  openCreateClass,
}) => {
  const renderClassName = (): string => {
    if (data?.name) {
      if (data?.name.length > 18) {
        return `${data?.name.slice(0, 15)}...`;
      }
      return data?.name;
    }

    return "";
  };

  if (!isExtra) {
    return (
      <Link
        to={`/dashboard/class/${data?.id}`}
        className="m-2 p-4 bg-gray-700 transform hover:-translate-y-2 cursor-pointer rounded-lg"
      >
        <div
          className="rounded-lg flex items-center justify-center text-black"
          style={{
            width: "220px",
            height: "180px",
            background: `#${data?.color}`,
          }}
        ></div>
        <div className="py-2">
          <p className="text-xl text-right whitespace-nowrap flex items-center font-bold text-gray-50">
            {data?.name && renderClassName()}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <div
      className="m-2 p-4 bg-gray-700 transform hover:-translate-y-2 cursor-pointer rounded-lg"
      onClick={openCreateClass}
    >
      <div
        className="rounded-lg flex items-center justify-center text-black"
        style={{
          width: "220px",
          height: "180px",
          background: "#2C2C2E",
        }}
      >
        <MdAdd className="text-3xl text-gray-500" />
      </div>
      <div className="py-2">
        <p className="text-xl text-right whitespace-nowrap flex items-center font-bold text-gray-50">
          {data?.name && renderClassName()}
        </p>
      </div>
    </div>
  );
};

export default ClassCard;

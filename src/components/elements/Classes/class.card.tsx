import { Link } from "react-router-dom";
import { MdMoreVert } from "react-icons/md";
interface ClassCardProps {
  data: Class;
}

const ClassCard: React.FC<ClassCardProps> = ({ data }) => {
  const renderClassName = (): string => {
    if (data?.name) {
      if (data?.name.length > 18) {
        return `${data?.name.slice(0, 15)}...`;
      }
      return data?.name;
    }

    return "";
  };

  return (
    <Link
      to={`/dashboard/class/${data?.id}`}
      className="rounded-xl px-4 py-2 m-3 flex items-end justify-end text-black cursor-pointer transform hover:-translate-y-2"
      style={{
        width: "250px",
        height: "150px",
        background: `#${data?.color}`,
      }}
    >
      <div className="flex items-center w-full justify-between">
        <p className="text-xl text-right whitespace-nowrap flex items-center font-bold text-gray-800">
          {data?.name && renderClassName()}
        </p>
        <MdMoreVert style={{ fontSize: "20px" }} className="-mr-2" />
      </div>
    </Link>
  );
};

export default ClassCard;

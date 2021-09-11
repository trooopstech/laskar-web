import { Link } from "react-router-dom";

interface ClassCardProps {
  data: Class;
}

const ClassCard: React.FC<ClassCardProps> = ({ data }) => {
  return (
    <Link
      to={`/dashboard/class/${data?.id}`}
      className="rounded-md p-4 m-3 flex items-end justify-end text-black cursor-pointer transform hover:scale-110"
      style={{ width: "320px", height: "150px", background: `#${data?.color}` }}
    >
      <div className="flex items-center">
        <p className="text-xl">{data?.name}</p>
      </div>
    </Link>
  );
};

export default ClassCard;

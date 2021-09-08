import { Link } from "react-router-dom";

interface ClassesProps {
  id: string;
  name: string;
  photo?: string;
  color?: string;
}

const Classes: React.FC<ClassesProps> = ({ id, name, photo, color }) => {
  return (
    <Link
      className="my-2 rounded-md shadow-sm cursor-pointer w-12 h-12 flex items-center justify-center"
      style={{ backgroundColor: color }}
      to={`/dashboard/class/${id}`}
    >
      <p className="text-base uppercase font-bold text-center text-white">
        {name?.slice(0, 2)}
      </p>
    </Link>
  );
};

export default Classes;

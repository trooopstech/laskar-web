import { useSubscription } from "@apollo/client/react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { JOIN_CLASS_SUBS } from "schema/classes";

interface ClassesProps {
  id: string;
  name: string;
  photo?: string;
  color?: string;
}

const Classes: React.FC<ClassesProps> = ({ id, name, photo, color }) => {
  const { data, loading } = useSubscription(JOIN_CLASS_SUBS, {
    variables: { classId: id },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <NavLink
      className="my-2 rounded-md shadow-sm cursor-pointer w-12 h-12 flex items-center justify-center transform hover:scale-110"
      style={{ backgroundColor: color }}
      to={`/dashboard/class/${id}`}
      isActive={(_, location) => {
        if (location?.pathname.includes(id)) {
          return true;
        }
        return false;
      }}
      activeClassName="rounded-3xl"
    >
      <p className="text-base uppercase font-bold text-center text-white">
        {name?.slice(0, 2)}
      </p>
    </NavLink>
  );
};

export default Classes;

import { useState } from "react";
import { NavLink } from "react-router-dom";

interface ClassesProps {
  id: string;
  name: string;
  photo?: string;
  color?: string;
}

const Classes: React.FC<ClassesProps> = ({ id, name, photo, color }) => {
  const [isHovered, setHover] = useState<boolean>(false);
  const [isClicked, setClicked] = useState<boolean>(false);

  return (
    <NavLink
      className="my-2 rounded-lg shadow-sm cursor-pointer flex items-center justify-center transform relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ backgroundColor: color, height: "42px", width: "42px" }}
      to={`/dashboard/class/${id}`}
      isActive={(_, location) => {
        if (location?.pathname.includes(id)) {
          setClicked(true);
          return true;
        }
        setClicked(false);
        return false;
      }}
    >
      {(isHovered || isClicked) && (
        <div className=" bg-white w-1 h-2/3 absolute -left-2 rounded-r-lg" />
      )}
      <p className="text-base uppercase font-bold text-center text-white">
        {name?.slice(0, 2)}
      </p>
    </NavLink>
  );
};

export default Classes;

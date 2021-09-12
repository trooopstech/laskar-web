import useClassDetail from "hooks/useDetailClass";
import { MdAdd, MdExpandMore, MdExpandLess } from "react-icons/md";
import { FiHash } from "react-icons/fi";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { useState } from "react";

const ClassSection = () => {
  const { classDetail } = useClassDetail();
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="py-2">
      {/* category wannabe */}
      <div
        className="category flex items-center justify-between cursor-pointer text-gray-300 hover:text-white"
        onClick={() => setCollapse(!collapse)}
      >
        <div className="flex items-center justify-between cursor-pointer">
          {collapse ? <MdExpandLess /> : <MdExpandMore />}
          <p className="uppercase">Pengumuman</p>
        </div>
        <MdAdd
          onClick={() => alert("blom dibuat woy")}
          style={{ fontWeight: "bold" }}
        />
      </div>
      {!collapse && (
        <div className="channel flex flex-col">
          <div className="flex items-center cursor-pointer text-gray-300 hover:text-white my-1 hover:bg-gray-600 rounded-sm pl-4">
            <p className="text-base text-gray-500 mr-2">
              <FiHash />
            </p>
            <p className="text-base">Tugas Besar 1</p>
          </div>
          <div className="flex items-center cursor-pointer text-gray-300 hover:text-white my-1 hover:bg-gray-600 rounded-sm pl-4">
            <p className="text-base text-gray-500 mr-2">
              <FiHash />
            </p>
            <p className="text-base">Tugas Besar 2</p>
          </div>
          <div className="flex items-center cursor-pointer text-gray-300 hover:text-white my-1 hover:bg-gray-600 rounded-sm pl-4">
            <p className="text-base text-gray-500 mr-2">
              <FiHash />
            </p>
            <p className="text-base">Tugas Besar 3</p>
          </div>
        </div>
      )}
      {/* category wannabe */}
    </div>
  );
};

export default ClassSection;

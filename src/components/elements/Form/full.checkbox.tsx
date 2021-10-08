import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

interface FullCheckboxProps<T> {
  data: Array<T>;
  setData: (value: T) => void;
  value: T;
}

const FullCheckbox: React.FC<FullCheckboxProps<string | any>> = ({
  data,
  setData,
  value,
  children,
}) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(data.filter((v) => v === value).length > 0);
  }, [data]);

  const setNewData = () => {
    if (active) {
      setData(data.filter((v) => v !== value));
    } else {
      setData([...data, value]);
    }
  };

  return (
    <div
      className="w-full py-2 flex justify-between items-center cursor-pointer"
      onClick={setNewData}
    >
      {children}
      <div
        className={`h-4 w-4 border-2 flex items-center justify-center ${
          active ? "bg-red-400 border-red-400" : "border-gray-500"
        }`}
      >
        {active && <FaCheck className="text-xs" />}
      </div>
    </div>
  );
};

export default FullCheckbox;

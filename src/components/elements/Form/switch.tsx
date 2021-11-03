interface SwitchProps {
  checked: boolean;
  setChecked: (checked: boolean) => void;
  label?: string;
}

const Switch = ({ checked, setChecked, label }: SwitchProps) => {
  return (
    <div className="flex items-center justify-center ">
      <input
        type="checkbox"
        name="toggle"
        className="hidden"
        readOnly
        checked={checked}
      />
      <label
        className="relative w-8 h-4 flex select-none cursor-pointer items-center"
        htmlFor="toggle"
        onClick={() => setChecked(!checked)}
      >
        <span
          className={`absolute left-0 top-0 h-full w-full rounded-full border border-gray-500 ${
            checked
              ? "bg-green-500 border-gray-300"
              : "bg-gray-1000 border-gray-500"
          }`}
        ></span>
        <span
          className={`h-3 w-3 absolute z-10 rounded-full  transition-transform duration-300 ease-in-out flex justify-center items-center  transform mx-1 ${
            checked ? "translate-x-3 bg-gray-50" : "bg-gray-300"
          }`}
        ></span>
      </label>
      <span className="text-xs text-gray-500 ml-1">{label}</span>
    </div>
  );
};

export default Switch;

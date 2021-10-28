interface InputProps {
  label?: string;
  type: string;
  placeholder?: string;
  className?: string;
  onChange?: (res: any) => void;
  onBlur?: (res: any) => void;
  value?: string;
  name: string;
  startAddorment?: JSX.Element;
  endAddorment?: JSX.Element;
  disabled?: boolean;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  placeholder,
  onChange,
  onBlur,
  value,
  className,
  name,
  startAddorment,
  endAddorment,
  disabled,
  error,
}) => {
  return (
    <div className="flex flex-col my-2 w-full">
      <span className="font-bold mb-1">{label}</span>
      <div
        className={`flex w-full items-center rounded-lg px-2 py-1 bg-gray-700 ${
          error && "border border-red-500"
        }`}
      >
        <div>{startAddorment}</div>
        <input
          type={type}
          className={`form-input text-gray-50 bg-transparent border-0 w-full focus:outline-none focus:ring-0 focus:appearance-none ${className}`}
          placeholder={placeholder}
          onChange={onChange}
          // @ts-ignore
          onWheel={(e) => e.target.blur()}
          onBlur={onBlur}
          value={value}
          name={name}
          disabled={disabled}
        />
        <div>{endAddorment}</div>
      </div>
      {error && (
        <span className="font-thin text-red-500 text-sm mt-2">{error}</span>
      )}
    </div>
  );
};

export default Input;

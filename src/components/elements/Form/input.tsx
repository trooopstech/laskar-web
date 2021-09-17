interface InputProps {
  label?: string;
  type: string;
  placeholder?: string;
  className?: string;
  onChange?: (res: any) => void;
  onBlur?: (res: any) => void;
  value?: string;
  name: string;
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
}) => {
  return (
    <div className="flex flex-col my-2 w-full">
      <span>{label}</span>
      <input
        type={type}
        className={`form-input rounded-lg border-0 text-gray-50 bg-gray-700 ${className}`}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
      />
    </div>
  );
};

export default Input;

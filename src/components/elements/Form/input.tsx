interface InputProps {
  label?: string;
  type: string;
  placeholder?: string;
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
  name,
}) => {
  return (
    <div className="flex flex-col my-2 w-full">
      <span>{label}</span>
      <input
        type={type}
        className="form-input rounded-sm border-0 bg-gray-300 text-black"
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

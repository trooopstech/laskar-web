interface SelectProps {
  option: { key: string; value: string }[];
  label?: string;
  onChange?: (res: any) => void;
  onBlur?: (res: any) => void;
  value?: string;
  name: string;
}

const Select: React.FC<SelectProps> = ({
  option,
  label,
  onChange,
  onBlur,
  value,
  name,
}) => {
  return (
    <div className="flex flex-col my-2 w-full">
      <span>{label}</span>
      <select
        className="form-select rounded-lg border-0 bg-gray-900 text-gray-50"
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
      >
        {option.map((o) => (
          <option value={o.key} label={o.value}>
            {o.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

interface ButtonProps {
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const buttonTheme = {
  primary: {
    base: "bg-red-500 hover:bg-red-600",
    text: "text-white",
  },
  secondary: {
    base: "bg-white hover:bg-gray-100 ",
    text: "text-red-500",
  },
  text: {
    base: "bg-transparent hover:bg-gray-700 hover:bg-opacity-50",
    text: "text-white",
  },
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  href,
  className,
  variant,
  children,
  type,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-2 rounded-md ${
        // @ts-ignore
        buttonTheme[variant as string]?.base
      } ${className}`}
    >
      <p
        className={`text-base font-bold ${
          // @ts-ignore
          buttonTheme[variant as string]?.text
        }`}
      >
        {children}
      </p>
    </button>
  );
};

export default Button;

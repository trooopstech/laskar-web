import { Link } from "react-router-dom";

interface ButtonProps {
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  small?: boolean;
  smaller?: boolean;
  external?: boolean;
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
    base: "bg-transparent hover:bg-opacity-50",
    text: "",
  },
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  href,
  className,
  variant,
  children,
  type,
  small,
  disabled,
  smaller,
  external,
}) => {
  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target={external ? "_blank" : ""}
          className={`px-8 py-2 rounded-md ${
            disabled
              ? `bg-gray-500`
              : // @ts-ignore
                buttonTheme[variant as string]?.base
          } ${className}`}
          rel="noreferrer noopener"
        >
          <p
            className={`text-base font-bold text-center ${
              disabled
                ? `text-gray-600`
                : // @ts-ignore
                  buttonTheme[variant as string]?.text
            } `}
          >
            {children}
          </p>
        </a>
      );
    }

    return (
      <Link
        to={href}
        className={`px-8 py-2 rounded-md ${
          disabled
            ? `bg-gray-500`
            : // @ts-ignore
              buttonTheme[variant as string]?.base
        } ${className}`}
      >
        <p
          className={`text-base font-bold text-center ${
            disabled
              ? `text-gray-600`
              : // @ts-ignore
                buttonTheme[variant as string]?.text
          } `}
        >
          {children}
        </p>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg ${
        disabled
          ? `bg-gray-500`
          : // @ts-ignore
            buttonTheme[variant as string]?.base
      } ${className} ${
        small ? "md:px-8 py-2 px-4" : smaller ? "py-2 px-4" : "px-8 py-2"
      }`}
    >
      <p
        className={`text-base font-bold ${
          disabled
            ? `text-gray-600`
            : // @ts-ignore
              buttonTheme[variant as string]?.text
        } `}
      >
        {children}
      </p>
    </button>
  );
};

export default Button;

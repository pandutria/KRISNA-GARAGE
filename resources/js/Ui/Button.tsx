import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { Loader2 } from "lucide-react";

interface ButtonSubmitProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  typeButton: "kirim" | "ubah" | "hapus";
  isLoading?: boolean;
}

const Button: React.FC<ButtonSubmitProps> = ({
  typeButton,
  isLoading = false,
  children,
  ...props
}) => {
  const typeStyles = {
    kirim: "bg-green-600 hover:bg-green-700",
    ubah: "bg-blue-600 hover:bg-blue-700",
    hapus: "bg-red-600 hover:bg-red-700",
  };

  return (
    <button
      {...props}
      type="submit"
      disabled={isLoading || props.disabled}
      onClick={props.onClick}
      className={`w-full py-3 rounded-md text-white font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${typeStyles[typeButton]} ${props.className ?? ""}`}
    >
      {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;

import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: "default" | "secondary" | "outline";
};

export function Button({ variant = "default", className = "", ...props }: ButtonProps) {
  const base = "btn";
  const variantClass = `btn-${variant}`;
  return <button className={`${base} ${variantClass} ${className}`.trim()} {...props} />;
}

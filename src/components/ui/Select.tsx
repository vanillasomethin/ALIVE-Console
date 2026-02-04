import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export function Select({ label, className = "", children, ...props }: SelectProps) {
  return (
    <label className="input-field">
      {label && <span className="input-label">{label}</span>}
      <select className={`select ${className}`.trim()} {...props}>
        {children}
      </select>
    </label>
  );
}

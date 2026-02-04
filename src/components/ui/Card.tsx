import type { HTMLAttributes, PropsWithChildren } from "react";

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

type CardPartProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Card({ className = "", ...props }: CardProps) {
  return <div className={`card ${className}`.trim()} {...props} />;
}

export function CardHeader({ className = "", ...props }: CardPartProps) {
  return <div className={`card-header ${className}`.trim()} {...props} />;
}

export function CardContent({ className = "", ...props }: CardPartProps) {
  return <div className={`card-content ${className}`.trim()} {...props} />;
}

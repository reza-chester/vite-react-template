import type { HTMLAttributes, ReactNode } from "react";

export default function Card({ 
    children, 
    className,
    ...props 
  }: { 
    children: ReactNode; 
    className?:string,
  } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`border rounded-[25px] ${className}`} {...props}>
      {children}
    </div>
  )
}

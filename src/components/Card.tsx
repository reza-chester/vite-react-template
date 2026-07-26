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
    <div className={`bg-white/4 border border-white/10 rounded-[25px] card-comp ${className}`} {...props}>
      {children}
    </div>
  )
}

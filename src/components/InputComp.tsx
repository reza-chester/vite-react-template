import type { HTMLAttributes } from "react";

export default function InputComp({className,placeholder,type,...props}:{type:string,placeholder:string,className?:string}& HTMLAttributes<HTMLInputElement>) {
  return (
    <input 
    type={type}
    autoComplete="off"
    placeholder={placeholder}
    className={`rounded-xl p-3 outline-none
        trans-border text-primary placeholder:text-xs! placeholder:text-(--primary)/55 ${className}`}
    {...props}
    />
      
    
  )
}

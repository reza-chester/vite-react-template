import type { HTMLAttributes } from "react";

export default function InputComp({className,placeholder,type,...props}:{type:string,placeholder:string,className?:string}& HTMLAttributes<HTMLInputElement>) {
  return (
    <input 
    type={type}
    autoComplete="off"
    placeholder={placeholder}
    className={`bg-black/35 border border-white/16
       text-white rounded-xl p-3 outline-none
        trans-border placeholder:text-[#7e8690] ${className}`}
    {...props}
    />
      
    
  )
}

import type {  ReactNode } from "react";

export default function ButtonCom({children,className,type,...props}:{children:ReactNode,  className?:string,type:'submit'|'reset'|'button',props?:unknown}) {
  return (
   <button
   type={type}
   role="button"
   className={`border-0 rounded-2xl p-3 text-[14px] bg-(--ir-yellow) w-full cursor-pointer text-[#111]
    font-Imedium
    ${className}`}
   {...props}
   >
{children}
   </button>
  )
}

import type {  ReactNode } from "react";

export default function ButtonCom({children,className,type,...props}:{children:ReactNode,  className?:string,type:'submit'|'reset'|'button',props?:unknown}) {
  return (
   <button
   type={type}
   role="button"
   className={`rounded-2xl p-3 text-sm w-full cursor-pointer text-primary
    font-Imedium
    ${className}`}
   {...props}
   >
{children}
   </button>
  )
}

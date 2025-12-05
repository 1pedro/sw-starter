import { HTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
}
export default function ActionButton({ children, onClick, ...props }: ButtonProps) {
    return (
        <button {...props} onClick={onClick} className="rounded-full bg-default-green text-white uppercase font-bold p-2 self-center bottom-[50px] w-11/12 fixed xl:relative xl:w-full xl:bottom-0">
            {children}
        </button>
    )
}

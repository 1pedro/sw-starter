import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Button({ children, ...props }: HTMLAttributes<HTMLButtonElement>) {
    const merged = twMerge(props.className, "cursor-pointer rounded-full bg-default-green text-white uppercase font-bold p-2 self-center bottom-[50px] fixed xl:relative xl:bottom-0")
    return (
        <button {...props} className={merged}>
            {children}
        </button>
    )
}

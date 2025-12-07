import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Button({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    const color = props.disabled ? 'bg-warm-gray' : 'bg-green-teal hover:bg-green-emerald';

    const merged = twMerge(props.className, [color], "cursor-pointer rounded-full text-white uppercase font-bold py-2 px-4 self-center")

    return (
        <button {...props} className={merged}>
            {children}
        </button>
    )
}

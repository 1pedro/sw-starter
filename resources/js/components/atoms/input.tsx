import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const Input = forwardRef((props: InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) => {

    const merged = twMerge(props.className, "")
    return (
        <input {...props} className={merged} ref={ref} />
    )
})

export default Input;

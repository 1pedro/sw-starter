import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

const Input = forwardRef((props: InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) => {

    return (
        <input {...props} ref={ref} />
    )
})

export default Input;

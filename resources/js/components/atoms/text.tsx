import { ComponentPropsWithoutRef, HTMLAttributes, JSX } from "react";

export interface TextProps<T extends React.ElementType>
    extends HTMLAttributes<JSX.IntrinsicAttributes> {
    as?: T;
}

type ReturnProps<P extends React.ElementType> = TextProps<P> &
    Omit<ComponentPropsWithoutRef<P>, keyof TextProps<P>>;

export default function Text<T extends React.ElementType = "p">({ as, ...props }: ReturnProps<T>) {

    const Tag = as ? as : "p";
    return (
        <Tag {...props} />
    )
}

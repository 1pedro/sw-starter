
// @ts-expect-error common error when importing svg
import ChevronLeft from "@/components/icons/chevron-left.svg?react"
import { Link } from "@inertiajs/react";
import React, { JSX } from "react"
import { HTMLAttributes } from "react"

type IconKeys = "chevron-left"
interface LinkIconProps extends HTMLAttributes<SVGAElement> {
    icon: IconKeys,
    href?: string;
    onClick?: () => void;
}

const icons: Record<IconKeys, JSX.Element> = {
    "chevron-left": <ChevronLeft />
}

export default function LinkIcon({ icon, href, ...props }: LinkIconProps) {
    const defaultProps = { color: "#0ab463", style: { position: "absolute", left: 10, scale: 1.4 } };
    const cloned = React.cloneElement(icons[icon], { ...props, ...defaultProps });

    if (href) {
        return (
            <Link href={href}>{cloned}</Link>
        )
    }
    return cloned;
}

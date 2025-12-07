import { ReactNode } from "react"
import Text from "@/components/atoms/text"
import Button from "../atoms/button";
import { Link } from "@inertiajs/react";

interface RootProps {
    children: ReactNode;
}

const Root = ({ children }: RootProps) => {
    return (
        <div className="w-full xl:w-1/2 mx-auto h-auto">
            <div className="w-full bg-white rounded-md flex flex-col xl:m-5 space-y-5 p-6 xl:h-full shadow-md shadow-warm-gray">
                {children}
            </div>
        </div>
    )
}

interface TitleProps {
    children: string;
}

const Title = ({ children }: TitleProps) => {
    return (
        <Text as="h2" className="font-bold text-xl">{children}</Text>
    )
}

interface DetailsProps {
    children: ReactNode;
    title: string;
}
const Details = ({ title, children }: DetailsProps) => {
    return (
        <div className="xl:w-1/2 w-full">
            <Text as={"h3"} className="font-bold pb-2 border-b-2 border-warm-gray">{title}</Text>
            {children}
        </div>
    )

}
interface ActionProps {
    href?: string;
    title: string;
}

const Action = ({ href = "/", title }: ActionProps) => {
    return (
        <Link href={href} className="pb-5 mt-2 xl:pb-0 xl:mt-0">
            <Button className={"uppercase w-full xl:w-auto"}>{title}</Button>
        </Link>
    )
}

interface LinkProps {
    children: ReactNode;
    title: string;
}

const Links = ({ children, title }: LinkProps) => {
    return (
        <div className="xl:w-1/2 w-full mt-4 xl:mt-0">
            <Text as={"h3"} className="font-bold pb-2 border-b-2 border-warm-gray">{title}</Text>
            <div className={"grid grid-cols-2"}>
                {children}
            </div>
        </div>
    )
}

interface ContentProps {
    children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
    return (
        <div className="flex flex-col xl:flex-row space-x-20 xl:mx-0">
            {children}
        </div>
    )
}

const BasePage = {
    Title,
    Root,
    Details,
    Action,
    Links,
    Content
}

export default BasePage;

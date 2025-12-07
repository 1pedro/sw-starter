import { ReactNode } from "react";
import Text from "@/components/atoms/text";


interface RootProps { children: ReactNode, hidden?: boolean }

const Root = ({ children, hidden }: RootProps) => {
    return (
        <div hidden={hidden} className="lg:w-2/3 lg:mt-5 bg-white rounded-md flex flex-col space-y-5 p-6  shadow-md shadow-warm-gray">
            {children}
        </div>
    )
}

interface TitleProps {
    children: string;
}

const Title = ({ children }: TitleProps) => {
    return (
        <Text className={"font-bold text-xl pb-3 border-b border-muted-gray"}>{children}</Text>
    )
}

const Empty = () => {
    return (
        <div className="grid grid-col-1 place-items-center mx-auto h-[500px]">
            <Text as="span" className="text-center text-muted-gray font-bold">
                There are zero matches. <br />
                Use the form to search for People or Movies.
            </Text>
        </div>
    )
}

const Loading = () => {
    return (
        <div className="grid grid-col-1 place-items-center mx-auto h-[500px]">
            <Text className="text-warm-gray font-bold">Searching...</Text>
        </div>
    )
}

const BaseResultBox = {
    Title,
    Root,
    Empty,
    Loading
}

export default BaseResultBox;

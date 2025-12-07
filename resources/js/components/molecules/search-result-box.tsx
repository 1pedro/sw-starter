import { ReactNode } from "react";
import Text from "@/components/atoms/text";


export function SearchResultBox({ children, title, hidden }: { children: ReactNode, title: string, hidden?: boolean }) {
    return (
        <div hidden={hidden} className="lg:w-2/3 lg:mt-5 bg-white rounded-md flex flex-col space-y-5 p-6  shadow-md shadow-warm-gray">
            <Text className={"font-bold text-xl pb-3 border-b border-muted-gray"}>{title}</Text>
            {children}
        </div>
    )
}

import Text from "@/components/atoms/text"
import { ReactNode } from "react"

interface HeaderProps {
    back?: ReactNode | null
}

export default function Header({ back = null }: HeaderProps) {

    return (
        <div className=" py-3 w-full bg-white text-center border-b-2 border-green-teal lg:border-none shadow-green-teal">
            {back}
            <Text as="h1" className="font-montserrat text-xl font-bold text-green-teal">SWStarter</Text>
        </div>
    )
}

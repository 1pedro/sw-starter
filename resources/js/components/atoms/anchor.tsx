import { Link } from "@inertiajs/react"

interface AnchorProps {
    address: string;
    text: string;
    isLoading: boolean;
}

export default function Anchor({ address, text, isLoading }: AnchorProps) {
    if (isLoading) {
        return <div className="w-[150px] h-[20px] bg-gray-200 animate-pulse rounded-xs inline-block mr-4 mt-2"></div>
    }
    
    return <Link href={address} className={"inline-block mr-4 mt-2 text-vivid-blue"}>
        {text}
    </Link>
}

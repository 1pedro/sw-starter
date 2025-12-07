import useGetPreview from "@/api/preview";
import { Link } from "@inertiajs/react"

interface AnchorProps {
    address: string;
}

export default function Anchor({ address }: AnchorProps) {
    const [_, path] = address.split("/api");
    const { isLoading, data } = useGetPreview(path);
    const title = data?.title || data?.name;

    if (isLoading) {
        return <div className="w-[150px] h-[20px] bg-gray-200 animate-pulse rounded-xs inline-block mr-4 mt-2"></div>
    }
    
    return <Link href={path} className={"inline-block mr-4 mt-2 text-vivid-blue"}>
        {title}
    </Link>
}

interface AnchorProps {
    address: string;
    text: string;
    isLoading: boolean;
}

export default function Anchor({ address, text, isLoading }: AnchorProps) {
    if (isLoading) {
        return <div className="w-[150px] h-[20px] bg-gray-200 animate-pulse rounded-xs inline-block mr-4 mt-2"></div>
    }


    // I had a issue wiht Inertiajs link component
    return <a href={address} className={"inline-block mr-4 mt-2 text-vivid-blue"}>
        {text}
    </a>
}

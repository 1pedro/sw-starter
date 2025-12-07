import useGetPreview from "@/api/preview";
import Anchor from "@/components/atoms/anchor";

export default function useLinkBuilder({urls} : {urls: string[]}) {
    const elements = useGetPreview(urls).map((query, index) => {

        const title = query.data?.title || query.data?.name || '';
        const [_, address] = urls[index].split("/api");

        return <Anchor key={index} address={address} isLoading={query.isLoading} text={title} />
    })

    return elements;
}

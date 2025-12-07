import useSearchMutation from "@/api/search";
import LinkIcon from "@/components/atoms/link-icon";
import Text from "@/components/atoms/text"
import SearchResultItem from "@/components/molecules/search-result-item";
import { Kind } from "@/types";
import { useState } from "react";
import { useMedia } from "react-use";


export default function useSearch() {
    const [step, setStep] = useState<"search" | "result">("search");
    const isSmall = useMedia('(max-width: 1024px');
    const {
        isPending,
        data = [],
        mutate,
    } = useSearchMutation();

    const handleSearch = ({ kind, query }: { kind: Kind, query: string }) => {
        mutate({ kind, query })
        if (isSmall) {
            setStep("result");
        }
    }

    const empty = !data.length && !isPending ? <div className="grid grid-col-1 place-items-center mx-auto h-[500px]">
        <Text as="span" className="text-center text-muted-gray font-bold">
            There are zero matches. <br />
            Use the form to search for People or Movies.
        </Text>
    </div> : null;

    const elements = data.map(el => <SearchResultItem key={el.uid} uid={el.uid} title={el.title} kind={el.kind} />)

    const loading = isPending ? <div className="grid grid-col-1 place-items-center mx-auto h-[500px]">
        <Text className="text-warm-gray font-bold">Searching...</Text>
    </div> : null;

    const hideResults = isSmall && step === "search";
    const hideSearchBox = isSmall && step === "result";
    const backButton = hideSearchBox && <LinkIcon icon={"chevron-left"} onClick={() => setStep("search")} />

    return {
        handleSearch,
        empty,
        elements,
        loading,
        data,
        hideResults,
        hideSearchBox,
        backButton
    }
}

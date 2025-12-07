import useSearchMutation from "@/api/search";
import { Kind } from "@/types";
import { useState } from "react";
import { useMedia } from "react-use";

export default function useSearch() {
    const [step, setStep] = useState<"search" | "result">("search");
    const isSmall = useMedia('(max-width: 1024px');
    const { isPending, data = [], mutate } = useSearchMutation();
    const hideResults = isSmall && step === "search";
    const hideSearchBox = isSmall && step === "result";
    const isEmpty = !data.length;

    const handleSearch = ({ kind, query }: { kind: Kind, query: string }) => {
        mutate({ kind, query })
        if (isSmall) {
            setStep("result");
        }
    }

    return {
        handleSearch,
        setStep,
        isLoading: isPending,
        isEmpty,
        data,
        hideResults,
        hideSearchBox,
    }
}

import useSearchMutation from "@/api/search";
import { Kind } from "@/types";
import { AxiosError } from "axios";
import { useState } from "react";
import { useMedia } from "react-use";
import { APIError } from "@/types";
import ErrorBox from "@/components/molecules/error-box";
import SearchResultItem from "@/components/molecules/search-result-item";

export default function useSearch() {
    const [step, setStep] = useState<"search" | "result">("search");
    const isSmall = useMedia('(max-width: 1024px');
    const { isPending, data = [], mutate, isError, error } = useSearchMutation();
    const hideResults = isSmall && step === "search";
    const hideSearchBox = isSmall && step === "result";
    const isEmpty = !isError && !data?.length;
    const errorData = (error as AxiosError)?.response?.data as APIError;    

    const handleSearch = ({ kind, query }: { kind: Kind, query: string }) => {
        mutate({ kind, query })
        if (isSmall) {
            setStep("result");
        }
    }

    let content;

    if (isError && !isPending) {
        content = <ErrorBox errors={errorData.errors} />
    } else {
        content = data.map(el => <SearchResultItem key={el.uid} uid={el.uid} title={el.title} kind={el.kind} />)
    }

    return {
        handleSearch,
        setStep,
        isLoading: isPending,
        isError,
        isEmpty,
        hideResults,
        hideSearchBox,
        content,
    }
}

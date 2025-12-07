import Header from "@/components/molecules/header"
import SearchForm from "@/components/molecules/search-form";
import useSearch from "@/hooks/use-search";
import BaseResultBox from "@/components/organisms/base-result-box";
import LinkIcon from "@/components/molecules/link-icon";
    
export default function Search() {
    const { handleSearch, isEmpty, isLoading, hideResults, hideSearchBox, setStep, content} = useSearch();
    const backButton = hideSearchBox && <LinkIcon icon={"chevron-left"} onClick={() => setStep("search")} />

    return (
        <>
            <Header back={backButton} />
            <div className="w-full lg:w-3/4 mx-auto flex lg:flex-row flex-col">
                <SearchForm hidden={hideSearchBox} title={"What are you searching for?"} onSearch={handleSearch} />
                <BaseResultBox.Root hidden={hideResults}>
                    <BaseResultBox.Title>Results</BaseResultBox.Title>
                    {isEmpty && !isLoading && <BaseResultBox.Empty />}
                    {isLoading && <BaseResultBox.Loading />}
                    {content}
                </BaseResultBox.Root>
            </div>
        </>
    )
}

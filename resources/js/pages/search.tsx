import Header from "@/components/molecules/header"
import SearchBox from "@/components/molecules/search-box";
import useSearch from "@/hooks/use-search";
import BaseResultBox from "@/components/organisms/base-result-box";
import SearchResultItem from "@/components/molecules/search-result-item";
import LinkIcon from "@/components/molecules/link-icon";

export default function Search() {
    const { handleSearch, isEmpty, data, isLoading, hideResults, hideSearchBox, setStep } = useSearch();
    const backButton = hideSearchBox && <LinkIcon icon={"chevron-left"} onClick={() => setStep("search")} />
    const content = data.map(el => <SearchResultItem key={el.uid} uid={el.uid} title={el.title} kind={el.kind} />)

    return (
        <>
            <Header back={backButton} />
            <div className="w-full lg:w-1/2 mx-auto flex lg:flex-row flex-col">
                <SearchBox hidden={hideSearchBox} title={"What are you searching for?"} onSearch={handleSearch} />
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

import Header from "@/components/molecules/header"
import SearchBox from "@/components/molecules/search-box";
import useSearch from "@/hooks/use-search";
import { SearchResultBox } from "@/components/molecules/search-result-box";


export default function Search() {
    const { handleSearch, empty, loading, elements, backButton, hideResults, hideSearchBox } = useSearch();
    return (
        <>
            <Header back={backButton} />
            <div className="w-full xl:w-1/2 mx-auto flex xl:flex-row flex-col">
                <SearchBox hidden={hideSearchBox} title={"What are you searching for?"} onSearch={handleSearch} />
                <SearchResultBox hidden={hideResults} title={"Results"}>
                    <>
                        {elements}
                        {empty}
                        {loading}
                    </>
                </SearchResultBox>
            </div>
        </>
    )
}

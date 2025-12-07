import Header from "@/components/molecules/header";
import BasePage from "@/components/organisms/base-page";
import useFilm from "@/hooks/use-film";

export default function Film({ id }: { id: string }) {
    const { backButton, preview, title, crawl, errorComponent } = useFilm(id);

    return (
        <>
            <Header back={backButton} />
            <BasePage.Root>
                {errorComponent}
                {!errorComponent && (
                    <>
                        <BasePage.Title>{title}</BasePage.Title>
                        <BasePage.Content>
                            <BasePage.Details title="Opening Crawl">
                                {crawl}
                            </BasePage.Details>
                            <BasePage.Links title={"Characters"}>{preview}</BasePage.Links>
                        </BasePage.Content>
                    </>
                )}
                <BasePage.Action href={"/"} title={"Back to Search"} />
            </BasePage.Root>
        </>
    )

}

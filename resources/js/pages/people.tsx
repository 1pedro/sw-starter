import Header from "@/components/molecules/header";
import PeopleDetails from "@/components/molecules/people-details";
import BasePage from "@/components/organisms/base-page";
import usePeople from "@/hooks/use-people";

export default function People({ id }: { id: string }) {
    const { backButton, name, gender, height, mass, birth_year, eye_color, hair_color, preview, errorComponent } = usePeople(id);
    return (
        <>
            <Header back={backButton} />
            <BasePage.Root>
                {errorComponent}
                {!errorComponent && (
                    <>
                        <BasePage.Title>{name}</BasePage.Title>
                        <BasePage.Content>
                        <BasePage.Details title="Details">
                        <PeopleDetails birth_year={birth_year} gender={gender} eye_color={eye_color} height={height} mass={mass} hair_color={hair_color} />
                        </BasePage.Details>
                        <BasePage.Links title={"Movies"}>
                            {preview}
                        </BasePage.Links>
                    </BasePage.Content>
        
                    </>
                )}
                <BasePage.Action href={"/"} title={"Back to Search"} />
            </BasePage.Root>
        </>
    )

}

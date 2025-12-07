import Header from "@/components/molecules/header";
import PeopleDetails from "@/components/molecules/people-details";
import useGetPeople from "@/api/people";
import Anchor from "@/components/atoms/anchor";
import BasePage from "@/components/organisms/base-page";
import LinkIcon from "@/components/molecules/link-icon";
import { useMedia } from "react-use";

export default function People({ id }: { id: string }) {

    const isSmall = useMedia('(max-width: 1024px');
    const { data = {
        name: '',
        gender: '',
        height: '',
        mass: '',
        birth_year: '',
        eye_color: '',
        hair_color: '',
        films: []
    } } = useGetPeople(id)

    const preview = data.films.map(address => <Anchor key={address} address={address} />)
    const backButton = isSmall ? <LinkIcon icon={"chevron-left"} href={"/"} /> : null;
    return (
        <>
            <Header back={backButton} />
            <BasePage.Root>
                <BasePage.Title>{data.name}</BasePage.Title>
                <BasePage.Content>
                    <BasePage.Details title="Details">
                        <PeopleDetails {...data} />
                    </BasePage.Details>
                    <BasePage.Links title={"Movies"}>
                        {preview}
                    </BasePage.Links>
                </BasePage.Content>
                <BasePage.Action href={"/"} title={"Back to Search"} />
            </BasePage.Root>
        </>
    )

}

import Header from "@/components/molecules/header";
import Text from "@/components/atoms/text"
import Button from "@/components/atoms/button";
import { Link } from "@inertiajs/react";
import useGetFilm from "@/api/film";
import Anchor from "@/components/atoms/anchor";
import BasePage from "@/components/organisms/base-page";
import { useMedia } from "react-use";
import LinkIcon from "@/components/atoms/link-icon";
export default function Film({ id }: { id: string }) {
    const isSmall = useMedia('(max-width: 1024px');
    const { data = { title: '', opening_crawl: '', characters: [] }, isLoading } = useGetFilm(id);

    const crawl = data.opening_crawl.split(/\r\n\r\n/).map(
        (text, index) => <Text as={"p"} key={index} className="mb-4" >{text}</Text>
    )

    const preview = data.characters.map(address => <Anchor key={address} address={address} />)

    const backButton = isSmall ? <LinkIcon icon={"chevron-left"} href={"/"} /> : null;

    return (
        <>
            <Header back={backButton} />
            <BasePage.Root>
                <BasePage.Title>{data.title}</BasePage.Title>
                <BasePage.Content>
                    <BasePage.Details title="Opening Crawl">{crawl}</BasePage.Details>
                    <BasePage.Links title={"Movies"}>{preview}</BasePage.Links>
                </BasePage.Content>
                <BasePage.Action href={"/"} title={"Back to Search"} />
            </BasePage.Root>
        </>
    )

}

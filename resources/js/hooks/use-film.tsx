import useGetFilm from "@/api/film";
import ErrorBox from "@/components/molecules/error-box";
import { APIError } from "@/types";
import { AxiosError } from "axios";
import { useMedia } from "react-use";
import { type Film } from "@/types";
import useLinkBuilder from "./use-link-builder";
import LinkIcon from "@/components/molecules/link-icon";
import Text from "@/components/atoms/text";

export default function useFilm(id: string) {
    const isSmall = useMedia('(max-width: 1024px');
    const { data = { title: '', opening_crawl: '', characters: [] }, isError, isLoading, error } = useGetFilm(id);
    const errorData = (error as AxiosError)?.response?.data as APIError;
    const errorComponent = isError ? <ErrorBox errors={errorData.errors} /> : null;

    const { title, opening_crawl, characters } = data as Film;
    const crawl = !isLoading && !isError ? opening_crawl.split(/\r\n\r\n/).map(
        (text, index) => <Text as={"p"} key={index} className="mt-2" >{text}</Text>
    ) : [];

    const preview =  useLinkBuilder({ urls: characters || []});
    const backButton = isSmall ? <LinkIcon icon={"chevron-left"} href={"/"} /> : null;

    return {
        backButton,
        preview,
        crawl,
        title,
        errorComponent
    }
}

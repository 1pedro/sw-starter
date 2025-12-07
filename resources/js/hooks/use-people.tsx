
import ErrorBox from "@/components/molecules/error-box";
import { APIError, People } from "@/types";
import { AxiosError } from "axios";
import { useMedia } from "react-use";
import useLinkBuilder from "./use-link-builder";
import LinkIcon from "@/components/molecules/link-icon";
import useGetPeople from "@/api/people";

export default function usePeople(id: string) {
    const isSmall = useMedia('(max-width: 1024px');
    const { data = { name: '', gender: '', height: '', mass: '', birth_year: '', eye_color: '', hair_color: '', films: [] }, isLoading, isError, error } = useGetPeople(id);
    const errorData = (error as AxiosError)?.response?.data as APIError;
    const errorComponent = isError ? <ErrorBox errors={errorData.errors} /> : null;
    const { name, gender, height, mass, birth_year, eye_color, hair_color, films } = data as People;
    const preview =  useLinkBuilder({ urls: films || [] });
    const backButton = isSmall ? <LinkIcon icon={"chevron-left"} href={"/"} /> : null;

    return {
        backButton,
        preview,
        name,
        errorComponent,
        gender,
        height,
        mass,
        birth_year,
        eye_color,
        hair_color,
    }
}


export type Kind = "people" | "films";
export type Search = {
    title: string;
    uid: string;
    kind: Kind;
}

export type Film = {
    title: string;
    characters: string[];
    opening_crawl: string;
}

export type People = {
    name: string;
    gender: string;
    height: string;
    mass: string;
    birth_year: string;
    eye_color: string;
    hair_color: string;
    films: string[];
}

export type Preview = {
    title?: string;
    name?: string;
}

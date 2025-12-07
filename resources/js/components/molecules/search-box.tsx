import { useState } from "react";
import Button from "../atoms/button";
import Input from "../atoms/input";
import Text from "../atoms/text";
import { Kind } from "@/types";

type SearchBoxState = { kind: Kind, query: string }
export type SearchBoxProps = {
    title: string,
    hidden: boolean,
    onSearch: (state: SearchBoxState) => void
}
export default function SearchBox(props: SearchBoxProps) {
    const [state, setState] = useState<SearchBoxState>({ kind: "people", query: "" })

    return (
        <div hidden={props.hidden} className="w-full lg:w-1/3 bg-white rounded-md flex flex-col lg:m-5 space-y-5 p-6 lg:h-full h-screen shadow-md shadow-warm-gray">
            <Text as="span">{props.title}</Text>
            <div className="flex justify-start space-x-2">
                <Input type="radio" id="people" name="content" defaultChecked={true} onChange={(e) => setState(s => ({ ...s, kind: e.target.checked ? "people" : s.kind }))} /> <Text as="label" htmlFor={"people"} className="mr-6">People</Text>
                <Input type="radio" id="films" name="content" onChange={(e) => setState(s => ({ ...s, kind: e.target.checked ? "films" : s.kind }))} /> <Text as="label" htmlFor={"films"}>Movies</Text>
            </div>
            <Input type="text" onChange={(e) => setState(s => ({ ...s, query: e.target.value }))} className="w-full border border-warm-gray rounded-md p-2" />
            <Button className="cursor-pointer rounded-full w-11/12 lg:w-full text-white uppercase font-bold p-2 self-center bottom-[50px] fixed lg:relative lg:bottom-0" disabled={!state.query} onClick={() => props.onSearch(state)}>Search</Button>
        </div>
    )
}

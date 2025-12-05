import ActionButton from "@/components/action-button";
import Header from "@/components/header"
import ListItem from "@/components/list-item";

export default function Search() {
    const result = [
        { text: "Name", kind: "people", id: "1" },
        { text: "Name", kind: "people", id: "1" },
        { text: "Name", kind: "people", id: "1" },
        { text: "Name", kind: "people", id: "1" },
        { text: "Name", kind: "people", id: "1" },
    ]

    const empty = !result.length ? <div className="grid grid-col-1 place-items-center mx-auto h-[500px]">
        <span className="text-center text-muted-gray font-bold">
            There are zero matches. <br />
            Use the form to search for People or Movies.
        </span>
    </div> : null;
    const elements = result.map(el => <ListItem text={el.text} />)

    return (
        <>
            <Header />
            <div className="w-full xl:w-1/2 mx-auto flex xl:flex-row flex-col">
                <div className="w-full xl:w-1/3 bg-white rounded-md flex flex-col xl:m-5 space-y-5 p-6 xl:h-full h-screen shadow-md shadow-warm-gray">
                    <span>What are you searching for?</span>
                    <div className="flex justify-start space-x-2">
                        <input type="radio" id="people" name="content" defaultChecked={true} /> <label htmlFor={"people"}>People</label>
                        <input type="radio" id="movies" name="content" /> <label htmlFor={"movies"}>Movies</label>
                    </div>
                    <input type="text" id="searching" className="w-full h-[50px] border border-black rounded-md" />
                    <ActionButton onClick={() => undefined}>Search</ActionButton>
                </div>
                <div className="xl:w-2/3 bg-white rounded-md m-5 flex flex-col m-5 space-y-5 p-6  shadow-md shadow-warm-gray">
                    <ListItem text={"Results"} />
                    {elements}
                    {empty}
                </div>
            </div>
        </>
    )
}

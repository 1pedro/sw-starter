import Header from "@/components/header"

export default function Search() {
    const result = []

    const empty = !result.length ? <div className="grid grid-col-1 place-items-center mx-auto h-[500px]">
        <span className="text-center text-muted-gray font-bold">
            There are zero matches. <br />
            Use the form to search for People or Movies.
        </span>
    </div> : null;


    return (
        <>
            <Header />
            <div className="w-full xl:w-1/2 mx-auto xl:flex-row flex-col">
                <div className="w-full xl:w-1/3 bg-white rounded-md flex flex-col xl:m-5 space-y-5 p-6 xl:h-full h-screen">
                    <span>What are you searching for?</span>
                    <div className="flex justify-start space-x-2">
                        <input type="radio" id="people" name="content" checked={true} /> <label htmlFor={"people"}>People</label>
                        <input type="radio" id="movies" name="content" /> <label htmlFor={"movies"}>Movies</label>
                    </div>
                    <input type="text" id="searching" className="w-full h-[50px] border border-black rounded-md" />
                    <button className="rounded-full bg-default-green text-white uppercase font-bold p-2  bottom-[20px] w-full">Search</button>
                </div>
                <div className="xl:w-2/3 bg-white rounded-md m-5 flex flex-col m-5 space-y-5 p-6">
                    <h2 className="font-bold text-xl pb-3 border-b border-muted-gray">Results</h2>
                    {empty}
                </div>
            </div>
        </>
    )
}

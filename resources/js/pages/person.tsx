import Header from "@/components/header";
import Text from "@/components/atoms/text"
import ActionButton from "@/components/action-button";
import person from "@/mocks/person"
import PersonDetails from "@/components/molecules/person-details";
export default function Person() {

    const details = person.result.properties;

    return (
        <>
            <Header />
            <div className="w-1/2 mx-auto">
                <div className="w-full  bg-white rounded-md flex flex-col xl:m-5 space-y-5 p-6 xl:h-full h-screen shadow-md shadow-warm-gray">
                    <Text as="h2" className="font-bold text-xl">{person.result.properties.name}</Text>
                    <div className="flex space-x-20">
                        <div className="w-1/2">
                            <Text as={"h3"} className="font-bold pb-2 border-b-2 border-warm-gray">Details</Text>
                            <PersonDetails {...details} />
                            <ActionButton className={"uppercase"} onClick={() => undefined}>Back to Search</ActionButton>
                        </div>

                        <div className="w-1/2">
                            <Text as={"h3"} className="font-bold pb-2 border-b-2 border-warm-gray">Movies</Text>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

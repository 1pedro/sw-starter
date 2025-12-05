import Header from "@/components/header";
import Text from "@/components/atoms/text"
import Button from "@/components/atoms/button";
import movie from "@/mocks/film"
import { Link } from "@inertiajs/react";
export default function Movie() {

    const crawl = movie.result.properties.opening_crawl.split(/\r\n\r\n/).map(

        text => <Text as={"p"} className="mb-4" >{text}</Text>
    )

    return (
        <>
            <Header />
            <div className="w-1/2 mx-auto">
                <div className="w-full  bg-white rounded-md flex flex-col xl:m-5 space-y-5 p-6 xl:h-full h-screen shadow-md shadow-warm-gray">
                    <Text as="h2" className="font-bold text-xl">{movie.result.properties.title}</Text>
                    <div className="flex space-x-20">
                        <div className="w-1/2">
                            <Text as={"h3"} className="font-bold pb-2 border-b-2 border-warm-gray">Opening Crawl</Text>
                            {crawl}
                            <Link href="/">
                                <Button className={"uppercase"}>Back to Search</Button>
                            </Link>
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

import Text from "@/components/atoms/text"
import { Link } from "@inertiajs/react"
import { Kind } from "@/types"

export default function SearchResult({ title, uid, kind }: { title: string, uid: string, kind: Kind }) {

    return (
        <div className="flex flex-col xl:flex-row justify-between xl:items-center pb-3 border-b border-muted-gray">
            <Text className={"font-bold text-xl mb-4 xl:mb-0"} key={uid}>{title}</Text>
            <Link as="button" href={`/${kind}/${uid}`} className="cursor-pointer bg-green-teal hover:bg-green-emerald rounded-full py-2 px-4 self-center w-full xl:w-auto mb-2 xl:mb-0">
                <Text as={"span"} className="uppercase text-white font-bold">See Details</Text>
            </Link>
        </div>
    )

}

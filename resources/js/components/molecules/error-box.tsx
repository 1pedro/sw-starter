import Text from "@/components/atoms/text";

export default function ErrorBox({ errors = []}: {errors: string[]}) {
    return (
        <div className="grid grid-col-1 place-items-center mx-auto h-[500px]">
           <div className="text-center">
           {errors.map((error) => (
                <Text className="text-red-300 font-bold" key={error}>{error}</Text>
            ))}
           </div>
        </div>
    )
}

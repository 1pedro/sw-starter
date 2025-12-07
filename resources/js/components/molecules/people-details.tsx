import Text from "@/components/atoms/text"

export default function PeopleDetails(props: { birth_year: string, gender: string, eye_color: string, height: string, mass: string, hair_color: string }) {

    const properties = {
        "Birth Year": props.birth_year,
        "Gender": props.gender,
        "Eye Color": props.eye_color,
        "Hair Color": props.hair_color,
        "Height": props.height,
        "Mass": props.mass
    }

    const elements = Object.entries(properties)
        .map(([title, value]) => <Text as="span" key={title}>{title}: {value}</Text>)

    return (
        <div className="flex flex-col">
            {elements}
        </div>
    )
}

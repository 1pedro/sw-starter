export default function ListItem({ text }: { text: string }) {
    return (
        <h2 className="font-bold text-xl pb-3 border-b border-muted-gray">{text}</h2>
    )
}

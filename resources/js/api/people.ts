
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { People } from '@/types';

async function getPeople(id: string): Promise<People> {
    const { data } = await api("/api").get<People>(
        `/people/${id}`,
    )

    return data
}

export default function useGetPeople(id: string) {
    return useQuery({
        queryKey: ["films", id],
        queryFn: () => getPeople(id),
    })
}


import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { People, APIError } from '@/types';

async function getPeople(id: string): Promise<People | APIError> {
    const { data } = await api("/api").get<People | APIError>(
        `/people/${id}`,
    )

    return data
}

export default function useGetPeople(id: string) {
    return useQuery({
        retry: false,
        queryKey: ["films", id],
        queryFn: () => getPeople(id),
    })
}

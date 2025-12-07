
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Film, APIError } from '@/types';

async function getFilm(id: string): Promise<Film | APIError> {
    const { data } = await api("/api").get<Film | APIError>(
        `/films/${id}`,
    )

    return data
}

export default function useGetFilm(id: string) {
    return useQuery({
        retry: false,
        queryKey: ["films", id],
        queryFn: () => getFilm(id),
    })
}

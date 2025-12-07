
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Film } from '@/types';

async function getFilm(id: string): Promise<Film> {
    const { data } = await api("/api").get<Film>(
        `/films/${id}`,
    )

    return data
}

export default function useGetFilm(id: string) {
    return useQuery({
        queryKey: ["films", id],
        queryFn: () => getFilm(id),
    })
}

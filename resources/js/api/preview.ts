
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Preview } from '@/types';

async function getPreview(path: string): Promise<Preview> {
    const { data } = await api("/api").get<Preview>(
        path,
    )

    return data
}

export default function useGetPreview(path: string) {
    return useQuery({
        queryKey: ["preview", path],
        queryFn: () => getPreview(path),
    })
}

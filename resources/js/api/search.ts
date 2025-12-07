
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Kind, Search } from '@/types';

async function search(kind: Kind, query: string): Promise<Search[]> {
    const { data } = await api("/api").get<Search[]>(
        `/search/${kind}`,
        { params: { query } }
    )

    return data
}

export default function useSearchMutation() {
    // Workaround
    // Given the useQuery expects to have all params to execute the query, i couldn't use it.
    // Since I only have the params when handleSearch is clicked, it only works using a useMutation.
    return useMutation({
        mutationFn: ({ kind, query }: { kind: Kind, query: string }) => search(kind, query),
    })
}

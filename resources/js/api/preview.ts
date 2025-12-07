
import { useQueries } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Preview, APIError } from '@/types';

async function getPreview(path: string): Promise<Preview | APIError> {
    const { data } = await api("/api").get<Preview | APIError>(
        path,
    )

    return data
}

export default function useGetPreview(urls: string[]) {

    return useQueries({
        queries: urls.map(url => {
            const [_, path] = url.split("/api");
            return {
                queryKey: ["preview", path],
                queryFn: () => getPreview(path),
            }
        }),
    })
}

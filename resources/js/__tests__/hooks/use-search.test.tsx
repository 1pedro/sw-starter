import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('@/api/search', () => {
    const mutate = vi.fn();
    return {
        default: () => ({
            isPending: false,
            data: [],
            mutate,
        }),
        __esModule: true,

        mutate,
    };
});

vi.mock('react-use', () => {
    return {
        useMedia: vi.fn().mockReturnValue(false),
    };
});

import useSearch from '@/hooks/use-search';
import { useMedia } from 'react-use';
// @ts-expect-error exported for tests through mock factory
import { mutate as mockedMutate } from '@/api/search';

describe('useSearch', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('expect initial state matches', () => {
        (useMedia as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false);
        const { result } = renderHook(() => useSearch());
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isEmpty).toBe(true);
        expect(result.current.data).toEqual([]);
        expect(result.current.hideResults).toBe(false);
        expect(result.current.hideSearchBox).toBe(false);
    });

    it('should call mutate on handleSearch and keep hide variables unchanged', () => {
        (useMedia as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false);
        const { result } = renderHook(() => useSearch());
        act(() => {
            result.current.handleSearch({ kind: 'people', query: 'luke' });
        });
        expect(mockedMutate).toHaveBeenCalledWith({ kind: 'people', query: 'luke' });

        expect(result.current.hideResults).toBe(false);
        expect(result.current.hideSearchBox).toBe(false);
    });

    it('switches to result step on small screens after searching and update hide variables', () => {
        (useMedia as unknown as ReturnType<typeof vi.fn>).mockReturnValue(true);
        const { result } = renderHook(() => useSearch());
  
        expect(result.current.hideResults).toBe(true);
        expect(result.current.hideSearchBox).toBe(false);
        act(() => {
            result.current.handleSearch({ kind: 'films', query: 'hope' });
        });
        expect(mockedMutate).toHaveBeenCalledWith({ kind: 'films', query: 'hope' });

        expect(result.current.hideResults).toBe(false);
        expect(result.current.hideSearchBox).toBe(true);
    });
});



import { renderHook } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import useFilm from '@/hooks/use-film';
import { useMedia } from 'react-use';

vi.mock('react-use', () => {
	return {
		useMedia: vi.fn().mockReturnValue(false),
	};
});

vi.mock('@/hooks/use-link-builder', () => {
	return {
		__esModule: true,
		default: vi.fn().mockReturnValue(['p1', 'p2']),
	};
});

vi.mock('@/api/film', () => {
	let response = {
		data: {
			title: 'A New Hope',
			opening_crawl: '',
			characters: [],
		},
		isError: false,
		isLoading: false,
		error: undefined,
	};

	return {
		__esModule: true,
		default: vi.fn(() => response),
		__setResponse: (next: typeof response) => {
			response = next;
		},
	};
});

// @ts-expect-error exported only for tests through mock factory
import { __setResponse as setFilmResponse } from '@/api/film';

describe('useFilm', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		(useMedia as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false);
		setFilmResponse({
			data: {
				title: 'A New Hope',
				opening_crawl: '',
				characters: [],
			},
			isError: false,
			isLoading: true,
			error: undefined,
		});
	});

	it('returns expected baseline values when not small screen and loading', () => {
		const { result } = renderHook(() => useFilm('1'));
		expect(result.current.title).toBe('A New Hope');
		expect(result.current.backButton).toBeNull();
		expect(result.current.errorComponent).toBeNull();
		expect(result.current.preview).toHaveLength(2); 
		expect(result.current.crawl).toEqual([]); 
	});

	it('renders back button on small screens', () => {
		(useMedia as unknown as ReturnType<typeof vi.fn>).mockReturnValue(true);
		const { result } = renderHook(() => useFilm('1'));
		expect(result.current.backButton).not.toBeNull();
	});

	it('builds crawl paragraphs when loaded and no error', () => {
		setFilmResponse({
			data: {
				title: 'A New Hope',
				opening_crawl: 'para1\r\n\r\npara2',
				characters: [],
			},
			isError: false,
			isLoading: false,
			error: undefined,
		});

		const { result } = renderHook(() => useFilm('1'));
		expect(result.current.crawl).toHaveLength(2);
	});

	it('returns errorComponent when request errors', () => {
		setFilmResponse({
			data: {
				title: '',
				opening_crawl: '',
				characters: [],
			},
			isError: true,
			isLoading: false,
			error: { response: { data: { errors: [{ message: 'boom' }] } } } as unknown as Error,
		});

		const { result } = renderHook(() => useFilm('1'));
		expect(result.current.errorComponent).not.toBeNull();
	});
});



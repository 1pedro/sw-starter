import { renderHook } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import usePeople from '@/hooks/use-people';
import { useMedia } from 'react-use';

vi.mock('react-use', () => {
	return {
		useMedia: vi.fn().mockReturnValue(false),
	};
});

vi.mock('@/hooks/use-link-builder', () => {
	return {
		__esModule: true,
		default: vi.fn().mockReturnValue(['link1', 'link2', 'link3']),
	};
});

vi.mock('@/api/people', () => {
	let response = {
		data: {
			name: 'Luke Skywalker',
			gender: 'male',
			height: '172',
			mass: '77',
			birth_year: '19BBY',
			eye_color: 'blue',
			hair_color: 'blond',
			films: ['f1', 'f2', 'f3'],
		},
		isError: false,
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
import { __setResponse as setPeopleResponse } from '@/api/people';

describe('usePeople', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		(useMedia as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false);
		setPeopleResponse({
			data: {
				name: 'Luke Skywalker',
				gender: 'male',
				height: '172',
				mass: '77',
				birth_year: '19BBY',
				eye_color: 'blue',
				hair_color: 'blond',
				films: ['f1', 'f2', 'f3'],
			},
			isError: false,
			error: undefined,
		});
	});

	it('returns expected baseline values when not small screen', () => {
		const { result } = renderHook(() => usePeople('1'));
		expect(result.current.backButton).toBeNull();
		expect(result.current.name).toBe('Luke Skywalker');
		expect(result.current.gender).toBe('male');
		expect(result.current.height).toBe('172');
		expect(result.current.mass).toBe('77');
		expect(result.current.birth_year).toBe('19BBY');
		expect(result.current.eye_color).toBe('blue');
		expect(result.current.hair_color).toBe('blond');
		expect(result.current.preview).toHaveLength(3); 
		expect(result.current.errorComponent).toBeNull();
	});

	it('renders back button on small screens', () => {
		(useMedia as unknown as ReturnType<typeof vi.fn>).mockReturnValue(true);
		const { result } = renderHook(() => usePeople('1'));
		expect(result.current.backButton).not.toBeNull();
	});

	it('returns errorComponent when request errors', () => {
		setPeopleResponse({
			data: {
				name: '',
				gender: '',
				height: '',
				mass: '',
				birth_year: '',
				eye_color: '',
				hair_color: '',
				films: [],
			},
			isError: true,
			error: { response: { data: { errors: [{ message: 'boom' }] } } } as unknown as Error,
		});

		const { result } = renderHook(() => usePeople('1'));
		expect(result.current.errorComponent).not.toBeNull();
	});
});



import { render, screen } from '@testing-library/react';
import BaseResultBox from '@/components/organisms/base-result-box';
import { describe, it, expect } from 'vitest';

describe('BaseResultBox', () => {
    it('renders root correctly', () => {
        render(
            <BaseResultBox.Root>
                <BaseResultBox.Title>Results</BaseResultBox.Title>
                <div>mock child content</div>
            </BaseResultBox.Root>
        );

        expect(screen.getByText('Results')).toBeInTheDocument();
        expect(screen.getByText('mock child content')).toBeInTheDocument();
    });

    it('renders empty', () => {
        render(<BaseResultBox.Empty />);
        expect(
            screen.getByText(/there are zero matches\./i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/use the form to search/i)
        ).toBeInTheDocument();
    });

    it('renders loading', () => {
        render(<BaseResultBox.Loading />);
        expect(screen.getByText(/searching\.\.\./i)).toBeInTheDocument();
    });
});



import { render, screen } from '@testing-library/react';
import Header from '@/components/molecules/header';
import { describe, it, expect } from 'vitest';

describe('Header', () => {
    it('renders title', () => {
        render(<Header />);
        expect(screen.getByRole('heading', { name: 'SWStarter' })).toBeInTheDocument();
    });

    it('renders back button', () => {
        render(<Header back={<span data-testid="back-el" />} />);
        expect(screen.getByTestId('back-el')).toBeInTheDocument();
    });
});



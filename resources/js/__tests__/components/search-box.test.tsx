import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '@/components/molecules/search-box';
import { vi, describe, it, expect } from 'vitest';

describe('SearchBox', () => {
    it('it renders and keep Search button disabled until query is typed', async () => {
        const user = userEvent.setup();
        const onSearch = vi.fn();
        render(<SearchBox hidden={false} title="What are you searching for?" onSearch={onSearch} />);

        expect(screen.getByText('What are you searching for?')).toBeInTheDocument();
        const button = screen.getByRole('button', { name: /search/i });
        expect(button).toBeDisabled();

        const input = screen.getByRole('textbox');
        await user.type(input, 'luke');
        expect(button).toBeEnabled();
    });

    it('should have kind=people by default', async () => {
        const user = userEvent.setup();
        const onSearch = vi.fn();
        render(<SearchBox hidden={false} title="Search" onSearch={onSearch} />);

        const input = screen.getByRole('textbox');
        await user.type(input, 'leia');
        await user.click(screen.getByRole('button', { name: /search/i }));

        expect(onSearch).toHaveBeenCalledWith({ kind: 'people', query: 'leia' });
    });

    it('can change kind to films when Movies is selected', async () => {
        const user = userEvent.setup();
        const onSearch = vi.fn();
        render(<SearchBox hidden={false} title="Search" onSearch={onSearch} />);

        const moviesRadio = screen.getByLabelText(/movies/i);
        await user.click(moviesRadio);

        const input = screen.getByRole('textbox');
        await user.type(input, 'hope');
        await user.click(screen.getByRole('button', { name: /search/i }));

        expect(onSearch).toHaveBeenCalledWith({ kind: 'films', query: 'hope' });
    });
});



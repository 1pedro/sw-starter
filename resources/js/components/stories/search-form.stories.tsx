import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import SearchForm from '../molecules/search-form';

const meta = {
    title: 'Molecules/SearchForm',
    component: SearchForm,
    args: {
        title: 'Search',
        hidden: false,
        onSearch: fn(),
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Hidden: Story = {
    args: { hidden: true },
};



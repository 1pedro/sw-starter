import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchResult from '../molecules/search-result-item';

const meta = {
    title: 'Molecules/SearchResultItem',
    component: SearchResult,
    tags: ['autodocs'],
} satisfies Meta<typeof SearchResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Luke Skywalker',
        uid: '1',
        kind: 'people',
    },
};



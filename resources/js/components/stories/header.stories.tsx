import type { Meta, StoryObj } from '@storybook/react-vite';
import Header from '../molecules/header';
import LinkIcon from '../molecules/link-icon';

const meta = {
    title: 'Molecules/Header',
    component: Header,
    tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBack: Story = {
    args: {
        back: <LinkIcon icon="chevron-left" href="/" />,
    },
};



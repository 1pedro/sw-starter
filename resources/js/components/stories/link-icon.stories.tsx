import type { Meta, StoryObj } from '@storybook/react-vite';
import LinkIcon from '../molecules/link-icon';

const meta = {
    title: 'Molecules/LinkIcon',
    component: LinkIcon,
    tags: ['autodocs'],
} satisfies Meta<typeof LinkIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChevronAsLink: Story = {
    args: {
        icon: 'chevron-left',
        href: '/',
    },
};

export const ChevronAsIcon: Story = {
    args: {
        icon: 'chevron-left',
    },
};



import type { Meta, StoryObj } from '@storybook/react-vite';
import Anchor from '../atoms/anchor';

const meta = {
    title: 'Atoms/Anchor',
    component: Anchor,
    args: {
        address: '/people/1',
        text: 'Luke Skywalker',
        isLoading: false,
    },
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Anchor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
    args: {
        isLoading: true,
        text: '',
    },
};
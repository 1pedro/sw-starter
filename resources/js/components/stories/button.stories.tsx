import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../atoms/button';

const meta = {
    title: 'Atoms/Button',
    component: Button,
    args: {
        children: 'Button',
    },
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
    args: {
        disabled: true,
        children: 'Disabled',
    },
};
    


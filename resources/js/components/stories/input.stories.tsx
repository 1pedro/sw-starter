import type { Meta, StoryObj } from '@storybook/react-vite';
import Input from '../atoms/input';

const meta = {
    title: 'Atoms/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextInput: Story = {
    args: {
        type: 'text',
        placeholder: 'Type here...',
        className: 'border border-warm-gray rounded-md p-2',
    },
};

export const RadioChecked: Story = {
    args: {
        type: 'radio',
        defaultChecked: true,
    },
};



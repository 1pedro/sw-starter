import type { Meta, StoryObj } from '@storybook/react-vite';
import ErrorBox from '../molecules/error-box';

const meta = {
    title: 'Molecules/ErrorBox',
    component: ErrorBox,
    args: {
        errors: ['Something went wrong. Please try again.'],
    },
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ErrorBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleError: Story = {
    args: {
        errors: ['Failed to fetch data.'],
    }
};

export const MultipleErrors: Story = {
    args: {
        errors: [
            'Failed to fetch data.',
            'Network connection lost.',
            'Please check your input and try again.',
        ],
    },
};

export const Empty: Story = {
    args: {
        errors: [],
    },
};



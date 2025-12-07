import type { Meta, StoryObj } from '@storybook/react-vite';
import Text from '../atoms/text';

const meta = {
    title: 'Atoms/Text',
    component: Text,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        as: {control: 'select', options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span']},
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Paragraph: Story = {
    args: {
        children: 'This is a paragraph of text.',
    },
};

export const Heading: Story = {
    args: {
        as: 'h2',
        className: 'font-bold text-xl',
        children: 'Heading Text',
    },
};

export const SpanMuted: Story = {
    args: {
        as: 'span',
        className: 'text-muted-gray',
        children: 'Muted span text',
    },
};



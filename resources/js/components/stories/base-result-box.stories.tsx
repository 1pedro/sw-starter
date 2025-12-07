import type { Meta, StoryObj } from '@storybook/react-vite';
import BaseResultBox from '../organisms/base-result-box';

const meta = {
    title: 'Organisms/BaseResultBox',
    component: BaseResultBox.Root,
    args: {
        children: undefined,
    },
    tags: ['autodocs'],
} satisfies Meta<typeof BaseResultBox.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithContent: Story = {
    render: () => (
        <BaseResultBox.Root>
            <BaseResultBox.Title>Results</BaseResultBox.Title>
            <div>Item 1</div>
            <div>Item 2</div>
        </BaseResultBox.Root>
    ),
};

export const Empty: Story = {
    render: () => (
        <BaseResultBox.Root>
            <BaseResultBox.Title>Results</BaseResultBox.Title>
            <BaseResultBox.Empty />
        </BaseResultBox.Root>
    ),
};

export const Loading: Story = {
    render: () => (
        <BaseResultBox.Root>
            <BaseResultBox.Title>Results</BaseResultBox.Title>
            <BaseResultBox.Loading />
        </BaseResultBox.Root>
    ),
};



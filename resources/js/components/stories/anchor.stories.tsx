import type { Meta, StoryObj } from '@storybook/react-vite';
import Anchor from '../atoms/anchor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const meta = {
    title: 'Atoms/Anchor',
    component: Anchor,
    args: {
        address: '/api/people/1',
    },
    decorators: [
        (Story, context) => {
            const client = new QueryClient();
            const address: string = context.args.address ?? '/api/people/1';
            const [_, path] = address.split('/api');
            client.setQueryData(['preview', path], { name: 'Luke Skywalker' });
            return (
                <QueryClientProvider client={client}>
                    <Story />
                </QueryClientProvider>
            );
        },
    ],
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Anchor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};



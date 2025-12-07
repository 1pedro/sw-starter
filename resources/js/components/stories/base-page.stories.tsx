import type { Meta, StoryObj } from '@storybook/react-vite';
import BasePage from '../organisms/base-page';

const meta = {
    title: 'Organisms/BasePage',
    component: BasePage.Root,
    tags: ['autodocs'],
} satisfies Meta<typeof BasePage.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Composed: Story = {
    render: () => (
        <BasePage.Root>
            <BasePage.Title>People Details</BasePage.Title>
            <BasePage.Content>
                <BasePage.Details title="Details">
                    <div>Some detail here</div>
                </BasePage.Details>
                <BasePage.Links title="Related">
                    {/* Example anchors expect backend API; replace with placeholders */}
                    <a className="inline-block mr-4 mt-2 text-vivid-blue" href="#">Item 1</a>
                    <a className="inline-block mr-4 mt-2 text-vivid-blue" href="#">Item 2</a>
                </BasePage.Links>
            </BasePage.Content>
            <BasePage.Action title="Go Back" href="/" />
        </BasePage.Root>
    ),
};



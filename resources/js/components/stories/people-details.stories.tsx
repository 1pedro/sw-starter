import type { Meta, StoryObj } from '@storybook/react-vite';
import PeopleDetails from '../molecules/people-details';

const meta = {
    title: 'Molecules/PeopleDetails',
    component: PeopleDetails,
    tags: ['autodocs'],
} satisfies Meta<typeof PeopleDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
    args: {
        birth_year: '19BBY',
        gender: 'male',
        eye_color: 'blue',
        height: '172',
        mass: '77',
        hair_color: 'blond',
    },
};



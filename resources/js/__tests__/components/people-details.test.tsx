import { render, screen } from '@testing-library/react';
import PeopleDetails from '@/components/molecules/people-details';
import { describe, it, expect } from 'vitest';

describe('PeopleDetails', () => {
    it('renders all people details', () => {
        render(
            <PeopleDetails
                birth_year="19BBY"
                gender="male"
                eye_color="blue"
                height="172"
                mass="77"
                hair_color="blond"
            />
        );

        expect(screen.getByText(/birth year: 19BBY/i)).toBeInTheDocument();
        expect(screen.getByText(/gender: male/i)).toBeInTheDocument();
        expect(screen.getByText(/eye color: blue/i)).toBeInTheDocument();
        expect(screen.getByText(/hair color: blond/i)).toBeInTheDocument();
        expect(screen.getByText(/height: 172/i)).toBeInTheDocument();
        expect(screen.getByText(/mass: 77/i)).toBeInTheDocument();
    });
});



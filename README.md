# SW Starter
A Laravel star wars BFF 


## System Requirements
- php 8.4.1
- composer 2.8.12

## Clone & Run
```bash
git clone https://github.com/1pedro/sw-starter

cd sw-starter

cp .env.example .env

composer install

php artisan key:generate

touch database/database.sqlite

./vendor/bin/sail up -d

./vendor/bin/sail artisan migrate

./vendor/bin/sail npm install

./vendor/bin/sail npm run build
```

## Docs
- [Sequence Diagrams](https://github.com/1pedro/sw-starter/blob/main/docs/sequence-diagrams.md)


## Development Decisions

### Backend

- BFF Approach
    - Using BFF approach no persistent database was defined (only a sqlite file for statistics), keeping the SWAPI as the source of truth of Films and People.
        - Benefits:
            - Prevent inconsistency
            - Enforce UI-specific transformations
            - Reduce response payloads
        - Drawbacks:
            - Results are slow on startup (given there's no cache)
- Workers
    - A scheduled worker handles recurring job
    - A queue worker listens for background tasks
    - Benefits:
        - Improves throughput and responsiveness
        - Offloads heavy or asynchronous operations from the main request cycle
        - increases reliability and scalability
    - Drawbacks:
        - Using this approach on production increase costs
- Server Side Caching
    - Given there's no personal data moving through the API a server side cache was applied to benefit all customers.
    - Benefits:
        - Increase Performance
        - Lower latency
        - Easily Configurable through env var 
        - Improve UX
    - Drawbacks:
        - On scenarios of slow internet connections the application will be slow (compared with frontend cache).
- Clean Controllers
    - Hard work is kept on Adapters (DTOs) or on the SwapiClient
    - Benefits:
        - Increase readability
        - Clear separation of concerns (request parsing, validation, response formatting)
- Documentation
    - Sequence diagrams
    - Swagger for API definition
- Tests
    - Unit tests
    - Feature Tests

### Frontend

- Atomic Design
    - Benefits:
        - Lower coupling
        - Higher reusability
        - Consistency ui patterns
        - Easier maintenance
- Custom Hooks
    - Benefits:
        - Components focused on UI only (Small components)
        - Easier to test
        - Better separation of concerns
- Composition Pattern
    - Benefits:
    - Complements Atomic Design principles 
    - Encourages flexible and extensible UI building blocks
- Strongly Typed
    - Benefits:
        - Better DX
        - Enable safer refactoring
        - Strong contract between Backend & Frontend
- Documentation
    - Storybook for component documentation and exploration
- Tests
    - Snapshot & Hooks tests


## Pending Improvements
Due to a bunch of reasons, the biggest one being lack of time, some improvements could not be implemented.

Here are a few ones:

- URL State on the search page 
- Most of the molecules components does not accept className so they are not too reusable.
- Components variants with class-variance-authority.
- Clear sqlite file after processing statistics so this file does not grow indefinitely.
- Selenium tests.
- use-link-builder is missing tests.

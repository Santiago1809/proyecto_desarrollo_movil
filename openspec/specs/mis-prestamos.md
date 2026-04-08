# Mis Prestamos - Spec (Hybrid Mode)

## Purpose
- Define the requirements and acceptance criteria for the Mis Prestamos screen integration within the app.

## Scope
- Implement a screen that lists loans for the current user, with a simple, readable UI and navigation from the MenuModal.

## Actors
- User: Views and interacts with the list of loans.
- System: Provides loan data to the screen (mocked in this spec for hybrid mode).

## Functional Requirements
- FR1: The MenuModal must provide a navigation option to the Mis Prestamos screen.
- FR2: The navigation stack must include a route named MisPrestamos.
- FR3: The Mis Prestamos screen must render a list of loan entries with minimal fields: id, customer, amount, status, date.
- FR4: Data can be mocked (hybrid mode) but the UI should gracefully handle empty state.
- FR5: The screen should display a header title "Mis Prestamos".

## Non-Functional / Design Notes
- NFR1: The screen should be responsive to different screen sizes and use a simple list layout.
- NFR2: Styling should be minimal and consistent with existing app theme.

## Data Model (Mock)
- Loan: { id: string, customer: string, amount: number, status: string, date: string }

## UI/UX Flows
- User opens the app, navigates to Mis Prestamos via MenuModal, sees a list of loans, each item shows basic details.

## Acceptance Criteria
- AC1: Tapping Mis Prestamos navigates to the screen.
- AC2: Mis Prestamos screen renders a list with at least 2 mock items.
- AC3: The screen shows a header title Mis Prestamos.
- AC4: Empty state is gracefully handled.

## References
- Topic: sdd/mis-prestamos/spec

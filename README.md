##Campus Life Planner

## 1. Project Overview

Campus Life Planner is a responsive web application designed to help students organize their campus activities, assignments, meetings, and personal tasks. It allows students to manage deadlines, track activity durations, and organize records using tags.

## 2. Project Objectives

- Help students organize tasks and campus events.
- Track deadlines and activity durations.
- Allow students to search and sort records efficiently.
- Save data locally so it remains available after refreshing the page.
- Provide an accessible and responsive user experience.

## 3. Target Users

The target users are university students who need a simple tool to manage academic responsibilities and campus activities.

## 4. Core Features

- Dashboard displaying task statistics and duration totals.
- Add, edit, and delete tasks or events.
- Search using regular expressions.
- Sort records by title, date, and duration.
- Organize activities using tags.
- Save and load data using localStorage.
- Import and export JSON files.
- Set duration targets and convert minutes to hours.
- Validate inputs and display helpful error messages.

## 5. Data Model

Each activity will contain:

- `id`: Unique record identifier.
- `title`: Activity title.
- `dueDate`: Activity date in YYYY-MM-DD format.
- `duration`: Estimated or planned duration in minutes.
- `tag`: Activity category.
- `createdAt`: Date and time the record was created.
- `updatedAt`: Date and time the record was last updated.

## 6. Accessibility Plan

- Use semantic HTML landmarks and headings.
- Associate labels with form inputs.
- Provide a skip-to-content link.
- Ensure keyboard navigation works throughout the application.
- Display visible keyboard focus indicators.
- Announce updates and errors using ARIA live regions.
- Use readable text and sufficient color contrast.
- Respect reduced-motion preferences.

## 7. Responsive Design

The application will use a mobile-first layout with Flexbox and media queries. It will support small mobile screens, tablets, laptops, and larger desktop displays.

## 8. Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Regular expressions
- localStorage
- JSON

## 9. Wireframe and Page Layout

The application will have a simple dashboard layout that helps students find important information quickly.

### Desktop Layout

```text
+------------------------------------------------------+
| Campus Life Planner                 About | Settings |
+------------------------------------------------------+
| Dashboard                                            |
|                                                      |
| Total Tasks | Completed | Upcoming | Total Duration  |
|                                                      |
+------------------------------------------------------+
| Search Activities                 Sort By            |
+------------------------------------------------------+
| Activity Title | Due Date | Duration | Tag | Actions |
|------------------------------------------------------|
| Complete assignment | 2026-10-15 | 120 min | Study   |
| Attend club meeting | 2026-10-16 | 60 min  | Meeting |
+------------------------------------------------------+
| Add or Edit Activity                                 |
| Title: [________________________]                    |
| Due Date: [__________] Duration: [________]          |
| Tag: [__________________________]                    |
| [Save Activity] [Cancel]                             |
+------------------------------------------------------+
| Import JSON | Export JSON | Budget/Duration Settings |
+------------------------------------------------------+
| Footer: About | GitHub | Contact                     |
+------------------------------------------------------+
```

### Mobile Layout

On mobile devices, the dashboard statistics will stack vertically or form a compact grid. Activity records will appear as cards instead of a wide table. Forms will use full-width inputs, and buttons will remain easy to tap.

### Navigation

- Dashboard: View activity statistics and recent tasks.
- Activities: Search, sort, edit, and delete records.
- Add Activity: Create a new task or event.
- Settings: Configure duration targets and preferences.
- About: Read the project purpose and find contact information.

### User Flow

1. Open the application.
2. Review the dashboard.
3. Add an activity with a title, date, duration, and tag.
4. Search or sort activities.
5. Edit or delete an activity when necessary.
6. Export data for backup or import a valid JSON file.

The wireframe is an initial plan. The final layout may be improved during implementation and testing.


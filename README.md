
# Campus Life Planner

A responsive, accessible web application that helps university students organize assignments, campus events, meetings, and personal activities. Students can track deadlines and durations, search with regular expressions, set weekly time goals, and back up their data.

## 1. Project Objectives

- Organize academic tasks and campus activities.
- Track deadlines, completion status, and planned durations.
- Search and sort activities efficiently.
- Save activities and settings in browser local storage.
- Import and export activity backups using JSON.
- Provide a responsive and accessible user experience.

## 2. Target Users

University students who want a simple way to manage assignments, meetings, campus events, and personal responsibilities.

## 3. Features

- **Dashboard:** Displays total, completed, and upcoming activities and total planned duration.
- **Activity management:** Add, edit, complete, and delete activities.
- **Regular-expression search:** Search activity titles and tags using JavaScript regex patterns.
- **Sorting:** Sort by date, title, or duration in ascending or descending order.
- **Weekly duration goal:** Set a weekly target and view planned minutes compared with that target.
- **Persistent storage:** Save activities and the weekly target using `localStorage`.
- **JSON backup:** Export activities and import a validated backup.
- **Input validation:** Check titles, dates, durations, and tags before saving.
- **Responsive layout:** Support mobile, tablet, and desktop screens.

## 4. Technologies

- HTML5 for semantic page structure.
- CSS3 for styling, responsive layouts, transitions, and visible focus states.
- Vanilla JavaScript using ES modules.
- Regular expressions for validation and searching.
- `localStorage` for browser-based persistence.
- JSON for importing and exporting data.

No JavaScript framework or backend server is required.

## 5. Project Structure

```text
Campus_life_planner/
├── index.html
├── styles/
│   └── style.css
├── scripts/
│   ├── main.js
│   ├── state.js
│   ├── ui.js
│   ├── search.js
│   ├── storage.js
│   └── validators.js
├── seed.json
├── tests.html
└── README.md
```

## 6. Run the Application Locally

1. Clone or download this repository.
2. Open a terminal in the project directory.
3. Start a local web server:

   ```bash
   python3 -m http.server 8000
   ```

4. Open the application in your browser:

   `http://localhost:8000`

The application uses JavaScript modules, so serve it over HTTP rather than opening `index.html` directly with `file://`.

To stop the server, press `Ctrl + C` in the terminal.

## 7. Data Model

Each activity uses the following properties:

| Property | Description |
|---|---|
| `id` | Numeric identifier for the activity |
| `title` | Activity title |
| `dueDate` | Due date in `YYYY-MM-DD` format |
| `duration` | Non-negative whole number of minutes |
| `tag` | Activity category |
| `completed` | Boolean indicating whether the activity is complete |

Activities and the weekly duration target are saved in browser local storage. Data is stored locally in the browser and is not automatically synchronized across devices.

## 8. Regular-Expression Catalogue

The project uses regular expressions to validate inputs and search activities.

| Purpose | Pattern | Explanation |
|---|---|---|
| Title boundaries | `^\S(?:.*\S)?$` | Requires a non-space first and last character |
| Duration | `^(0|[1-9]\d*)$` | Accepts zero or a positive whole number without leading zeros |
| Date format | `^\d{4}-(0[1-9]|1[0-2])-(0[1-9]\|[12]\d\|3[01])$` | Checks the date's basic format and ranges; JavaScript also validates real calendar dates |
| Tag | `^[A-Za-z]+(?:[ -][A-Za-z]+)*$` | Allows words separated by single spaces or hyphens |
| Repeated words | `\b(\w+)\s+\1\b` | Detects consecutive repeated words, ignoring letter case |
| User search | User-provided regex | Searches activity titles and tags |

The application provides a case-insensitive search option. Invalid search expressions should display a helpful message rather than crash the application.

## 9. Validation Tests

The `tests.html` page contains 19 validation tests covering:

- Valid and invalid activity titles.
- Leading and trailing spaces.
- Repeated consecutive words.
- Whole-number duration validation.
- Valid dates, invalid calendar dates, and leap years.
- Valid and invalid category tags.

To run the tests:

1. Start the local server using the command above.
2. Open `http://localhost:8000/tests.html`.
3. Review the displayed pass and fail results.

The current validation suite has passed all 19 tests. These tests cover validation functions and do not replace manual testing of the entire application.

## 10. Accessibility and Keyboard Navigation

- Semantic HTML landmarks and a clear heading structure.
- Labels associated with their form controls.
- A skip-to-content link.
- Visible keyboard focus indicators.
- Buttons that can be reached and activated with standard keyboard navigation.
- Status messages announced through ARIA live regions.
- An error region for form validation messages.
- Responsive layouts and support for reduced-motion preferences.

Keyboard navigation:
- `Tab`: Move to the next interactive element.
- `Shift + Tab`: Move to the previous interactive element.
- `Enter` or `Space`: Activate a focused button or control, as supported by that control.
- The skip link becomes available when reached by keyboard focus.

## 11. Importing and Exporting Data

- Use **Export JSON** to download a backup of your activities.
- Use **Import JSON** to restore a compatible backup.
- The import process checks the file structure and validates activity fields.
- Importing replaces the current activity list. Export a backup before importing if you need to preserve your existing list.

`seed.json` contains 10 sample activities that can be imported for demonstration and testing.

## 12. Weekly Duration Goal

The weekly target is configurable in Settings and is saved in local storage. The dashboard compares the total durations of activities due during the current Monday-to-Sunday week with the target.

The progress calculation includes completed activities as well as pending activities. It represents planned activity time, not a record of time actually spent.

## 13. Responsive Design

The interface uses a mobile-first layout, Flexbox, media queries, and CSS transitions. Activity information is presented in cards, and controls adapt to smaller screens.

## 14. Deployment to GitHub Pages

1. Commit and push the finished project to the GitHub repository.
2. Open the repository on GitHub.
3. Open **Settings → Pages**.
4. Under the build and deployment settings, choose deployment from a branch.
5. Select the `main` branch and the `/ (root)` folder, then save.
6. Wait for GitHub Pages to publish the site.
7. Open the published URL shown in the Pages settings and test the deployed application.

The published URL will be available after deployment is completed successfully.

## 15. Repository

GitHub repository:
https://github.com/mndayiragi-hub/Campus_life_planner

## 16. Future Improvements

- Add activity filtering by completion status.
- Improve automated tests for search, sorting, state management, and storage.
- Add richer weekly planning and reporting features.
- Consider optional synchronization across devices in a future version.


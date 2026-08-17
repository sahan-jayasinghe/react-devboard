# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` – Start the development server with Hot Module Replacement (Vite).  
- `npm run build` – Production build output to `dist/`.  
- `npm run lint` – Run ESLint on the source files.  
- `npm run preview` – Preview the production build locally.  

No test script is configured; if tests are added, they can be run with `npm test` (or via Vitest/Jest).

## Project Structure & Architecture

- **Entry point**: `src/main.jsx` creates the React root and renders `<App />`.  
- **App component** (`src/App.jsx`): Manages the active tab via `useState` and conditionally renders one of the four main views: Dashboard, Tasks, Projects, or a placeholder.  
- **Layout components**:  
  - `src/components/Header.jsx` – Fixed header with the application title.  
  - `src/components/Sidebar.jsx` – Navigation list that updates the active tab and highlights the selected item.  
- **Pages** (rendered inside `<main className="main-content">`):  
  - `Dashboard.jsx` – Simple welcome message.  
  - `Tasks.jsx` – Fully featured task list with add/edit/delete, toggle completion, and persistence via `localStorage` (key: `"taskflow-tasks"`).  
  - `Projects.jsx` – Placeholder for future project management.  
- **Styling**: Global CSS in `src/index.css` uses a utility‑class approach; responsive adjustments are included via media queries.  
- **State management**: All UI state is handled with React hooks (`useState`, `useEffect`) inside the respective components; no external state library is used.  
- **Persistence**: The Tasks component loads and saves its task array to `localStorage` on mount and whenever the array changes, enabling data to survive page refreshes.

## Typical Workflow

1. Run `npm run dev` to start the dev server.  
2. Make changes to components under `src/components/` or pages.  
3. The browser will refresh automatically thanks to Vite's HMR.  
4. When ready for production, run `npm run build` and inspect the output in `dist/`.  
5. Use `npm run lint` to keep code quality consistent.

## Notes

- The project uses React 19 with the default Vite plugin (`@vitejs/plugin-react`).  
- ESLint is configured with recommended React rules; fixes can be applied with `npm run lint -- --fix`.  
- No TypeScript is used; files are plain JavaScript/JSX.  
- Assets (if any) would belong in the `public/` directory.
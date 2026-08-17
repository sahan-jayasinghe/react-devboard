# DevBoard

> **A developer-focused task and project management app built with React.**

🔗 **Live Demo → [https://react-devboard.vercel.app/](https://react-devboard.vercel.app/)**

---

## 📸 Screenshots

| Dashboard | Tasks | Projects |
|-----------|-------|----------|
| Overview with stats, progress bar, and recent activity | Full task list with status/priority badges | Project cards grid with status tracking |

---

## ✨ Features

- **Dashboard** — At-a-glance overview of task completion progress, task stats, and project stats with recent activity feeds
- **Task Management** — Create, edit, delete tasks with status (`To Do`, `In Progress`, `Completed`) and priority (`Low`, `Medium`, `High`) tracking. Click the checkbox to cycle task status.
- **Project Management** — Manage projects with status (`Planning`, `Active`, `Completed`) and priority labels. View all projects in a responsive card grid.
- **Persistent Storage** — All data is saved to `localStorage` — your tasks and projects survive page refreshes
- **Responsive Design** — Works on desktop, tablet, and mobile

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 19](https://react.dev/) |
| Build Tool | [Vite 8](https://vitejs.dev/) |
| Styling | Vanilla CSS (custom design system) |
| Typography | [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts |
| Persistence | Browser `localStorage` |
| Deployment | [Vercel](https://vercel.com/) |

> No UI libraries, no Tailwind, no external state management — pure React + vanilla CSS.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/sahan-jayasinghe/react-devboard.git
cd react-devboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

The production bundle is output to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
devboard/
├── public/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx   # Overview stats, progress, recent activity
│   │   ├── Header.jsx      # Top navigation bar
│   │   ├── Projects.jsx    # Project CRUD + card grid
│   │   ├── Sidebar.jsx     # Left navigation
│   │   └── Tasks.jsx       # Task CRUD + task list
│   ├── App.jsx             # Root component, shared state, localStorage
│   ├── index.css           # Complete vanilla CSS design system
│   └── main.jsx            # React entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🎨 Design System

The app uses a fully custom vanilla CSS design system defined in `index.css`:

- **Color tokens** — Primary indigo, semantic status colors (success, warning, danger, info)
- **Typography** — Inter font, consistent type scale
- **Component classes** — `.btn`, `.badge`, `.card`, `.stat-card`, `.form-control`, `.list-item`, `.project-card`, and more
- **Spacing & layout** — 8px base grid, sticky header + sidebar layout
- **Responsive** — Breakpoints at 1100px, 800px, 640px, and 580px

---

## 📋 Usage

### Managing Tasks

1. Navigate to **Tasks** in the sidebar
2. Click **Add Task** to open the inline form
3. Fill in the title, description, status, and priority — then submit
4. Use the **checkbox** on any task to cycle its status: `To Do → In Progress → Completed`
5. Use the **Edit** or **Delete** buttons to modify or remove a task

### Managing Projects

1. Navigate to **Projects** in the sidebar
2. Click **Add Project** to open the inline form
3. Fill in the project name, description, status, and priority — then submit
4. Use **Edit** or **Delete** on any project card

---

## 📦 Deployment

This project is deployed on **Vercel**.

To deploy your own fork:

1. Push your code to GitHub
2. Import the repository at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Vite — click **Deploy**

---

## 📄 License

MIT License — feel free to use, modify, and distribute.

---

<div align="center">
  Made with ❤️ using React + Vite
  <br/>
  <a href="https://react-devboard.vercel.app/">react-devboard.vercel.app</a>
</div>

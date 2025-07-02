# Pivotask.io - Project Management Tool

This is a full-stack project management application built with the MERN stack (though using in-memory data instead of MongoDB for this version). The frontend is a React application built with Vite, and the backend is a Node.js API using Express.


## How to Run

### Backend Server

1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The server will be running on `http://localhost:3001`.

### Frontend Client

1.  Navigate to the `client` directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The React application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## API Endpoints

The backend provides the following RESTful API endpoints:

* `/api/login` (POST): Authenticate user.
* `/api/users` (GET): User management.
* `/api/tasks` (GET/POST/PUT): Task CRUD.
* `/api/projects` (GET): Project data.
* `/api/tickets` (GET/PUT): Service ticket CRUD and approval.
* `/api/timesheet` (GET/PUT): Timesheet CRUD.
* `/api/notifications` (GET/POST): Notifications.
* `/api/chat` (GET/POST): Chat messages.
* `/api/org-chart` (GET): Organizational chart data.

## Project Structure


├── client/                # Vite + React + TypeScript frontend

│
│   ├── src/

│   │   ├── App.jsx

│   │   ├── main.jsx

│   │   ├── index.css

│   │   ├── api/           # API call helpers

│   │   │   └── api.js

│   │   ├── components/    # Shared UI components

│   │   │   ├── Sidebar.jsx

│   │   │   ├── Navbar.jsx

│   │   │   ├── UserMenu.jsx

│   │   │   ├── NotificationPanel.jsx

│   │   │   ├── ChatWidget.jsx

│   │   │   ├── Modal.jsx

│   │   │   └── ... (other shared components)

│   │   ├── pages/         # Main pages/views

│   │   │   ├── LoginPage.jsx

│   │   │   ├── DashboardPage.jsx

│   │   │   ├── TasksPage.jsx

│   │   │   ├── TaskDetailPage.jsx

│   │   │   ├── ProjectsPage.jsx

│   │   │   ├── ServiceTicketsPage.jsx

│   │   │   ├── ServiceTicketDetailPage.jsx

│   │   │   ├── TimesheetPage.jsx

│   │   │   ├── UsersPage.jsx

│   │   │   ├── CalendarPage.jsx

│   │   │   └── OrgChartPage.jsx

│   │   └── types/         # Shared TypeScript types

│   │       └── models.js

│   ├── public/

│   │   └── index.html

│   ├── package.json

│   └── vite.config.js

├── backend/               # Node.js + TypeScript backend

│   ├── src/

│   │   ├── index.js

│   │   ├── routes/

│   │   │   ├── auth.js

│   │   │   ├── tasks.js

│   │   │   ├── users.js

│   │   │   ├── projects.js

│   │   │   ├── tickets.js

│   │   │   └── ... (other modules)

│   │   └── models/

│   │       └── models.js

│   ├── package.json

│   └── tsconfig.json

└── README.md

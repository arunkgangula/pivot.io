"# pivot.io"


pivotask.io/

├── client/                # Vite + React + TypeScript frontend

│   ├── src/

│   │   ├── App.tsx

│   │   ├── main.tsx

│   │   ├── index.css

│   │   ├── api/           # API call helpers

│   │   │   └── api.ts

│   │   ├── components/    # Shared UI components

│   │   │   ├── Sidebar.tsx

│   │   │   ├── Navbar.tsx

│   │   │   ├── UserMenu.tsx

│   │   │   ├── NotificationPanel.tsx

│   │   │   ├── ChatWidget.tsx

│   │   │   ├── Modal.tsx

│   │   │   └── ... (other shared components)

│   │   ├── pages/         # Main pages/views

│   │   │   ├── LoginPage.tsx

│   │   │   ├── DashboardPage.tsx

│   │   │   ├── TasksPage.tsx

│   │   │   ├── TaskDetailPage.tsx

│   │   │   ├── ProjectsPage.tsx

│   │   │   ├── ServiceTicketsPage.tsx

│   │   │   ├── ServiceTicketDetailPage.tsx

│   │   │   ├── TimesheetPage.tsx

│   │   │   ├── UsersPage.tsx

│   │   │   ├── CalendarPage.tsx

│   │   │   └── OrgChartPage.tsx

│   │   └── types/         # Shared TypeScript types

│   │       └── models.ts

│   ├── public/

│   │   └── index.html

│   ├── package.json

│   └── vite.config.ts

├── backend/               # Node.js + TypeScript backend

│   ├── src/

│   │   ├── index.ts

│   │   ├── routes/

│   │   │   ├── auth.ts

│   │   │   ├── tasks.ts

│   │   │   ├── users.ts

│   │   │   ├── projects.ts

│   │   │   ├── tickets.ts

│   │   │   └── ... (other modules)

│   │   └── models/

│   │       └── models.ts

│   ├── package.json

│   └── tsconfig.json

└── README.md

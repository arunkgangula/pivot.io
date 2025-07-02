import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Login from './pages/LoginPage';
import Dashboard from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import ProjectsPage from './pages/ProjectsPage';
import ServiceTicketsPage from './pages/ServiceTicketsPage';
import CalendarPage from './pages/CalendarPage';
import TimesheetPage from './pages/TimesheetPage';
import UsersPage from './pages/UsersPage';
import TaskDetail from './pages/TaskDetailPage';
import ServiceTicketDetail from './pages/ServiceTicketDetailPage';


function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route 
        path="/*"
        element={
          user ? (
            <AppProvider>
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/tasks/:taskId" element={<TaskDetail />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/service-tickets" element={<ServiceTicketsPage />} />
                <Route path="/service-tickets/:ticketId" element={<ServiceTicketDetail />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/timesheet" element={<TimesheetPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </Layout>
            </AppProvider>
          ) : (
            <Navigate to="/login" />
          )
        } 
      />
    </Routes>
  );
}

export default App;

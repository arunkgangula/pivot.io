// In-memory data store, copied directly from pivot.io.html

export let userData = {
    'JD': { id: 'JD', name: 'Jane Doe', email: 'jane.doe@pivot.com', avatar: 'https://placehold.co/40x40/fecaca/991b1b?text=JD', password: 'password123', role: 'Admin', managerId: null, groups: ['Leadership'], type: 'Full-time', status: 'Active', title: 'CEO' },
    'JA': { id: 'JA', name: 'John Appleseed', email: 'john.appleseed@pivot.com', avatar: 'https://placehold.co/40x40/c7d2fe/3730a3?text=JA', password: 'password123', role: 'Member', managerId: 'JD', groups: ['Engineering', 'Frontend'], type: 'Full-time', status: 'Active', title: 'Senior Software Engineer' },
    'MG': { id: 'MG', name: 'Maria Garcia', email: 'maria.garcia@pivot.com', avatar: 'https://placehold.co/40x40/d1fae5/10b981?text=MA', password: 'password123', role: 'Member', managerId: 'JA', groups: ['Engineering', 'Backend'], type: 'Contractor', status: 'Active', title: 'Software Engineer' },
    'LS': { id: 'LS', name: 'Lee Smith', email: 'lee.smith@pivot.com', avatar: 'https://placehold.co/40x40/E2E8F0/475569?text=LS', password: 'password123', role: 'Member', managerId: 'JA', groups: ['QA'], type: 'Full-time', status: 'On Leave', title: 'QA Engineer' }
};

export const groupData = {
    'leadership': { name: 'Leadership', color: 'bg-purple-200 text-purple-800' },
    'engineering': { name: 'Engineering', color: 'bg-blue-200 text-blue-800' },
    'marketing': { name: 'Marketing', color: 'bg-green-200 text-green-800' },
    'qa': { name: 'QA', color: 'bg-yellow-200 text-yellow-800' },
    'frontend': { name: 'Frontend', color: 'bg-pink-200 text-pink-800' },
    'backend': { name: 'Backend', color: 'bg-gray-200 text-gray-800' }
};

export let projectData = {
    'PROJ-1': { id: 'PROJ-1', name: 'Q3 Marketing Campaign', description: 'All tasks related to the upcoming Q3 marketing push.', color: 'bg-blue-200' },
    'PROJ-2': { id: 'PROJ-2', name: 'New Mobile App', description: 'Development of the new iOS and Android mobile applications.', color: 'bg-green-200' },
    'PROJ-3': { id: 'PROJ-3', name: 'Website Redesign', description: 'A complete overhaul of the main company website.', color: 'bg-purple-200' },
};

export let taskData = {
    'TKT-001': { id: 'TKT-001', title: 'Design the new dashboard interface', description: 'Create a modern and intuitive dashboard design...', priority: 'High', status: 'In Progress', dueDate: '2025-07-30', endDate: 'Not set', timeEstimate: '8 hours', assignees: ['JD', 'JA'], subtasks: ['TKT-007', 'TKT-008'], lastActivity: '2025-06-30T10:00:00Z', attachments: [], projectId: 'PROJ-3', comments: [] },
    'TKT-002': { id: 'TKT-002', title: 'Finalize Q3 marketing budget', description: 'Review and finalize the marketing budget...', priority: 'High', status: 'To Do', dueDate: '2025-08-05', endDate: 'Not set', timeEstimate: '4 hours', assignees: ['JA'], subtasks: [], lastActivity: '2025-06-29T11:00:00Z', attachments: [], projectId: 'PROJ-1', comments: [] },
    'TKT-003': { id: 'TKT-003', title: 'Draft onboarding documentation', description: 'Create comprehensive documentation for new hires...', priority: 'Medium', status: 'To Do', dueDate: '2025-08-15', endDate: 'Not set', timeEstimate: '12 hours', assignees: ['JD'], subtasks: [], lastActivity: '2025-06-28T12:00:00Z', attachments: [], projectId: 'PROJ-3', comments: [] },
    'TKT-004': { id: 'TKT-004', title: 'Review new user feedback', description: 'Go through the latest user feedback...', priority: 'Low', status: 'To Do', dueDate: '2025-07-25', endDate: 'Not set', timeEstimate: '3 hours', assignees: ['MG'], subtasks: [], lastActivity: '2025-06-27T13:00:00Z', attachments: [], projectId: 'PROJ-2', comments: [] },
    'TKT-005': { id: 'TKT-005', title: 'Develop API for user authentication', description: 'Build the API endpoints for user registration...', priority: 'Medium', status: 'In Progress', dueDate: '2025-09-01', endDate: 'Not set', timeEstimate: '24 hours', assignees: ['LS'], subtasks: [], lastActivity: '2025-06-26T14:00:00Z', attachments: [], projectId: 'PROJ-2', comments: [] },
    'TKT-006': { id: 'TKT-006', title: 'Setup production environment', description: 'Configure the servers and databases...', priority: 'High', status: 'Done', dueDate: '2025-07-01', endDate: 'July 5, 2024', timeEstimate: '16 hours', assignees: ['JA'], subtasks: [], lastActivity: '2025-06-25T15:00:00Z', attachments: [], projectId: 'PROJ-3', comments: [] },
    'TKT-007': { id: 'TKT-007', title: 'Create wireframes for mobile view', description: 'This is a subtask...', priority: 'High', status: 'In Progress', dueDate: '2025-07-15', endDate: 'Not set', timeEstimate: '4 hours', assignees: ['LS'], parent: 'TKT-001', subtasks: [], lastActivity: '2025-06-24T16:00:00Z', attachments: [], projectId: 'PROJ-2', comments: [] },
    'TKT-008': { id: 'TKT-008', title: 'Develop component library', description: 'This is a subtask...', priority: 'Medium', status: 'To Do', dueDate: '2025-07-20', endDate: 'Not set', timeEstimate: '16 hours', assignees: ['MG'], parent: 'TKT-001', subtasks: [], lastActivity: '2025-06-23T17:00:00Z', attachments: [], projectId: 'PROJ-3', comments: [] }
};

export let serviceTicketData = {
    'STK-001': {
        id: 'STK-001',
        title: 'New Server Equipment Request',
        description: 'Requesting a new server for the development team. The current server is at 90% capacity.',
        status: 'Pending Level 1 Approval',
        currentApproverId: 'JA',
        approvalHistory: [],
        createdBy: 'MG',
        creationDate: '2025-06-28T09:00:00Z',
        rejectionReason: null
    },
    'STK-002': {
        id: 'STK-002',
        title: 'Marketing Budget Increase for Q4',
        description: 'Need to increase the marketing budget by 15% to account for new campaigns.',
        status: 'Pending Level 2 Approval',
        currentApproverId: 'JD',
        approvalHistory: [{ action: 'Approved', level: 1, approverId: 'JA', timestamp: '2025-06-29T14:00:00Z', comments: 'Looks good, passing to Jane.' }],
        createdBy: 'LS',
        creationDate: '2025-06-29T10:00:00Z',
        rejectionReason: null
    }
};

export const assigneeDetails = {
    'JD': { name: 'Jane Doe', avatar: 'https://placehold.co/40x40/fecaca/991b1b?text=JD' },
    'JA': { name: 'John Appleseed', avatar: 'https://placehold.co/40x40/c7d2fe/3730a3?text=JA' },
    'MG': { name: 'Maria Garcia', avatar: 'https://placehold.co/40x40/d1fae5/10b981?text=MA' },
    'LS': { name: 'Lee Smith', avatar: 'https://placehold.co/40x40/E2E8F0/475569?text=LS' }
};

export let timesheetData = {
    '2025-06-30': [{ id: 1, ticketId: 'TKT-001', hours: 4.5 }, { id: 2, ticketId: 'TKT-005', hours: 3.5 }],
    '2025-07-01': [{ id: 3, ticketId: 'TKT-001', hours: 8 }]
};

export let notifications = [];

export let chatMessages = [];

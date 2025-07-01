/**
 * @typedef {object} User
 * @property {string} id - The user's unique ID.
 * @property {string} name - The user's full name.
 * @property {string} email - The user's email address.
 * @property {string} avatar - URL to the user's avatar image.
 * @property {string} password - The user's password (for demo purposes).
 * @property {'Admin' | 'Member'} role - The user's role.
 * @property {string|null} managerId - The ID of the user's manager.
 * @property {string[]} groups - Array of group names the user belongs to.
 * @property {'Full-time' | 'Contractor' | 'Intern'} type - Employment type.
 * @property {'Active' | 'Inactive' | 'On Leave'} status - The user's current status.
 * @property {string} title - The user's job title.
 */

/**
 * @typedef {object} Task
 * @property {string} id - The task's unique ID (e.g., "TKT-001").
 * @property {string} title - The title of the task.
 * @property {string} description - A detailed description of the task.
 * @property {'Low' | 'Medium' | 'High'} priority - The priority of the task.
 * @property {'To Do' | 'In Progress' | 'Done'} status - The current status of the task.
 * @property {string} dueDate - The due date in YYYY-MM-DD format.
 * @property {string} endDate - The completion date.
 * @property {string} timeEstimate - Estimated time to complete the task.
 * @property {string[]} assignees - Array of user IDs assigned to the task.
 * @property {string[]} subtasks - Array of task IDs that are subtasks of this one.
 * @property {string} lastActivity - ISO string of the last activity time.
 * @property {object[]} attachments - Array of attachment objects.
 * @property {string} projectId - The ID of the project this task belongs to.
 * @property {Comment[]} comments - Array of comments on the task.
 * @property {string} [parent] - The ID of the parent task, if any.
 */

/**
 * @typedef {object} Comment
 * @property {string} userId - The ID of the user who made the comment.
 * @property {string} text - The content of the comment.
 * @property {string} timestamp - ISO string of when the comment was made.
 */

/**
 * @typedef {object} Project
 * @property {string} id - The project's unique ID (e.g., "PROJ-1").
 * @property {string} name - The name of the project.
 * @property {string} description - A brief description of the project.
 * @property {string} color - A Tailwind CSS background color class.
 */

/**
 * @typedef {object} ServiceTicket
 * @property {string} id - The ticket's unique ID (e.g., "STK-001").
 * @property {string} title - The title of the service ticket.
 * @property {string} description - A detailed description of the ticket.
 * @property {string} status - The current approval status.
 * @property {string|null} currentApproverId - The ID of the user who needs to approve next.
 * @property {ApprovalLog[]} approvalHistory - A log of approval actions.
 * @property {string} createdBy - The ID of the user who created the ticket.
 * @property {string} creationDate - ISO string of when the ticket was created.
 * @property {string|null} rejectionReason - The reason for rejection, if any.
 */

/**
 * @typedef {object} ApprovalLog
 * @property {'Approved' | 'Rejected' | 'Placed On-Hold' | 'Resumed'} action - The action taken.
 * @property {number} [level] - The approval level.
 * @property {string} approverId - The ID of the user who took the action.
 * @property {string} timestamp - ISO string of when the action was taken.
 * @property {string} [comments] - Optional comments.
 */

/**
 * @typedef {object} TimesheetEntry
 * @property {number} id - A unique ID for the entry.
 * @property {string} ticketId - The ID of the task worked on.
 * @property {number} hours - The number of hours logged.
 */

 export const a = 1; // Dummy export to make this a module

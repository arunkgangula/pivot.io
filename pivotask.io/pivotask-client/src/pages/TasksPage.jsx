// src/pages/TasksPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useAppData } from "../context/AppContext";
import * as api from "../api/api.js";
import Sortable from "sortablejs";
import { Plus, LayoutGrid, List } from "lucide-react";
import TaskCard from "../components/TaskCard";

const TasksPage = () => {
  const { tasks, setTasks } = useAppData();
  const [viewMode, setViewMode] = useState("grid");
  const columnsRef = useRef({});

  const parentTasks = tasks.filter((t) => !t.parent);

  useEffect(() => {
    if (viewMode === "grid") {
      const statuses = ["To Do", "In Progress", "Done"];
      statuses.forEach((status) => {
        if (columnsRef.current[status]) {
          new Sortable(columnsRef.current[status], {
            group: "tasks",
            animation: 150,
            ghostClass: "sortable-ghost",
            onEnd: async (evt) => {
              const taskId = evt.item.dataset.taskId;
              const newStatus = evt.to.dataset.status;
              const task = tasks.find((t) => t.id === taskId);
              if (task && task.status !== newStatus) {
                await api.updateTask(taskId, { status: newStatus });
                setTasks((prevTasks) =>
                  prevTasks.map((t) =>
                    t.id === taskId ? { ...t, status: newStatus } : t
                  )
                );
              }
            },
          });
        }
      });
    }
  }, [parentTasks, viewMode, setTasks, tasks]);

  const tasksByStatus = parentTasks.reduce((acc, task) => {
    (acc[task.status] = acc[task.status] || []).push(task);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-text-primary">Tasks</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 p-1 bg-slate-200 rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md ${
                viewMode === "grid"
                  ? "bg-indigo-100 text-indigo-600"
                  : "text-slate-600"
              }`}
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md ${
                viewMode === "list"
                  ? "bg-indigo-100 text-indigo-600"
                  : "text-slate-600"
              }`}
            >
              <List size={20} />
            </button>
          </div>
          <button className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
            <Plus size={20} />
          </button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["To Do", "In Progress", "Done"].map((status) => (
            <div
              key={status}
              className="bg-bg-primary rounded-lg shadow-sm border border-border-primary"
            >
              <h2 className="text-lg font-semibold p-4 border-b border-border-primary text-text-primary">
                {status}{" "}
                <span className="text-sm font-normal text-text-muted">
                  {tasksByStatus[status]?.length || 0}
                </span>
              </h2>
              <div
                ref={(el) => (columnsRef.current[status] = el)}
                data-status={status}
                className="p-4 space-y-4 kanban-column min-h-[100px]"
              >
                {tasksByStatus[status]?.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-bg-primary rounded-lg shadow-sm border border-border-primary overflow-x-auto">
          <table className="min-w-full divide-y divide-border-primary">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Assignee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border-primary">
              {parentTasks.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 text-center text-text-muted"
                  >
                    No tasks found.
                  </td>
                </tr>
              ) : (
                parentTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-text-primary">
                      {task.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {task.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {task.assignee || (
                        <span className="text-text-muted">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {task.dueDate ? (
                        new Date(task.dueDate).toLocaleDateString()
                      ) : (
                        <span className="text-text-muted">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default TasksPage;

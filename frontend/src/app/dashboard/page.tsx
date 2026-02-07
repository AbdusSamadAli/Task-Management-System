"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TaskItem from "../../components/TaskItem";
import { apiFetch } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

type Task = { id: number, title: string, completed: boolean };

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const loadTasks = async () => {
    try {
      const data = await apiFetch("/tasks");
      const list = Array.isArray(data) ? data : data.tasks || [];
      setTasks(list);
    } catch {
      router.push("/login");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadTasks();
    }
  }, [isAuthenticated]);

  const addTask = async () => {
    await apiFetch("/tasks", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    setTitle("");
    toast.success("Task added");
    loadTasks();
  };

  const toggleTask = async (id: number) => {
    await apiFetch(`/tasks/${id}/toggle`, { method: "PATCH" });
    toast.success("Task updated");
    loadTasks();
  };

  const editTask = async (id: number, title: string) => {
    await apiFetch(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title }),
    });
    toast.success("Task edited");
    loadTasks();
  };

  const deleteTask = async (id: number) => {
    await apiFetch(`/tasks/${id}`, { method: "DELETE" });
    toast.success("Task deleted");
    loadTasks();
  };


  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      status === "all" ||
      (status === "completed" && task.completed) ||
      (status === "pending" && !task.completed);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      {msg && (
        <div className="mb-3 bg-green-100 text-green-700 p-2 rounded">
          {msg}
        </div>
      )}

      <div className="flex mb-4">
        <input
          className="flex-1 border p-2 rounded-l"
          placeholder="New task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 rounded-r"
        >
          Add
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500">No tasks found</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

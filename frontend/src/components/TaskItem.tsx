"use client";

import { useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TaskItem({task, onToggle, onDelete, onEdit,
}: {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onEdit(task.id, editTitle);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between border p-3 rounded">
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        {isEditing ? (
          <input
            className="border p-1 rounded flex-1"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        ) : (
          <span
            className={`flex-1 ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </span>
        )}
      </div>

      <div className="flex gap-2 ml-3">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-green-600 hover:underline"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditTitle(task.title);
              }}
              className="text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

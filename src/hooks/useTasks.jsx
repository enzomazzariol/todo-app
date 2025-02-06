import { useState } from "react";

export default function useTasks() {
  const [task, setTask] = useState([]);
  const [filter, setFilter] = useState("All");

  const addTask = (taskText) => {
    const newTask = { id: Date.now(), text: taskText, completed: false };
    setTask([...task, newTask]);
  };

  const deleteTask = (id) => setTask(task.filter((t) => t.id !== id));

  const completeTask = (id) =>
    setTask(
      task.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const deleteTaskCompleted = () => setTask(task.filter((t) => !t.completed));

  const filterTasks = () => {
    switch (filter) {
      case "Active":
        return task.filter((t) => !t.completed);
      case "Completed":
        return task.filter((t) => t.completed);
      default:
        return task;
    }
  };

  const handlerFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return {
    task,
    addTask,
    deleteTask,
    completeTask,
    deleteTaskCompleted,
    filterTasks,
    setFilter,
    handlerFilter,
    filter,
  };
}

/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import Task from "./components/task";
import TaskState from "./components/TaskState";
import Title from "./components/Title";

function App() {
  const [theme, setTheme] = useState("darkTheme");
  const [task, setTask] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("All");

  const imageUrl =
    theme === "darkTheme"
      ? "images/bg-desktop-dark.jpg"
      : "images/bg-desktop-light.jpg";
  const iconUrl =
    theme === "darkTheme" ? "images/icon-sun.svg" : "images/icon-moon.svg";
  const backgroundColor =
    theme === "darkTheme" ? "bg-very-dark-blue" : "bg-very-light-gray";
  const toDoColor =
    theme === "darkTheme" ? "bg-very-dark-desaturated-blue" : "bg-white";

  const addTask = () => {
    if (inputValue.trim() === "") {
      return;
    }

    const newTask = { id: Date.now(), text: inputValue, completed: false };
    setTask([...task, newTask]);
    console.log(newTask);
    setInputValue("");
  };

  const deleteTask = () => {
    setTask(task.filter((task) => !task.completed));
  };

  const completeTask = (id) =>{
    setTask(task.map(task => task.id === id ? {...task, completed: !task.completed} : task))
  }

  const filterTasks = (filter) => {
    switch (filter) {
      case "Active":
        return task.filter((task) => !task.completed);
      
      case "Completed":
        return task.filter((task) => task.completed);
      
      case "All":
      default:
        return task;
    }
  }

  const handlerFilter = (newFilter) => {
    setFilter(newFilter);
    setTask(filterTasks(newFilter));
  }

  return (
    <section className={`relative ${backgroundColor} min-h-screen`}>
      {/* Banner */}
      <img
        src={imageUrl}
        alt="banner background"
        className="h-72 w-full object-cover"
      />

      {/* Título con theme icon */}
      <div className="absolute top-36 left-1/2 -translate-x-1/2 w-full max-w-[500px] flex flex-col justify-center items-center">
        <Title text="TODO" theme={theme} setTheme={setTheme} iconUrl={iconUrl} />

        {/* Input para añadir tarea */}
        <div
          className={`w-full h-14 p-3 ${toDoColor} mb-2 rounded flex gap-4 shadow-lg`}
        >
          <button
            className="border border-dark-grayish-blue-dark rounded-full w-6 h-6 mt-1"
            onClick={addTask}
          />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Create a new todo..."
            className="w-full bg-very-dark-desaturated-blue text-light-grayish-blue-dark focus:outline-none font-medium inline-block"
          />
        </div>

        <div
          className={`my-5 w-full p-3 ${toDoColor} flex flex-col rounded shadow-lg`}
        >
          <ul className="w-full rounded">
            {task.length > 0 ? (
              task.map((t) => (
                <Task key={t.id} t={t} completeTask={completeTask} />
              ))
            ) : (
              <p className="text-center text-dark-grayish-blue my-6">
                No tasks added yet.
              </p>
            )}
          </ul>

          <div className="flex justify-between items-center mt-4 font-medium text-sm text-dark-grayish-blue w-full">
            <p className="flex-shrink-1">{task.length} items left</p>
            <div className="flex gap-4 justify-center mx-auto">
              <TaskState setFilter={handlerFilter} filter={filter} text="Active" />
              <TaskState setFilter={handlerFilter} filter={filter} text="Completed" />
              <TaskState setFilter={handlerFilter} filter={filter} text="All" />
            </div>
            <button className="flex-shrink-1" onClick={deleteTask}>
              Clear completed
            </button>
          </div>
        </div>

        <p className="text-center mt-4 text-very-dark-grayish-blue">
          Drag and drop to reorder list
        </p>
      </div>
    </section>
  );
}

export default App;

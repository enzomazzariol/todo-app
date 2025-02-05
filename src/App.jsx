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
  const toDoColor =
    theme === "darkTheme" ? "bg-very-dark-desaturated-blue" : "bg-white";

  const addTask = () => {
    if (inputValue.trim() === "") {
      return;
    }

    const newTask = { id: Date.now(), text: inputValue, completed: false };
    setTask([...task, newTask]);
    setInputValue("");
  };

  const deleteTask = () => {
    setTask(task.filter((task) => !task.completed));
  };

  const completeTask = (id) => {
    setTask(
      task.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

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
  };

  const handlerFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <section className="relative bg-very-dark-blue min-h-screen font-josefin">
      {/* Banner */}
      <img
        src={imageUrl}
        alt="banner background"
        className="h-72 w-full object-cover"
      />

      {/* Título con theme icon */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[450px] lg:w-2/5 flex flex-col justify-center items-center">
        <Title
          text="TODO"
          theme={theme}
          setTheme={setTheme}
          iconUrl={iconUrl}
        />

        {/* Input para añadir tarea */}
        <div
          className={`w-full h-14 p-3 px-5 ${toDoColor} rounded-md flex gap-4 shadow-lg`}
        >
          <button
            className="border border-dark-grayish-blue-dark rounded-full w-6 h-6 mt-1 transition duration-300 ease-in-out"
            onClick={addTask}
          />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Create a new todo..."
            className="w-full bg-very-dark-desaturated-blue text-light-grayish-blue-dark focus:outline-none font-medium"
          />
        </div>

        {/* Lista de tareas */}
        <div className="my-6 w-full bg-very-dark-desaturated-blue rounded-md shadow-lg">
          <ul className="">
            {filterTasks(filter).length > 0 ? (
              filterTasks(filter).map((t) => (
                <Task key={t.id} t={t} completeTask={completeTask} />
              ))
            ) : (
              <p className="text-center text-dark-grayish-blue my-6">
                No tasks added yet.
              </p>
            )}
          </ul>

          {/* Contador y botón Clear Completed */}
          <div className="flex justify-between px-6 py-5 md:py-2 text-base md:text-sm xl:text-base text-very-dark-grayish-blue-dark font-semibold border-t-2 border-t-very-dark-grayish-blue-alt border-opacity-70">
            <button className="cursor-not-allowed">{filterTasks("Active").length} items left</button>

            {/* Filtros para DESKTOP */}
            <div className="hidden md:flex justify-center gap-8 font-bold bg-very-dark-desaturated-blue px-4 py-3">
              <TaskState setFilter={handlerFilter} filter={filter} text="All" />
              <TaskState setFilter={handlerFilter}filter={filter} text="Active" />
              <TaskState setFilter={handlerFilter} filter={filter} text="Completed" />
            </div>

            <button
              className="hover:text-light-grayish-blue transition"
              onClick={deleteTask}
            >
              Clear Completed
            </button>
          </div>
        </div>

        {/* Filtros para MOBILE */}
        <div className="w-full md:hidden flex justify-center gap-8 font-bold bg-very-dark-desaturated-blue px-4 py-3 rounded-md shadow-md">
          <TaskState setFilter={handlerFilter} filter={filter} text="All" />
          <TaskState setFilter={handlerFilter} filter={filter} text="Active" />
          <TaskState
            setFilter={handlerFilter}
            filter={filter}
            text="Completed"
          />
        </div>

        <p className="text-center text-dark-grayish-blue text-base mt-4">
          Drag and drop to reorder list
        </p>
      </div>
    </section>
  );
}

export default App;

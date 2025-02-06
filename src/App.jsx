/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import Task from "./components/task";
import TaskState from "./components/TaskState";
import Title from "./components/Title";
import InputTask from "./components/InputTask";
import useTasks from "./hooks/useTasks";

function App() {

  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  const [inputValue, setInputValue] = useState("");
  const { addTask, deleteTask, completeTask, deleteTaskCompleted, filterTasks, handlerFilter, filter } = useTasks();
  const filteredTasks = filterTasks(filter);
  const filters = ["All", "Active", "Completed"];

  const imageUrl =
    theme === "dark"
      ? "images/bg-desktop-dark.jpg"
      : "images/bg-desktop-light.jpg";

  const iconUrl =
    theme === "dark" ? "images/icon-sun.svg" : "images/icon-moon.svg";

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);


  return (
    <section className="relative w-fit bg-very-light-gray min-h-screen overflow-auto font-josefin dark:bg-very-dark-blue">
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
        <InputTask
          addTask={addTask}
          setInputValue={setInputValue}
          inputValue={inputValue}
        />

        {/* Lista de tareas */}
        <div className="my-6 w-full bg-white dark:bg-very-dark-desaturated-blue rounded-md shadow-lg">
          <ul className="">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((t) => (
                <Task
                  key={t.id}
                  t={t}
                  completeTask={completeTask}
                  deleteTask={deleteTask}
                />
              ))
            ) : (
              <p className="text-center text-very-dark-desaturated-blue dark:text-dark-grayish-blue my-6">
                No tasks added yet.
              </p>
            )}
          </ul>

          {/* Contador y botón Clear Completed */}
          <div
            className="flex justify-between px-6 py-5 md:py-2 text-base md:text-sm xl:text-base
           text-very-dark-grayish-blue-dark font-semibold border-t-2 border-t-light-grayish-blue dark:border-t-very-dark-grayish-blue-alt"
          >
            <button className="text-dark-grayish-blue">
              {filterTasks("Active").length} items left
            </button>

            {/* Filtros para DESKTOP */}
            <div className="hidden md:flex justify-center gap-8 font-bold bg-white dark:bg-very-dark-desaturated-blue px-4 py-3">
              {filters.map((f) => (
                <TaskState
                  key={f}
                  setFilter={handlerFilter}
                  filter={filter}
                  text={f}
                />
              ))}
            </div>

            {/* Eliminar tareas completadas */}
            <button
              className="text-dark-grayish-blue dark:hover:text-white hover:text-very-dark-blue transition"
              onClick={deleteTaskCompleted}
            >
              Clear Completed
            </button>
          </div>
        </div>

        {/* Filtros para MOBILE */}
        <div className="w-full md:hidden flex justify-center gap-8 font-bold bg-white dark:bg-very-dark-desaturated-blue px-4 py-3 rounded-md shadow-md">
          {filters.map((f) => (
            <TaskState
              key={f}
              setFilter={handlerFilter}
              filter={filter}
              text={f}
            />
          ))}
        </div>

        <p className="text-center text-dark-grayish-blue text-base my-5">
          Drag and drop to reorder list
        </p>
      </div>
    </section>
  );
}

export default App;
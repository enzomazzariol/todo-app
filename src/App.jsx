/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import Task from "./components/task";
import TaskState from "./components/TaskState";
import Title from "./components/Title";
import InputTask from "./components/InputTask";
import useTasks from "./hooks/useTasks";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

function App() {
  const [task, setTask] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  const [inputValue, setInputValue] = useState("");
  const {
    addTask,
    deleteTask,
    completeTask,
    deleteTaskCompleted,
    filterTasks,
    handlerFilter,
    filter,
  } = useTasks(task, setTask);

  const filteredTasks = filterTasks(filter);
  const filters = ["All", "Active", "Completed"];

  const imageUrl =
    theme === "dark"
      ? "images/bg-desktop-dark.jpg"
      : "images/bg-desktop-light.jpg";
  const iconUrl =
    theme === "dark" ? "images/icon-sun.svg" : "images/icon-moon.svg";

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Configurar sensores para el Drag and Drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setTask((tasks) => {
      const oldIndex = tasks.findIndex((t) => t.id === active.id);
      const newIndex = tasks.findIndex((t) => t.id === over.id);
      return arrayMove(tasks, oldIndex, newIndex);
    });
  };

  return (
    <section className="relative bg-very-light-gray min-h-screen overflow-auto font-josefin dark:bg-very-dark-blue">
      <img
        src={imageUrl}
        alt="banner background"
        className="h-72 w-full object-cover"
      />

      <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[380px] sm:w-[500px] lg:w-2/5 flex flex-col justify-center items-center">
        <Title
          text="TODO"
          theme={theme}
          setTheme={setTheme}
          iconUrl={iconUrl}
        />
        <InputTask
          addTask={addTask}
          setInputValue={setInputValue}
          inputValue={inputValue}
        />

        <div className="my-6 w-full bg-white dark:bg-very-dark-desaturated-blue rounded-md shadow-lg">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={task}
              strategy={verticalListSortingStrategy}
            >
              <ul className="relative">
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
            </SortableContext>
          </DndContext>

          <div className="flex justify-between px-6 py-5 md:py-2 text-base md:text-sm xl:text-base text-very-dark-grayish-blue-dark font-semibold border-t-2 border-t-light-grayish-blue dark:border-t-very-dark-grayish-blue-alt">
            <button className="text-dark-grayish-blue">
              {filterTasks("Active").length} items left
            </button>

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

            <button
              className="text-dark-grayish-blue dark:hover:text-white hover:text-very-dark-blue transition"
              onClick={deleteTaskCompleted}
            >
              Clear Completed
            </button>
          </div>
        </div>

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

/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Task({ t, completeTask, deleteTask }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: t.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`w-full py-4 pl-5 flex justify-between text-very-dark-grayish-blue dark:text-light-grayish-blue-dark 
        border-b-2 border-b-light-grayish-blue dark:border-b-very-dark-grayish-blue-alt cursor-pointer
        text-lg last:border-b-0 
        ${!t.completed ? "hover:text-very-dark-blue dark:hover:text-very-light-gray transition duration-300 ease-in-out" : ""}
        ${t.completed ? "line-through text-very-dark-grayish-blue opacity-75" : ""}`}
    >
      <div className="flex items-center gap-4">
        <button
          className={`border border-light-grayish-blue dark:border-dark-grayish-blue-dark rounded-full w-6 h-6 flex items-center justify-center 
            hover:border-blue-custom dark:hover:border-blue-custom transition duration-300
            ${t.completed ? "bg-gradient-to-r from-blue-custom to-purple-custom border-0" : "bg-transparent"}`}
          onClick={() => completeTask(t.id)}
        >
          {t.completed && (
            <img
              src="images/icon-check.svg"
              alt="icon check"
              className="w-3 h-3"
            />
          )}
        </button>
        {t.text}
      </div>

      <button
        className="px-6 transition-transform duration-300 hover:rotate-90"
        onClick={() => deleteTask(t.id)}
      >
        <img
          src="images/icon-cross.svg"
          alt="cross icon"
          className="transition-transform duration-300"
        />
      </button>
    </li>
  );
}

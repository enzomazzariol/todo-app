/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

export default function Task({ t, completeTask }) {
  return (
    <>
      <li
        key={t.id}
        className={`w-full py-4 pl-5 flex gap-4 text-light-grayish-blue-dark 
          border-b-2 border-b-very-dark-grayish-blue-alt border-opacity-70 cursor-pointer
          last:border-b-0 last:pb-4
          ${!t.completed ? "hover:text-very-light-gray transition duration-300 ease-in-out" : ""}
          ${t.completed ? "line-through text-very-dark-grayish-blue opacity-75" : ""}`}
      >
        <button
          className={`border border-dark-grayish-blue-dark rounded-full w-6 h-6 flex items-center justify-center 
                      hover:border-blue-custom transition duration-300
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
      </li>
    </>
  );
}

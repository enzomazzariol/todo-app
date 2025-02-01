/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

export default function Task({ t, completeTask }) {
  return (
    <>
      <li
        key={t.id}
        className={`w-full py-2 mb-2 flex gap-4 text-light-grayish-blue-dark
                    ${t.completed ? "line-through text-very-dark-grayish-blue opacity-75" : ""}`}
      >
        <button
          className={`border border-dark-grayish-blue-dark rounded-full w-6 h-6 flex items-center justify-center 
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
      <div className="w-full bg-very-dark-grayish-blue-alt opacity-70 h-[1.5px] mb-2" />
    </>
  );
}

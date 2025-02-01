/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */


// eslint-disable-next-line react/prop-types
export default function TaskState({setFilter, filter, text}) {
    return (
        <button
        onClick={() => setFilter(text)}
        className={`hover:text-white duration-300 ${
            filter === text ? "text-purple" : "text-dark-grayish-blue"
        }`}
        >
        {text}
        </button>
    )
}
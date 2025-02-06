/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

export default function InputTask({ addTask, setInputValue, inputValue }) {
  const handleAddTask = () => {
    if (inputValue.trim() === "") return; // Evita agregar tareas vacías
    addTask(inputValue);
    setInputValue(""); // Limpia el input después de agregar la tarea
  };

  return (
    <div className="w-full h-14 p-3 px-5 bg-white dark:bg-very-dark-desaturated-blue rounded-md flex gap-4 shadow-lg">
      {/* Botón para agregar tarea */}
      <button
        className="border border-light-grayish-blue dark:border-dark-grayish-blue-dark rounded-full md:w-6 w-7 h-6 mt-1 transition duration-300 ease-in-out"
        onClick={handleAddTask}
      />

      {/* Input para escribir la tarea */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        placeholder="Create a new todo..."
        className="w-full bg-white text-very-dark-grayish-blue dark:bg-very-dark-desaturated-blue dark:text-light-grayish-blue-dark focus:outline-none font-medium"
      />
    </div>
  );
}

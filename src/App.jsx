/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState('darkTheme');
  const [task, setTask] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('All');

  const imageUrl = theme === "darkTheme" ? "images/bg-desktop-dark.jpg" : "images/bg-desktop-light.jpg";
  const iconUrl = theme === "darkTheme" ? "images/icon-sun.svg" : "images/icon-moon.svg";
  const backgroundColor = theme === "darkTheme" ? "bg-very-dark-blue" : "bg-very-light-gray";
  const toDoColor = theme === "darkTheme" ? "bg-very-dark-desaturated-blue" : "bg-white";
  const textColor = theme === "darkTheme" ? "text-very-light-grayish-blue" : "text-very-dark-blue";

  const addTask = () => {
    if (inputValue.trim() === '') {
      return;
    }

    const newTask = { id: Date.now(), text: inputValue, completed: false };
    setTask([...task, newTask]);
    setInputValue('');
  }

  const deleteTask = () => {
    setTask(task.filter(task =>!task.completed));
  }

  return (
      <section className={`relative ${backgroundColor} min-h-screen`}>

          {/*banner*/}
          <img 
            src={imageUrl} 
            alt="banner background" 
            className="h-72 w-full object-cover" 
          />
          
          {/*Titulo con theme icon*/}
          <div className="absolute top-36 left-1/2 -translate-x-1/2 w-full max-w-[500px] flex flex-col justify-center items-center">
            <div className="flex justify-between mb-8 w-full">
              <h1 className="text-5xl tracking-[1.3rem] font-bold text-white">TODO</h1>
              <button onClick={() => setTheme(theme === 'darkTheme'? 'lightTheme' : 'darkTheme')}>
                <img src={iconUrl} alt="icon theme" className="" />
              </button>
            </div>

            {/*Input para añadir tarea*/}
            <div className={`w-full p-3 ${toDoColor} mb-2 rounded flex gap-4 shadow-lg`}>
              <button 
                className="border border-dark-grayish-blue-dark rounded-full w-6"
                onClick={addTask}  
              />
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask}
                placeholder="Create a new todo..." 
                className={`w-full ${textColor} ${toDoColor} focus:outline-none font-medium`}
              />
            </div>

            <div className={`my-5 w-full p-3 ${toDoColor} flex rounded shadow-lg`}>
              <ul className="w-full rounded ">
                {task.map((t) => (
                    <li key={t.id} className={`w-full py-2 ${toDoColor} mb-2 flex w-6 border-b-[.025rem] gap-4 border-very-dark-grayish-blue-alt text-light-grayish-blue-dark`}>
                      <button 
                        className="border border-dark-grayish-blue-dark rounded-full w-6"
                        onClick={addTask}  
                      />
                      {t.text}
                      
                    </li>
                ))}


                <div className="flex justify-between items-center mt-4 font-medium text-sm text-dark-grayish-blue w-full">
                  <p className="flex-shrink-1">{task.length} items left</p>
                  <div className="flex gap-4 justify-center mx-auto">
                    <button 
                      onClick={() => setFilter("All")}  
                      className={`hover:text-white duration-500 ${
                        filter === "All" ? "text-purple" : "text-dark-grayish-blue"
                      }`}
                    >
                      All
                    </button>

                    <button 
                      onClick={() => setFilter("Active")}
                      className={`hover:text-white duration-500 ${
                        filter === "Active"? "text-purple" : "text-dark-grayish-blue"
                      }`}>
                      Active
                    </button>

                    <button 
                      onClick={() => setFilter("Completed")}
                      className={`hover:text-white duration-500 ${
                        filter === "Completed"? "text-purple" : "text-dark-grayish-blue"
                    }`}>
                      Completed
                    </button>

                  </div>
                  <button className="flex-shrink-1">Clear completed</button>
                </div>
              </ul>
            </div>
             <p className="text-center mt-4 text-very-dark-grayish-blue">Drag and drop to reorder list</p>
          </div>

      </section>   
  )
}

export default App

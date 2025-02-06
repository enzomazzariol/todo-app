/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import Task from './task';

export default function TaskList({ tasks, completeTask, deleteTask }) {
  return (
    <ul>
      {tasks.length > 0 ? (
        tasks.map((t) => (
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
  );
}

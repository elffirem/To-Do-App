import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Item from "./Item";

export interface ITask {
  id: number;
  isChecked: boolean;
  text: string;
}

const List = () => {
  const [newTask, setNewTask] = useState<ITask>({
    id: 0,
    isChecked: false,
    text: "",
  });
  const [tasks, setTasks] = useState<ITask[]>([]);
  const handleNewTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask({ id: newTask.id, isChecked: false, text: event.target.value });
  };
  const [error, setError] = useState(false);

  const addTask = useCallback(() => {
    if (newTask.text.trim() !== "") {
      const hasDuplicate = tasks.some((task) => task.text == newTask.text);
      if (!hasDuplicate) {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        setNewTask({ id: newTask.id + 1, isChecked: false, text: "" });
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 1000);
        setNewTask({
          id: 0,
          isChecked: false,
          text: "",
        });
      }
    }
  }, [tasks, newTask]);

  const deleteTask = useCallback(
    (id: number) => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    },
    [tasks]
  );

  const editTask = useCallback(
    (id: number, editedTask: ITask) => {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? editedTask : task
      );
      setTasks(updatedTasks);
    },
    [tasks]
  );

  const changeCheckStat = useCallback(
    (id: number) => {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, isChecked: !task.isChecked } : task
      );
      setTasks(updatedTasks);
    },
    [tasks]
  );

  useEffect(() => {
    console.log({ tasks });
  }, [tasks]);

  return (
    <div className="center-content">
      <div className="list-border">
        <div className="top-section">
          <input
            type="text"
            placeholder="Enter a new task"
            value={newTask.text}
            onChange={handleNewTaskChange}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <div>{error && <p>Madde zaten ekli</p>}</div>
        <div className="list-container">
          <ul className="list-group">
            {tasks.map((task) => (
              <li key={task.id} className="list-group-item">
                <Item
                  task={task}
                  //onChangeCheckedStat={onChangeCheckedStat}
                  onChangeCheckedStat={() => changeCheckStat(task.id)}
                  isChecked={task.isChecked}
                  onDelete={() => deleteTask(task.id)}
                  onEdit={(editedText) =>
                    editTask(task.id, {
                      ...task,
                      text: editedText,
                    })
                  }
                >
                  {task.text}
                </Item>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default List;

import React, { useState, useRef, useEffect } from "react";
import "./todolist.css";
import { Footer } from '../LandingPage';
import { createTodo, getTodos, deleteTodo } from '../../../api/auth';
import NavBar from '../LandingPage/navbar/navbar';
import { v4 as uuidv4 } from 'uuid';

const ToDoList = () => {
  const [items, setItems] = useState([]);
  const [inputText, setInputText] = useState("");
  const timeoutsRef = useRef({});
  const [timers, setTimers] = useState({});

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await getTodos();
        setItems(todos);
      } catch (error) {
        console.error("Error fetching ToDos:", error);
      }
    };

    fetchTodos();
  }, []);

  const addItem = async () => {
    if (inputText.trim() !== "") {
      try {
        const newTodo = {
          id: uuidv4(),
          text: inputText,
          completed: false
        };
        setItems(prevItems => [...prevItems, newTodo]);
        setInputText("");

        await createTodo({
          text: newTodo.text,
          completed: newTodo.completed
        });
      } catch (error) {
        console.error("Error creating ToDo:", error);
      }
    }
  };

  const toggleItemCompletion = (id) => {
    setItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );

      const item = updatedItems.find(item => item.id === id);

      if (item.completed) {
        const timeoutId = setTimeout(() => {
          deleteItem(id);
        }, 15000);
        timeoutsRef.current[id] = timeoutId;

        setTimers(prevTimers => ({ ...prevTimers, [id]: 15 }));
      } else {
        clearTimeout(timeoutsRef.current[id]);
        delete timeoutsRef.current[id];
        setTimers(prevTimers => {
          const updatedTimers = { ...prevTimers };
          delete updatedTimers[id];
          return updatedTimers;
        });
      }

      const incompleteItems = updatedItems.filter(item => !item.completed);
      const completedItems = updatedItems.filter(item => item.completed);

      return [...incompleteItems, ...completedItems];
    });
  };

  const deleteItem = async (id) => {
    try {
      const isDeleted = await deleteTodo(id);
      if (isDeleted) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        delete timeoutsRef.current[id];
        setTimers((prevTimers) => {
          const updatedTimers = { ...prevTimers };
          delete updatedTimers[id];
          return updatedTimers;
        });
      } else {
        console.error(`Error deleting ToDo: Item with ID ${id} not found in the backend.`);
      }
    } catch (error) {
      console.error("Error deleting ToDo:", error.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers => {
        const newTimers = { ...prevTimers };
        Object.keys(newTimers).forEach(id => {
          if (newTimers[id] > 0) {
            newTimers[id] -= 1;
          }
        });
        return newTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="todo-body">
      <NavBar className="fadeIn about-nav" />
      <div className="todo-content">
        <div className="todo-container">
          <div className="todo-heading">
            <h1>To-Do List</h1>
          </div>
          <InputArea
            value={inputText}
            onChange={setInputText}
            onAdd={addItem}
          />
          <div className="todo-list-container">
            <ul className="todo-list">
              {items.map((todoItem) => (
                <ToDoItem
                  key={todoItem.id}
                  id={todoItem.id}
                  text={todoItem.text}
                  completed={todoItem.completed}
                  onToggle={toggleItemCompletion}
                  countdown={timers[todoItem.id]}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer className="fadeIn about-footer" />
    </div>
  );
};

const InputArea = ({ value, onChange, onAdd }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="todo-form">
      <input
        className="todo-input"
        onChange={handleChange}
        type="text"
        value={value}
        placeholder="Enter a task"
      />
      <button className="todo-add-button" onClick={onAdd}>
        <span>Add</span>
      </button>
    </div>
  );
};

const ToDoItem = ({ id, text, completed, onToggle, countdown }) => {
  return (
    <div
      className={`todo-item ${completed ? "completed" : "new-item"}`}
      onClick={() => onToggle(id)}
    >
      <li>
        <span className="todo-text">
          {text}
        </span>
        {completed && <span className="countdown">({countdown}s)</span>}
      </li>
    </div>
  );
};

export default ToDoList;
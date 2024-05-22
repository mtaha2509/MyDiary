import React, { useState, useRef, useEffect } from "react";
import "./todolist.css";
import { Footer } from '../LandingPage';
import { createTodo, getTodos, deleteTodo } from '../../../api/auth';
import NavBar from '../LandingPage/navbar/navbar';

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
        const newTodo = await createTodo({
          text: inputText,
          completed: false
        });
        setItems(prevItems => [newTodo, ...prevItems]);
        setInputText("");
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
      await deleteTodo(id);
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      delete timeoutsRef.current[id];
      setTimers(prevTimers => {
        const updatedTimers = { ...prevTimers };
        delete updatedTimers[id];
        return updatedTimers;
      });
    } catch (error) {
      console.error("Error deleting ToDo:", error);
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
                  key={todoItem.id} // Use the id of the todoItem as the key
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

const InputArea = (props) => {
  const handleChange = (event) => {
    const newValue = event.target.value;
    props.onChange(newValue);
  };

  return (
    <div className="todo-form">
      <input
        className="todo-input"
        onChange={handleChange}
        type="text"
        value={props.value}
        placeholder="Enter a task"
      />
      <button className="todo-add-button" onClick={props.onAdd}>
        <span>Add</span>
      </button>
    </div>
  );
};

const ToDoItem = (props) => {
  return (
    <div
      className={`todo-item ${props.completed ? "completed" : "new-item"}`}
      onClick={() => {
        props.onToggle(props.id);
      }}
    >
      <li>
        <span className="todo-text">
          {props.text}
        </span>
        {props.completed && <span className="countdown">({props.countdown}s)</span>}
      </li>
    </div>
  );
};

export default ToDoList;
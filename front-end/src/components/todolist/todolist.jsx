import React, { useState, useRef } from "react";
import "./todolist.css"; // Import the CSS file
import { Footer } from '../LandingPage';
import NavBar from '../LandingPage/navbar/navbar';

const ToDoList = () => {
  const [items, setItems] = useState([]);
  const timeoutsRef = useRef({}); // Use ref to store timeout IDs

  const addItem = (inputText) => {
    if (inputText.trim() !== "") {
      setItems(prevItems => [{ id: Date.now(), text: inputText, completed: false }, ...prevItems]);
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
          setItems(prevItems => prevItems.filter(item => item.id !== id));
          delete timeoutsRef.current[id]; // Clean up the timeout ID reference
        }, 15000); // 15 seconds delay
        timeoutsRef.current[id] = timeoutId;
      } else {
        clearTimeout(timeoutsRef.current[id]); // Clear the timeout if unmarked
        delete timeoutsRef.current[id]; // Clean up the timeout ID reference
      }

      const incompleteItems = updatedItems.filter(item => !item.completed);
      const completedItems = updatedItems.filter(item => item.completed);

      return [...incompleteItems, ...completedItems];
    });
  };

  return (
    <div className="todo-body">
      <NavBar className="fadeIn about-nav" />
      <div className="todo-content">
        <div className="todo-container">
          <div className="todo-heading">
            <h1>To-Do List</h1>
          </div>
          <InputArea onAdd={addItem} />
          <div className="todo-list-container">
            <ul className="todo-list">
              {items.map((todoItem) => (
                <ToDoItem
                  key={todoItem.id}
                  id={todoItem.id}
                  text={todoItem.text}
                  completed={todoItem.completed}
                  onToggle={toggleItemCompletion}
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
  const [inputText, setInputText] = useState("");
  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputText(newValue);
  };

  return (
    <div className="todo-form">
      <input className="todo-input" onChange={handleChange} type="text" value={inputText} placeholder="Enter a task"/>
      <button className="todo-add-button"
        onClick={() => {
          if (inputText.trim() !== "") {
            props.onAdd(inputText);
            setInputText("");
          }
        }}
      >
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
      <li>{props.text}</li>
    </div>
  );
};

export default ToDoList;
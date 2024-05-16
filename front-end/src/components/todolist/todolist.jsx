import React, { useState } from "react";

const addItem = (inputText) => {
  setItems(prevItems => [...prevItems, { id: prevItems.length, text: inputText }]);
};


const ToDoList = () => {
  const [items, setItems] = useState([]);

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea onAdd={addItem} />
      <div>
        <ul>
          {items.map((todoItem) => (
            <ToDoItem
              key={todoItem.id}
              id={todoItem.id}
              text={todoItem.text}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
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
    <div className="form">
      <input onChange={handleChange} type="text" value={inputText} />
      <button
        onClick={() => {
          props.onAdd(inputText);
          setInputText("");
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
      onClick={() => {
        props.onChecked(props.id);
      }}
    >
      <li>{props.text}</li>
    </div>
  );
};

export default ToDoList;
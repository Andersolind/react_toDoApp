import React, { useState } from "react";
import cx from "classnames";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoValue, setNewTodoValue] = useState("");

  const submitForm = e => {
    e.preventDefault();
    if (!newTodoValue) return;
    addTodo(newTodoValue);
    setNewTodoValue("");
  };

  const remainingTodos = () => {
    const completed = todos.filter(item => item.isCompleted !== true);
    return completed.length;
  };

  const addTodo = text => {
    const newTodos = [...todos, { text, isCompleted: false }];
    setTodos(newTodos);
  };

  const completeTodo = todo => {
    const index = todos.indexOf(todo);
    todos[index].isCompleted = !todos[index].isCompleted;
    setTodos(todos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        <form
          onSubmit={submitForm}
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "flex-start",
            alignContent: "stretch",
            alignItems: "flex-start"
          }}
        >
          <input
            style={{ width: "75%" }}
            type="text"
            className="input"
            value={newTodoValue}
            onChange={e => setNewTodoValue(e.target.value)}
          />
          <button type="submit" style={{ flex: "1 1 auto", cursor: "pointer" }}>
            Add
          </button>
        </form>
        <div className="task-counter">
          {remainingTodos()} remaining out of {todos.length} tasks
        </div>
        <ul>
          {todos.map((todo, index) => (
            <li
              key={`${index}_${todo.value}`}
              onClick={() => completeTodo(todo)}
              className={cx({ "is-done": todo.isComplete })}
              style={{
                cursor: "pointer",
                zIndex: 0,
                textDecoration: todo.isCompleted ? "line-through" : ""
              }}
            >
              {todo.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

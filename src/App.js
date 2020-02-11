import React, { useState } from "react";
import "./App.css";

const Todo = ({ todo, completeTodo, removeTodo }) => {
  const remove = e => {
    e.preventDefault();
    removeTodo(todo);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "flex-start",
        alignContent: "stretch",
        alignItems: "flex-start"
      }}
    >
      <div
        onClick={() => completeTodo(todo)}
        className="todo"
        style={{
          flex: "1 1 auto",
          cursor: "pointer",
          textDecoration: todo.isCompleted ? "line-through" : ""
        }}
      >
        {todo.text}
      </div>
      <button
        type="button"
        style={{ width: "3em", cursor: "pointer" }}
        onClick={e => remove(e)}
      >
        x
      </button>
    </div>
  );
};

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
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
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button type="submit" style={{ flex: "1 1 auto", cursor: "pointer" }}>
        Add
      </button>
    </form>
  );
};

function App() {
  const [todos, setTodos] = useState([]);

  const completedTodos = () => {
    const completed = todos.filter(item => item.isCompleted === true);
    return completed.length;
  };

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = todo => {
    const index = todos.indexOf(todo);
    todos[index].isCompleted = !todos[index].isCompleted;
    setTodos(todos);
  };

  const removeTodo = todo => {
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    setTodos(todos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        <TodoForm addTodo={addTodo} />
        Completed {completedTodos()}/{todos.length}
        {todos.map((todo, index) => (
          <Todo
            key={`${index}_${todo.value}`}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

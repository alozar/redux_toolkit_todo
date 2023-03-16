import { useState } from 'react';
import uniqid from 'uniqid';
import './App.css';
import TodoList from './components/TodoList';
import InputField from './components/InputField';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [text, setText] = useState([]);

  const addTodo = (e) => {
    if (text.trim().length) {
      setTodoList([
        ...todoList,
        {
          id: uniqid(),
          text: text,
          completed: false,
        },
      ]);
      setText('');
    }
  }

  const removeTodo = (todoId) => {
    setTodoList(todoList.filter(todo => todo.id !== todoId));
  }

  const toggleTodoComplete = (todoId) => {
    setTodoList(
      todoList.map(todo => {
        if(todo.id !== todoId) {
          return todo;
        }
        return {...todo, completed: !todo.completed};
      })
    )
  }

  return (
    <div className="App">
      <InputField btnText='Add Todo' text={text} handleInput={setText} handleSubmit={addTodo} />
      <TodoList
        todoList={todoList}
        removeTodo={removeTodo}
        toggleTodoComplete={toggleTodoComplete} />
    </div>
  );
}

export default App;

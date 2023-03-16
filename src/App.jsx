import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from "./store/todoSlice"
import './App.css';
import TodoList from './components/TodoList';
import InputField from './components/InputField';

function App() {
  const [text, setText] = useState([]);
  const dispatch = useDispatch();

  const addTodoFunc = () => {
    dispatch(addTodo({text}));
    setText('');
  };

  return (
    <div className="App">
      <InputField btnText='Add Todo' text={text} handleInput={setText} handleSubmit={addTodoFunc} />
      <TodoList />
    </div>
  );
}

export default App;

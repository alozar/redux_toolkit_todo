import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTodoAsync, fetchTodoListAsync } from "./store/todoSlice"
import './App.css';
import TodoList from './components/TodoList';
import InputField from './components/InputField';

function App() {
  const [title, setTitle] = useState('');
  const {status, error} = useSelector(state => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodoListAsync());
  }, [dispatch]);

  const addTodoFunc = () => {
    dispatch(createTodoAsync({title}));
    setTitle('');
  };

  return (
    <div className="App">
      <InputField btnText='Add Todo' title={title} handleInput={setTitle} handleSubmit={addTodoFunc} />
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>An error occured: {error}</h2>}
      <TodoList />
    </div>
  );
}

export default App;

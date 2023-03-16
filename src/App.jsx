import { useState } from 'react';
import uniqid from 'uniqid';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [text, setText] = useState([]);

  const addTodo = (e) => {
    if (text.trim().length) {
      setTodoList([
        ...todoList,
        {
          id: uniqid(),
          text,
          completed: false,
        },
      ]);
      setText('');
    }
  }

  return (
    <div className="App">
      <label>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={addTodo}>Add Todo</button>
      </label>
      <ul>
        {
          todoList.map(todo => (
            <li key={todo.id}>
              <input type='checkbox' />
              <span>{todo.text}</span>
              <span style={{color: 'red'}}>&times;</span>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;

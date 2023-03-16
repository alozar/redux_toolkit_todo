import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'

const TodoList = () => {
  const todoList = useSelector(state => state.todo.todoList);
  return (
    <ul>
      {todoList.map(todo => <TodoItem key={todo.id} {...todo} /> )}
    </ul>
  )
}

export default TodoList
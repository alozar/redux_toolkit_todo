import { useDispatch } from 'react-redux';
import { deleteTodoAsync, toggleTodoCompleteAsync } from "../store/todoSlice";

const TodoItem = ({id, title, completed}) => {
  const dispatch = useDispatch();

  return (
    <li key={id}>
      <input type='checkbox' checked={completed} onChange={() => dispatch(toggleTodoCompleteAsync({id}))} />
      <span>{title}</span>
      <span className='deleteSpan' onClick={() => dispatch(deleteTodoAsync({id}))}>&times;</span>
    </li>
  )
}

export default TodoItem
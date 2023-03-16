import React from 'react'
import TodoItem from './TodoItem'

const TodoList = ({todoList, removeTodo, toggleTodoComplete}) => {
  return (
    <ul>
      {todoList.map(todo => (
          <TodoItem key={todo.id}
            {...todo}
            removeTodo={removeTodo}
            toggleTodoComplete={toggleTodoComplete} />
        ))
      }
    </ul>
  )
}

export default TodoList
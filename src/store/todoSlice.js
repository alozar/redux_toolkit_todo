import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodoListAsync = createAsyncThunk(
  'todoList/fetchTodoListAsync',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      if (!response.ok) {
        throw new Error('Can\'t get todoList! ServerError!');
      }
      const data = await response.json();
      return data;
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todoList/deleteTodoAsync',
  async ({id}, {rejectWithValue, dispatch}) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Can\'t delete todo! ServerError!');
      }
      dispatch(removeTodo({id}));
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleTodoCompleteAsync = createAsyncThunk(
  'todoList/toggleTodoCompleteAsync',
  async ({id}, {rejectWithValue, dispatch, getState}) => {
    const todo = getState().todo.todoList.find(todo => todo.id === id);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed
        }),
      });
      if (!response.ok) {
        throw new Error('Can\'t toggle todo! ServerError!');
      }
      dispatch(toggleTodoComplete({id}));
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTodoAsync = createAsyncThunk(
  'todoList/createTodoAsync',
  async ({title}, {rejectWithValue, dispatch}) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, userId: 1, completed: false}),
      });
      if (!response.ok) {
        throw new Error('Can\'t create todo! ServerError!');
      }
      const todo = await response.json();
      dispatch(addTodo(todo));
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const todoSlice = createSlice({
  name: 'todoList',
  initialState: {
    todoList: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todoList.push(action.payload);
    },
    removeTodo(state, action) {
      state.todoList = state.todoList.filter(todo => todo.id !== action.payload.id);
    },
    toggleTodoComplete(state, action) {
      const toggledTodo = state.todoList.find(todo => todo.id === action.payload.id);
      toggledTodo.completed = !toggledTodo.completed;
    },
  },
  extraReducers: {
    [fetchTodoListAsync.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTodoListAsync.fulfilled]: (state, action) => {
      state.status = 'resolve';
      state.todoList = action.payload;
    },
    [fetchTodoListAsync.rejected]: setError,
    [deleteTodoAsync.rejected]: setError,
    [toggleTodoCompleteAsync.rejected]: setError,
    [createTodoAsync.rejected]: setError,
  }
});

const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;
export default todoSlice.reducer;
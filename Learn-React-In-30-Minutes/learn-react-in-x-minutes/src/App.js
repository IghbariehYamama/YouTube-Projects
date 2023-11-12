// The useRef hook allows us to reference elements inside our html (in our case, input)
import React, { useState, useRef, useEffect } from 'react';
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
    const [todos, setTodos] = useState([])

    // Now we have access to the input element
    const todoNameRef = useRef()

    // This useEffect function loads our 'todos' list after saving it
    // We only want to call this once, right when our component loads
    // A trick to call this only once:
    // to give it an empty array, because it never changes, and so we will only call this function once
    useEffect(() => {
        // Now when we refresh the page, it will load all the todos that we've added
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTodos) setTodos( prevTodos => [...prevTodos, ...storedTodos] );
    }, []);

    // What the useEffect function says here:
    // Anytime our array 'todos' changes, we save it in a localstorage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    function toggleTodo(id){
        // In react, we should never directly modify a state variable (in our case, todos)
        // , we should always create a copy before modifying it and use that copy to set the new state
        const newTodos = [...todos]

        // now we get the todo that we're actually trying to modify
        const todo = newTodos.find(todo => todo.id === id)

        // todo.complete = the opposite of todo.complete
        todo.complete = !todo.complete
        setTodos(newTodos)
    }

    function handleAddTodo(event){
        const name = todoNameRef.current.value
        if (name === '') return

        // This functional approach is used when the new state depends on the previous state.
        setTodos(prevTodos => {
            // the spread operator (...) is to copy the previous todos.
            return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
        })

        // This clears out our input for us
        todoNameRef.current.value = null
    }

    function handleClearTodos(){
        const newTodos = todos.filter(todo => !todo.complete)
        setTodos(newTodos)
    }

    return (
      <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text"/>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
      </>
  )
}

export default App;

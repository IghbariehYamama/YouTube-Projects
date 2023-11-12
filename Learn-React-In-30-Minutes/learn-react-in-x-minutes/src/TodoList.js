import React from 'react';
import Todo from './Todo';

export default function TodoList({ todos, toggleTodo }) {
    return (
        // We set a key so that when we change one element in the list
        // , we want to rerender just this one element and not all the list
        // we need to make sure that the key is unique for every element
        // The key is there for efficiency purposes
        todos.map(todo => {
            return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
        })
    )
}


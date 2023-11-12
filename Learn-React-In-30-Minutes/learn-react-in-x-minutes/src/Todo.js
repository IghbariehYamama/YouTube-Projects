import React from 'react';

export default function Todo({ todo, toggleTodo }) {
    // We call this function from the input and not toggleTodo because we need to pass an id
    function handleTodoClick(){
        toggleTodo(todo.id)
    }

    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
                {todo.name}
            </label>
        </div>
    )
}


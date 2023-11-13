import {MouseEvent, useState} from "react";

function ListGroup(){
    let items = [
        'New York',
        'San Francisco',
        'Tokyo',
        'London',
        'Paris'
    ];

    // This variable is local to this function component, so react is not aware of it
    // , to change this we use useState
    // let selectedIndex = 0

    // A Hook function (more specifically, a state hook)
    // Using the state hook we can tell react that this component can have data or state that can change over time

    const [selectedIndex, setSelectedIndex] = useState(-1);

    // event: MouseEvent => this is called type annotation in typescript
    // with type annotation we can specify the type of our variables, parameters, ...
    // This function is called event handler, because its job is to handle events
    const handleClick = (event: MouseEvent) => console.log(event);

    return (
        // If we're using empty angle brackets, we're telling react to use a fragment to wrap all the children
        // in react, each list item should have a key property that uniquely identifies that item
        // - react needs this to keep track of our items so that when we update an item it knows which item to update
    <>
        <h1>List</h1>
        { // the line below means if the first condition is true, render the second condition, else do not render anything
          // the line equals: items.length === 0 ? <p>No item found</p> : null
             }
        { items.length === 0 && <p>No item found</p> }
        <ul className="list-group">
            {items.map((item, index) => (
                <li
                    className={
                    selectedIndex === index ? 'list-group-item active' : 'list-group-item'
                }
                    key={item}
                    onClick={ () => { setSelectedIndex(index); } }
                >
                    { item }
                </li>
            ))}
        </ul>
    </>
    );
}

export default ListGroup;
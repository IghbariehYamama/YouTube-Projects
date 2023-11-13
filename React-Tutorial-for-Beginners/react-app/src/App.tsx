import ListGroup from "./components/ListGroup";

function App(){
    // each ListGroup is independent of each other
    // , so when we select an item from one, the other doesn't get affected and so on.
    return <div>
        <ListGroup />
    </div>
}

export default App;
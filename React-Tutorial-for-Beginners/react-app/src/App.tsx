// import ListGroup from "./components/ListGroup";

import Alert from "./components/Alert";
import ButtonExercise from "./components/ButtonExercise";
import {useState} from "react";

function App(){
    let items = [
        'New York',
        'San Francisco',
        'Tokyo',
        'London',
        'Paris'
    ];

    const handleSelectItem = (item: string) => {
        console.log(item);
    }

    const [alertVisible, setAlertVisibility] = useState(false)

    // each ListGroup is independent of each other
    // , so when we select an item from one, the other doesn't get affected and so on.
    return (
        <div>
            { //<ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem}/>
            }
            {/*<Alert>
                Hello <span>World</span>
            </Alert>*/
            }
            {
                // The "MY alert" text is the children that we're passing to the Alert component
            }
            { alertVisible && <Alert onClose={() => setAlertVisibility(false)}>My alert</Alert> }
            <ButtonExercise onClick={() => setAlertVisibility(true)}>My Button</ButtonExercise>
    </div>
    );
}

export default App;
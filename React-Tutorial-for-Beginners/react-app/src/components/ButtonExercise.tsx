import {useState} from "react";

interface Props {
    children: string;

    // The question mark means that this property is optional
    // The union operator | allows us to set this property to only one of these values (primary, secondary, danger) and nothing else
    // - this is good if someone for example sets the button to a "react" color (which does not exist) and we don't want to allow it
    color?: 'primary' | 'secondary' | 'danger';
    onClick: () => void;
}


// color = 'primary' => this means that the default value for the color prop is primary
function ButtonExercise({ children, onClick, color = 'primary' }: Props){

    // onClick is a function that's going to be passed from the outside
    return (
        <button type="button" className={'btn btn-' + color} onClick={ onClick }>{children}</button>
    );
}

export default ButtonExercise;
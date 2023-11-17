// This allows us to pass html content as an alert component
import {ReactNode} from "react";

interface Props {

    // All components support the children prop
    // - using this we can pass our text to the component (in our case, the component is Alert and the child is "Hello World" in the App.tsx file)
    children: ReactNode;

    onClose: () => void;
}

const Alert = ({ children, onClose }: Props) => {
    return (
        <div className="alert alert-primary alert-dismissible">
            {children}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={onClose}></button>
        </div>
    )
}

export default Alert;
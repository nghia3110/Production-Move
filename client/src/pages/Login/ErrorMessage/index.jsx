import {MdOutlineError} from 'react-icons/md';
import './errorMessage.css';
function ErrorMessage() {
    return (
        <div id='errorMessage' className="flex gap-3 items-center justify-cneter h-16 bg-red-300 p-4 mt-4 text-amber-800 text-lg text-center rounded-lg absolute top-0 left-5">
            <MdOutlineError /> <span>Email or password is incorrect!</span>
        </div>
    );
}

export default ErrorMessage;
import {useState} from "react";
import RegisterStudent from "./RegisterStudent";
import RegisterTeacher from "./RegisterTeacher";
import toastr from "toastr";
import './styles/Register.css'

function Register(props) {
    const [buttonText, setButtonText] = useState('teacher');

    return (
        <div className="Register">
            <button id={'btnSwitchUserType'} onClick={() => {
                if (buttonText === 'teacher'){
                    setButtonText('student')
                    toastr.success('You are now a Teacher');
                } else{
                    toastr.success('You are now a Student');
                    setButtonText('teacher')
                }

            }}>{buttonText}?</button>

            {buttonText === 'teacher' ? <RegisterStudent/> : <RegisterTeacher/>}

            <button id={'btnAlreadyHaveAccount'} onClick={() => props.onFormSwitch('login')}>Already have an account? Log in here</button>
        </div>
    );
}

export default Register;

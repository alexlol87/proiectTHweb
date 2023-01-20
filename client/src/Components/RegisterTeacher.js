import {useState} from "react";
import axios from "axios";
import toastr from 'toastr'
import './styles/RegisterTeacher.css'

function RegisterTeacher() {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [department, setDepartment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("register teacher")

        let teacher = {
            userType: 'Teacher',
            mail: mail,
            password: password,
            first_name: firstName,
            last_name: lastName,
            department: department
        }

        if (teacher.mail === "" ||
            teacher.password === "" ||
            teacher.first_name === "" ||
            teacher.last_name === "" ||
            teacher.department === ""
        ) {
            toastr.error('Complete all the fields!')
        } else {
            axios.post('http://localhost:8080/api/account/register', teacher)
                .then((res) => {
                    toastr.success('User created')
                    // console.log(res)
                })
                .catch((err) => {
                    console.log(err);
                    toastr.error('Erorr')
                })
        }
    }
    return (
        <form id={'registerTeacherForm'} onSubmit={handleSubmit}>
            <label htmlFor="mail">mail</label>
            <input value={mail} onChange={(event) => setMail(event.target.value)} type="mail"
                   placeholder="mail"/>

            <label htmlFor="password">password</label>
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password"
                   placeholder="password"/>

            <label htmlFor="firstName">firstName</label>
            <input value={firstName} onChange={(event) => setFirstName(event.target.value)} type="firstName"
                   placeholder="firstName"/>

            <label htmlFor="lastName">lastName</label>
            <input value={lastName} onChange={(event) => setLastName(event.target.value)} type="lastName"
                   placeholder="lastName"/>


            <label htmlFor="department">department</label>
            <input value={department} onChange={(event) => setDepartment(event.target.value)} type="department"
                   placeholder="department"/>

            <button id={'btnRegisterTeacher'}>Register</button>
        </form>
    );
}

export default RegisterTeacher;
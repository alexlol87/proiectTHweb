import './styles/Login.css'
import {useState} from "react";
import axios from "axios";
import './styles/RegisterStudent.css'
import toastr from 'toastr'

function RegisterStudent() {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [faculty, setFaculty] = useState('');
    const [series, setSeries] = useState('');
    const [year, setYear] = useState('');
    const [group, setGroup] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("register student")
        let student = {
            userType: 'Student',
            mail: mail,
            password: password,
            first_name: firstName,
            last_name: lastName,
            faculty: faculty,
            series: series,
            year: year,
            group_number: group
        }

        if (student.mail === "" ||
            student.password === "" ||
            student.first_name === "" ||
            student.last_name === "" ||
            student.faculty === "" ||
            student.series === "" ||
            student.year === "" ||
            student.group_number === ""
        ) {
            toastr.error('Complete all the fields!')
        } else {
            axios.post('http://localhost:8080/api/account/register', student)
                .then((res) => {
                    toastr.success('User created')
                })
                .catch((err) => {
                    console.log(err);
                    toastr.error('Erorr')
                })
        }
    }

    return (
        <form id={'registerStudentForm'} onSubmit={handleSubmit}>
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

            <label htmlFor="faculty">faculty</label>
            <input value={faculty} onChange={(event) => setFaculty(event.target.value)} type="faculty"
                   placeholder="faculty"/>

            <label htmlFor="series">series</label>
            <input value={series} onChange={(event) => setSeries(event.target.value)} type="series"
                   placeholder="series"/>

            <label htmlFor="year">year</label>
            <input value={year} onChange={(event) => setYear(event.target.value)} type="year"
                   placeholder="year"/>

            <label htmlFor="group">group</label>
            <input value={group} onChange={(event) => setGroup(event.target.value)} type="group"
                   placeholder="group"/>
            <button id={'btnRegisterStud'}>Register</button>
        </form>
    );
}

export default RegisterStudent;
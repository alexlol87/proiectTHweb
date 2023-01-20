import React, {useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import toastr from "toastr";

function Login(props) {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('Student');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let user = {
            mail: mail,
            password: password
        }
        axios.put(`http://localhost:8080/api/account/login/${userType}`, user)
            .then((res) => {
                // console.log(
                //     '\nuserType: ' + res.data.userType +
                //     '\nmail: ' + res.data.mail +
                //     '\nfirst_name: ' + res.data.first_name +
                //     '\nlast_name: ' + res.data.last_name +
                //     '\nfaculty: ' + res.data.faculty +
                //     '\ngroup: ' + res.data.group +
                //     '\nseries: ' + res.data.series +
                //     '\nyear: ' + res.data.year
                // )
                //? trimitem prin state toate atributele userului ca sa le folosim in celelalte componente cand dam reactii
                if(res.data.userType ==='Student'){
                    return navigate('/search',{state: {
                            userType: 'Student',
                            mail: res.data.mail,
                            first_name: res.data.first_name,
                            last_name: res.data.last_name,
                            faculty: res.data.faculty,
                            group: res.data.group,
                            series: res.data.series,
                            year: res.data.year
                        }})
                }else if(res.data.userType === 'Teacher'){
                    return navigate('/teacherPage',{state: {
                            userType: 'Teacher',
                            mail: res.data.mail,
                            first_name: res.data.first_name,
                            last_name: res.data.last_name,
                            department: res.data.department
                        }})
                }else{
                    return navigate('/wrong')
                }
            })
            .catch((err) => {
                console.log('Error: ' + err);
                toastr.error(err.message)
            })
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <label className={'lbLogin'} htmlFor="email">mail</label>
                <input className={'inputLogin'} value={mail} onChange={(event) => setMail(event.target.value)} type="mail" placeholder="mail"/>
                <label className={'lbLogin'} htmlFor="password">password</label>
                <input className={'inputLogin'} value={password} onChange={(event) => setPassword(event.target.value)} type="password"
                       placeholder="password"/>
                <label className={'lbLogin'} htmlFor="UserType">Student/Teacher</label>
                <input className={'inputLogin'} value={userType} onChange={(event) => setUserType(event.target.value)} type="text"
                       placeholder="UserType"/>
                <br/>
                <button id={'btnLogin'}>Log in</button>
            </form>
            <button  id={'btnRegister'} onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here</button>
        </div>
    );
}

export default Login;

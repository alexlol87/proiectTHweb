import './styles/App.css';
import Login from "./Login";
import React, {useState} from 'react'
import Register from "./Register";
import {Route, Routes} from "react-router-dom";
import Wrong from "./Wrong";
import Search from "./Search";
import ActivityStudent from "./ActivityStudent";
import TeacherPage from "./TeacherPage";
import CreateActivityPage from "./CreateActivityPage";
import ActivityTeacher from "./ActivityTeacher";


function App() {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName)
    }

    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={currentForm === 'login' ? <Login onFormSwitch={toggleForm}/> :
                    <Register onFormSwitch={toggleForm}/>}/>
                <Route path={'/wrong'} element={<Wrong/>}></Route>
                <Route path={'/search'} element={<Search/>}></Route>
                <Route path={'/activityStudent'} element={<ActivityStudent/>}></Route>
                <Route path={'/teacherPage'} element={<TeacherPage/>}></Route>
                <Route path={'/createActivity'} element={<CreateActivityPage/>}></Route>
                <Route path={'/activityTeacher'} element={<ActivityTeacher/>}></Route>
            </Routes>
        </div>
    );
}

export default App;

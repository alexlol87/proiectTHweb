import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import './styles/TeacherPage.css'

function TeacherPage() {
    const location = useLocation()
    const [ activitiesArr, setActivitiesArr ] = useState([]);
    let activities = null;

    const navigate = useNavigate()
    const handleCreateActivity = () => {
        navigate('/createActivity', {
            state: {
                userType: 'Teacher',
                mail: location.state.mail,
                first_name: location.state.first_name,
                last_name: location.state.last_name,
                department: location.state.department
            }
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/api/teachers/getTeacherByMail/${ location.state.mail }`)
            .then((res) => {

                axios.get(`http://localhost:8080/api/activities/getActivitiesByDate/${ res.data.id }`)
                    .then((res2) => {
                        setActivitiesArr(res2.data)
                    })
                    .catch((err2) => {
                        console.log('Axios error 2 ' + err2)
                    })
            })
            .catch((err) => {
                console.log('Axios error 1 ' + err)
            })
    }, []);


    return (<div id="containerActivitati">
        <button id="btnCreareActivitate" onClick={ handleCreateActivity }>Creare activitate</button>
        { activitiesArr.length > 0 ?
            activitiesArr.map((activity) => {
                return (

                    <div key={ activity.id }>
                        <p> Nume activitate: { activity.name } </p>
                        <p> Descriere: { activity.description } </p>
                        <p> Start date: { activity.start_date } </p>
                        <p> End date: { activity.end_date } </p>
                        <button className="btnFeedback" onClick={ () => {
                            navigate('/activityTeacher', {
                                state: {
                                    activityId: activity.id
                                }
                            })
                        } }>Feedback
                        </button>
                        <br />
                    </div>

                )
            }) : <h4>No active activities, please create one.</h4> }
    </div>)
}

export default TeacherPage
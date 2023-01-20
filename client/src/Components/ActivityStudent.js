import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toastr from 'toastr'
import './styles/ActivityStudent.css'

function ActivityStudent() {

    const location = useLocation()

    const [ first_name, setFirst_name ] = useState('');
    const [ last_name, setLast_name ] = useState('');

    axios.get(`http://localhost:8080/api/teachers/getTeacherById/${ location.state.activity.teacherId }`)
        .then((res) => {
            setFirst_name(res.data.first_name)
            setLast_name(res.data.last_name)
        })
        .catch((err) => {
            console.log('Axios error ' + err)
        })

    let end_date = new Date(location.state.activity.end_date)
    let start_date = new Date(location.state.activity.start_date)

    const handleSmileyFace = () => {
        axios.get(`http://localhost:8080/api/activities/getActivityByName/${ location.state.activity.name }`)
            .then((res) => {
                let reaction = {
                    type: 'smiley',
                    activityId: res.data.id
                }
                axios.post('http://localhost:8080/api/reactions/createReaction', reaction)
                    .then((res2) => {
                        console.log('Successful smiley face ' + res2.status)
                        toastr.success('Smiley posted')
                    })
                    .catch((err2) => {
                        console.log('Axios Error 2 ' + err2)
                    })
            }).catch((err) => {
                console.log('Axios Error 1 ' + err)
            })
    }

    const handleFrownedFace = () => {
        axios.get(`http://localhost:8080/api/activities/getActivityByName/${ location.state.activity.name }`)
            .then((res) => {
                let reaction = {
                    type: 'frown',
                    activityId: res.data.id
                }
                axios.post('http://localhost:8080/api/reactions/createReaction', reaction)
                    .then((res2) => {
                        console.log('Successful frown face ' + res2.status)
                        toastr.success('Frown posted')
                    })
                    .catch((err2) => {
                        console.log('Axios Error 2 ' + err2)
                    })
            }).catch((err) => {
                console.log('Axios Error 1 ' + err)
            })
    }
    const handleConfusedFace = () => {
        axios.get(`http://localhost:8080/api/activities/getActivityByName/${ location.state.activity.name }`)
            .then((res) => {
                let reaction = {
                    type: 'confused',
                    activityId: res.data.id
                }
                axios.post('http://localhost:8080/api/reactions/createReaction', reaction)
                    .then((res2) => {
                        console.log('Successful confused face ' + res2.status)
                        toastr.success('Confused face posted')
                    })
                    .catch((err2) => {
                        console.log('Axios Error 2 ' + err2)
                    })
            }).catch((err) => {
                console.log('Axios Error 1 ' + err)
            })
    }
    const handleSurprisedFace = () => {
        axios.get(`http://localhost:8080/api/activities/getActivityByName/${ location.state.activity.name }`)
            .then((res) => {
                let reaction = {
                    type: 'surprised',
                    activityId: res.data.id
                }
                axios.post('http://localhost:8080/api/reactions/createReaction', reaction)
                    .then((res2) => {
                        console.log('Successful surprised face ' + res2.status)
                        toastr.success('Surprised face posted')
                    })
                    .catch((err2) => {
                        console.log('Axios Error 2 ' + err2)
                    })
            }).catch((err) => {
                console.log('Axios Error 1 ' + err)
            })
    }

    return (
        <div id="containerActivitateProfesor">
            <h1>Nume activitate: { location.state.activity.name }</h1>
            <h2>Descriere: { location.state.activity.description }</h2>
            <h3>Start date: { start_date.getDate() + '-' + (start_date.getMonth() + 1) + '-' + start_date.getFullYear() }</h3>
            <h3>End date: { end_date.getDate() + '-' + (end_date.getMonth() + 1) + '-' + end_date.getFullYear() }</h3>
            <br />
            <p>Activitate sustinuta de { first_name } { last_name }</p>
            <br />
            <img src={ require('../images/smiley.png') } alt={ 'nu merge' } onClick={ handleSmileyFace } />
            <img src={ require('../images/confused.png') } alt={ 'nu merge' } onClick={ handleConfusedFace } />
            <img src={ require('../images/frowny.png') } alt={ 'nu merge' } onClick={ handleFrownedFace } />
            <img src={ require('../images/surprised.png') } alt={ 'nu merge' } onClick={ handleSurprisedFace } />
        </div>
    )
}

export default ActivityStudent
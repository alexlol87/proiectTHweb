import {useLocation} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import toastr from 'toastr'

function CreateActivityPage(props) {
    const location = useLocation()
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date] = useState('');

    const handleCreate = (e) => {
        e.preventDefault()
        let newStartDate = Date.parse(start_date)
        let newEndDate = Date.parse(end_date)


        axios.get(`http://localhost:8080/api/teachers/getTeacherByMail/${location.state.mail}`)
            .then((res) => {
                let activity = {
                    name: name,
                    description: description,
                    start_date: start_date,
                    end_date: end_date,
                    teacherId: res.data.id
                }
                axios.post(`http://localhost:8080/api/activities/create`,activity)
                    .then((res2) => {
                        console.log('Activity created ' + res2.status)
                        toastr.success('Activity created')
                    })
                    .catch((err2) => {
                        console.log('Axios error 2 ' + err2)
                    })
            })
            .catch((err) => {
                console.log('Axios error 1 ' + err)
            })
    }


    return (
        <>
            <h1>CreateActivityPage</h1>
            <form onSubmit={handleCreate}>
                <label htmlFor="name">name</label>
                <input value={name} onChange={(event) => setName(event.target.value)} type="name" placeholder="name"/>
                <label htmlFor="description">description</label>
                <input value={description} onChange={(event) => setDescription(event.target.value)} type="description"
                       placeholder="description"/>
                <label htmlFor="start_date">start_date</label>
                <input value={start_date} onChange={(event) => setStart_date(event.target.value)} type="text"
                       placeholder="start_date"/>
                <label htmlFor="end_date">end_date</label>
                <input value={end_date} onChange={(event) => setEnd_date(event.target.value)} type="text"
                       placeholder="end_date"/>
                <button>Create</button>
            </form>
        </>
    )
}

export default CreateActivityPage
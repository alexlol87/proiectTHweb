import {useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import './styles/Search.css'
import toastr from 'toastr'

function Search() {
    const [searchBarText, setSearchBarText] = useState('');
    const navigate = useNavigate();
    let location = useLocation()
    const handleButtonClick = () => {
        axios.get(`http://localhost:8080/api/activities/getActivityByName/${searchBarText}`)
            .then((res) => {
                console.log(res.data.end_date)
                console.log(Date.parse(res.data.end_date))
                console.log(Date.parse(res.data.end_date) < Date.now())
                console.log(Date.now())
                let user = {
                    userType: 'Student',
                    mail: location.state.mail,
                    first_name: location.state.first_name,
                    last_name: location.state.last_name,
                    faculty: location.state.faculty,
                    group: location.state.group,
                    series: location.state.series,
                    year: location.state.year
                }

                if (res.status === 200) {
                    navigate('/activityStudent', {
                        state: {
                            user: user,
                            activity: {
                                end_date: res.data.end_date,
                                start_date: res.data.start_date,
                                name: res.data.name,
                                description: res.data.description,
                                teacherId: res.data.teacherId
                            }
                        }
                    })
                }
            }).catch((err) => {
            toastr.warning('No activity found')
            console.log('Axios Error ' + err)
        })
    }

    return (
        <div id={'containerSearch'}>
            <h1>Search an activity</h1>
            <input id={'inputSearch'} type={"text"} value={searchBarText} onChange={(e) => {
                setSearchBarText(e.target.value)
            }} placeholder={'Search an activity'}/>
            <button id={'btnSearch'} onClick={handleButtonClick}>Search</button>
        </div>
    )
}

export default Search
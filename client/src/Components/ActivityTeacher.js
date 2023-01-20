import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import './styles/ActivityTeacher.css'
import toastr from 'toastr'


function ActivityTeacher() {
    const location = useLocation()
    const [ smiley, setSmiley ] = useState(0);
    const [ frown, setFrown ] = useState(0);
    const [ confused, setConfused ] = useState(0);
    const [ surprised, setSurprised ] = useState(0);
    let nrSmiley = 0, nrFrown = 0, nrConfused = 0, nrSurprised = 0;
    let reactionsArr1 = []
    let reactionsArr2 = []
    let i;

    let counter = 0

    useEffect(() => {
        timer()
    }, []);

    const timer = () => {
        if (counter === 0) {
            axios.get(`http://localhost:8080/api/reactions/getReactionByActivity/${ location.state.activityId }`)
                .then((res) => {
                    reactionsArr1 = res.data
                    for (i = 0; i < reactionsArr1.length; i++) {
                        if (reactionsArr1[ i ].type === 'smiley') {
                            nrSmiley++
                        } else if (reactionsArr1[ i ].type === 'surprised') {
                            nrSurprised++
                        } else if (reactionsArr1[ i ].type === 'frown') {
                            nrFrown++
                        } else if (reactionsArr1[ i ].type === 'confused') {
                            nrConfused++
                        }
                    }
                    setSmiley(nrSmiley)
                    setFrown(nrFrown)
                    setSurprised(nrSurprised)
                    setConfused(nrConfused)
                    nrSmiley = nrFrown = nrConfused = nrSurprised = 0
                })
                .catch((err) => {
                    console.log('Axios error ' + err)
                })
        } else if (counter === 1) {
            axios.get(`http://localhost:8080/api/reactions/getReactionByActivity/${ location.state.activityId }`)
                .then((res) => {

                    reactionsArr2 = res.data

                })
                .catch((err) => {
                    console.log('Axios error ' + err)
                })
        } else if (counter % 2 === 0 && counter !== 0) {
            axios.get(`http://localhost:8080/api/reactions/getReactionByActivity/${ location.state.activityId }`)
                .then((res) => {
                    reactionsArr1 = res.data

                    // console.log('ReactionsArr1 ' + reactionsArr1.length)
                    if (reactionsArr1.length > reactionsArr2.length) {
                        toastr.success('New reactions')
                        for (i = 0; i < reactionsArr1.length; i++) {
                            if (reactionsArr1[ i ].type === 'smiley') {
                                nrSmiley++
                            } else if (reactionsArr1[ i ].type === 'surprised') {
                                nrSurprised++
                            } else if (reactionsArr1[ i ].type === 'frown') {
                                nrFrown++
                            } else if (reactionsArr1[ i ].type === 'confused') {
                                nrConfused++
                            }
                        }
                        setSmiley(nrSmiley)
                        setFrown(nrFrown)
                        setSurprised(nrSurprised)
                        setConfused(nrConfused)
                        nrSmiley = nrFrown = nrConfused = nrSurprised = 0
                    }
                })
                .catch((err) => {
                    console.log('Axios error ' + err)
                })
        } else {
            axios.get(`http://localhost:8080/api/reactions/getReactionByActivity/${ location.state.activityId }`)
                .then((res) => {

                    reactionsArr2 = res.data
                    // console.log('ReactionsArr2 ' + reactionsArr2.length)
                    if (reactionsArr2.length > reactionsArr1.length) {
                        toastr.success('New reactions')
                        for (i = 0; i < reactionsArr2.length; i++) {
                            if (reactionsArr2[ i ].type === 'smiley') {
                                nrSmiley++
                            } else if (reactionsArr2[ i ].type === 'surprised') {
                                nrSurprised++
                            } else if (reactionsArr2[ i ].type === 'frown') {
                                nrFrown++
                            } else if (reactionsArr2[ i ].type === 'confused') {
                                nrConfused++
                            }
                        }
                        setSmiley(nrSmiley)
                        setFrown(nrFrown)
                        setSurprised(nrSurprised)
                        setConfused(nrConfused)
                        nrSmiley = nrFrown = nrConfused = nrSurprised = 0
                    }
                })
                .catch((err) => {
                    console.log('Axios error ' + err)
                })
        }
        counter++
        setTimeout(timer, 1000)
    }

    // timer()

    return (
        <div id="containerActivityTeacher">
            <h2>Activitate</h2>
            <ul>
                <li>Smiley😀: { smiley }</li>
                <li>Frown☹️: { frown }</li>
                <li>Confused🤨: { confused }</li>
                <li>Surprised😲: { surprised }</li>
            </ul>
        </div>
    )
}

export default ActivityTeacher
import {useLocation} from "react-router-dom";

function Activity(props) {
    const location = useLocation()
    console.log(1)
    console.log(location)
    console.log(2)
    console.log(location.state)
    return (
        <>
            <h1>Ceva</h1>
        </>
    )
}
export default Activity
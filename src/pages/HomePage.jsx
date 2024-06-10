import { Link } from "react-router-dom"
import NavPage from "../components/NavPage"
function HomePage() {
    return (
        <div className="">
            <NavPage/>
            <h1>WorldWise</h1>
            <Link to="app">App</Link>
        </div>
    )
}

export default HomePage

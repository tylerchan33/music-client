import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <nav>
            <Link to="/">Home</Link>{" | "}
            <Link to="/songs">Your Song List</Link>{" | "}
            <Link to="/songs/new">Add a Song</Link>
        </nav>
    )
}
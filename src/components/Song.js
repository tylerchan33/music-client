import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import axios from "axios"

export default function Song () {
    const [song, setSong] = useState({})
    const [errorMessage, setErrorMessage] = useState("")
    const { id } = useParams()
    const navigate = useNavigate()
    const [comments, setComments] = useState([])
    
    useEffect(() => {
        const getSong = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/songs/${id}`)
                console.log(response.data)
                setSong(response.data.oneSong)
                setComments(response.data.comments)
            } catch(err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            }
        }
        getSong()
    }, [])

    const handleDelete = async () => {
        try {
            // axios to the backend to delete this bounty
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/songs/${id}`)
            // after deletion, navigate back to /bounties
            navigate("/songs")
        } catch(err) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }  
        }
    }

    const commentsList = comments.map(comment => {
        return(
            <div key={`key${comment._id}`}>
                <p>{comment.content}</p>
            </div>
        
        )
    })
    return (
        <div>
            <h1>Song Details</h1>
            <p>{errorMessage}</p>
            <div>
                <Link to={`/songs/${id}/edit`}>
                    <button>Edit</button>
                </Link>
                <button onClick={handleDelete}>Delete</button>
            </div>
            <div>
                <h2>Title: {song.title}</h2>
                <h2>Artist: {song.artist}</h2>
                <h3>Rating: {song.rating}</h3>
                <p>Notes: {song.notes}</p>
                <h2>Comments: {commentsList}</h2>
                
            </div>
        </div>
    )
}
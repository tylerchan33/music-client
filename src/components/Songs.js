import { useEffect, useState } from "react"
import { Link } from "react-router-dom" 
import axios from "axios"

export default function Songs () {
    const [songs, setSongs] = useState([])
    const [errorMessage, setErrorMessage] = useState("")


    useEffect(() => {
        const getSongs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/songs`)
                console.log(response.data)
                setSongs(response.data)
            } catch(err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            }
        }
        getSongs()
    }, [])

    const songLinks = songs.map(song => {
        return (
            <div key={song._id}>
                <Link to={`/songs/${song._id}`}>{song.title} by: {song.artist}</Link>
            </div>
        )
    })
    return (
        <div>
            <h1>Your songs!</h1>
            <p>{errorMessage}</p>
            {songLinks}
        </div>
    )
}
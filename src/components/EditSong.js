import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import axios from "axios"

export default function EditSong () {
    const [form, setForm] = useState({
        title: "",
        artist: "",
        rating: 0,
        notes: ""
    })
    const [errorMessage, setErrorMessage] = useState("")
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getSong = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/songs/${id}`)
                setForm(response.data.oneSong)
            } catch(err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            }
        }
        getSong()
    }, [])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            // post form data to the backend API 
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/songs/${id}`, form)
            // navigate back to /bounties to see the new bounty
            navigate(`/songs/${id}`)
        } catch(err) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
        }

    }

    return (
        <div>
            <h1>Edit Song</h1>
            <p>{errorMessage}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={form.title}
                        onChange={(e) => setForm({...form, title: e.target.value})}
                        placeholder="Song title"
                    />
                </div>
                <div>
                    <label htmlFor="artist">Artist:</label>
                    <input
                        type="text"
                        id="artist"
                        value={form.artist}
                        onChange={(e) => setForm({...form, artist: e.target.value})}
                        placeholder="Artist Name"
                    />
                </div>
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <input
                        type="number"
                        max="10"
                        id="rating"
                        value={form.rating}
                        onChange={(e) => setForm({...form, rating: e.target.value})}
                    
                    />
                </div>
                <div>
                    <label htmlFor="notes">Notes:</label>
                    <input
                        type="text"
                        id="notes"
                        value={form.notes}
                        onChange={(e) => setForm({...form, notes: e.target.value})}
                        placeholder="Any notes on the song..."
                    />
                </div>
                
                <button type="submit">Edit Song</button>
            </form>
            <Link to={`/songs/${id}`}>Go back</Link>
        </div>
    )
}
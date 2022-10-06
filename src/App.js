import './App.css';
import { Routes, BrowserRouter as Router, Route} from "react-router-dom"

import Home from './components/Home';
import Song from './components/Song';
import NewSong from './components/NewSong';
import Songs from './components/Songs';
import EditSong from './components/EditSong';
import Navbar from './components/partials/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <br></br>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route 
            path="/songs"
            element={<Songs />}
          />
          <Route
            path="/songs/new"
            element={<NewSong />}
          />
          <Route
            path="/songs/:id"
            element={<Song />}
          />
          <Route
            path="/songs/:id/edit"
            element={<EditSong />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddRoom from './components/AddRoom';
import EditRoom from './components/EditRoom';
import RoomList from './components/RoomList';
import Home from './components/Home';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Admin from './components/admin/Admin';

function App() {
    return (
      <main>
        <Router>
           <NavBar/>
            
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add-room" element={<AddRoom />} />
                    <Route path="/edit-room" element={<EditRoom />} />
                    <Route path="/edit-room/:id" element={<EditRoom />} />
                    <Route path="/room-list" element={<RoomList />} />
                    <Route path="/admin" element={<Admin/>} />

                </Routes>
            
        </Router>
        <Footer/>
        </main>
    );
}

export default App;

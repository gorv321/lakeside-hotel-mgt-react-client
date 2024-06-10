import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [roomTypeFilter, setRoomTypeFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('https://localhost:7136/api/room');
                setRooms(response.data);
                setFilteredRooms(response.data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    useEffect(() => {
        let filtered = rooms;

        if (roomTypeFilter) {
            filtered = filtered.filter(room => room.type === roomTypeFilter);
        }

        if (priceFilter) {
            filtered = filtered.filter(room => room.price <= parseInt(priceFilter));
        }

        setFilteredRooms(filtered);
    }, [rooms, roomTypeFilter, priceFilter]);

    const handleDelete = async (roomId) => {
        try {
            await axios.delete(`https://localhost:7136/api/room/${roomId}`);
            setRooms(rooms.filter(room => room.roomId !== roomId));
            setFilteredRooms(filteredRooms.filter(room => room.roomId !== roomId));
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Welcome to Lake Side Hotel!</h1>
            <nav className="nav justify-content-center mb-4">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/add-room">Add Room</Link>
                <Link className="nav-link" to="/edit-room">Edit Room</Link>
            </nav>
            <div className="row mb-4">
                <div className="col-md-4">
                    <select className="form-control" value={roomTypeFilter} onChange={(e) => setRoomTypeFilter(e.target.value)}>
                        <option value="">Filter by Type</option>
                        <option value="single">Single Room</option>
                        <option value="double">Double Room</option>
                        {/* Add other room types as needed */}
                    </select>
                </div>
                <div className="col-md-4">
                    <input type="number" className="form-control" placeholder="Max Price" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} />
                </div>
            </div>
            <div className="row">
                {filteredRooms.map(room => (
                    <div key={room.roomId} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <img src={`data:image/jpeg;base64,${room.image}`} alt={room.name} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{room.name}</h5>
                                <p className="card-text">{room.description}</p>
                                <p className="card-text"><strong>Capacity:</strong> {room.capacity} Guests</p>
                                <p className="card-text"><strong>Price:</strong> ₹{room.price}</p>
                                <Link to={`/room-details/${room.roomId}`} className="btn btn-primary mr-2">View</Link>
                                <Link to={`/edit-room/${room.roomId}`} className="btn btn-success mr-2">Edit</Link>
                                <button className="btn btn-danger" onClick={() => handleDelete(room.roomId)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomList;

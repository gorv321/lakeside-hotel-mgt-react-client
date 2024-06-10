import React, { useEffect, useState } from 'react';
import { getRoomById, updateRoom, getAllRooms } from '../api/roomService.js';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditRoom = () => {
    const { id } = useParams();
    const [rooms, setRooms] = useState([]);
    const [roomData, setRoomData] = useState({
        name: '',
        description: '',
        capacity: '',
        price: '',
        imageFile: null,
    });

    useEffect(() => {
        const fetchRooms = async () => {
            const roomsData = await getAllRooms();
            setRooms(roomsData);
        };

        if (id) {
            const fetchRoom = async () => {
                const room = await getRoomById(id);
                setRoomData({
                    name: room.name,
                    description: room.description,
                    capacity: room.capacity,
                    price: room.price,
                    imageFile: null, // This is for the new image file
                });
            };
            fetchRoom();
        }
        fetchRooms();
    }, [id]);

    const handleChange = (e) => {
        setRoomData({ ...roomData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setRoomData({ ...roomData, imageFile: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateRoom(id, roomData);
        window.location.href = '/edit-room';
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Edit Room</h1>
            {!id && (
                <div>
                    <h2 className="mb-4">Select a Room to Edit</h2>
                    <div className="row">
                        {rooms.map(room => (
                            <div key={room.roomId} className="col-md-4 mb-4">
                                <div className="card h-100">
                                    <img src={`data:image/jpeg;base64,${room.image}`} alt={room.name} className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">{room.name}</h5>
                                        <p className="card-text">{room.description}</p>
                                        <p className="card-text"><strong>Capacity:</strong> {room.capacity} Guests</p>
                                        <p className="card-text"><strong>Price:</strong> ${room.price}</p>
                                        <Link to={`/edit-room/${room.roomId}`} className="btn btn-primary">Edit</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {id && (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" className="form-control" placeholder="Name" value={roomData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" name="description" className="form-control" placeholder="Description" value={roomData.description} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Capacity</label>
                        <input type="number" name="capacity" className="form-control" placeholder="Capacity" value={roomData.capacity} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input type="number" name="price" className="form-control" placeholder="Price" value={roomData.price} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <input type="file" name="imageFile" className="form-control" onChange={handleFileChange} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Update Room</button>
                </form>
            )}
        </div>
    );
};

export default EditRoom;

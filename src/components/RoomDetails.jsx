import React, { useEffect, useState } from 'react';
import { getRoomById, deleteRoom } from '../api/roomService.js';
import { useParams, Link } from 'react-router-dom';

const RoomDetail = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const fetchRoom = async () => {
            const room = await getRoomById(id);
            setRoom(room);
        };

        fetchRoom();
    }, [id]);

    const handleDelete = async () => {
        await deleteRoom(id);
        history.push('/');
    };

    if (!room) return <div>Loading...</div>;

    return (
        <div>
            <h1>{room.name}</h1>
            <p>{room.description}</p>
            <p>Capacity: {room.capacity}</p>
            <p>Price: {room.price}</p>
            {room.image && <img src={`data:image/jpeg;base64,${room.image}`} alt={room.name} />}
            <Link to={`/edit/${room.roomId}`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default RoomDetail;

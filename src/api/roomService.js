import axios from 'axios';

export const getAllRooms = async () => {
    const response = await axios.get('https://localhost:7136/api/room');
    return response.data;
};

export const getRoomById = async (id) => {
    const response = await axios.get(`https://localhost:7136/api/room/${id}`);
    return response.data;
};

export const updateRoom = async (id, roomData) => {
    const formData = new FormData();
    formData.append('name', roomData.name);
    formData.append('description', roomData.description);
    formData.append('capacity', roomData.capacity);
    formData.append('price', roomData.price);
    if (roomData.imageFile) {
        formData.append('imageFile', roomData.imageFile);
    }

    await axios.put(`https://localhost:7136/api/room/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

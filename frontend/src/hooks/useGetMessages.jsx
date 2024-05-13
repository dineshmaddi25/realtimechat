import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // Ensure that credentials are sent with the request
                axios.defaults.withCredentials = true;
                // Use backticks for string interpolation
                const res = await axios.get(`http://localhost:8081/api/v1/message/${selectedUser?._id}`);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }

        fetchMessages(); // Call fetchMessages here, not inside itself
    }, [selectedUser]); // Add selectedUser as a dependency to useEffect
}

export default useGetMessages;

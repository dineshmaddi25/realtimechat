import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const SendInput = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `http://localhost:8081/api/v1/message/send/${selectedUser?._id}`,
                { message }, // Send message as the request body
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        alert(message);
    }

    return (
        <form onSubmit={onSubmitHandler} className='px-4 my-3'>
            <div className='w-full relative'>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type='text'
                    placeholder='Send a message...'
                    className='border text-sm rounded-lg p-3 border-zinc-500 block w-full bg-gray-600 text-white'
                />
                <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-4'>
                    <IoSend />
                </button>
            </div>
        </form>
    );
};

export default SendInput;

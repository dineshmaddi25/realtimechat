import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
    const scrollRef = useRef();
    const { authUser } = useSelector(store => store.user);

    useEffect(() => {
        // Scroll to the latest message when component mounts or message updates
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    const isAuthUserMessage = authUser?._id === message?.senderId;

    return (
        <div ref={scrollRef} className={`chat ${isAuthUserMessage ? 'chat-end' : 'chat-start'}`}>
            <div className='chat-footer'>
                <time className="text-xs opacity-50 text-white">12:45</time>
            </div>
            <div className="chat-bubble chat-bubble-error">{message?.message}</div>
        </div>
    );
};

export default Message;

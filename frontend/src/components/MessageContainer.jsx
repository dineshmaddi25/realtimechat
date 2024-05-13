import React from "react";
import Sendinput from "./Sendinput";
import Messages from "./Messages";
import { useSelector } from "react-redux";
const MessageContainer = () => {
    const {selectedUser} = useSelector(store => store.user)
    return (
        <div className="md:min-w-[750px] flex flex-col">

            <div className="flex gap-2 items-center bg-zinc-900 text-white px-4 py-2 mb-2">
                <div className="avatar online">
                    <div className="w-10 rounded-full">
                        <img src={selectedUser?.profilePhoto}alt="User-profile" />
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <div className="flex justify-between  gap-2">
                        <p className="text-white">{selectedUser?.fullName}</p>
                    </div>

                </div>
            </div>
            <Messages/>
           <Sendinput/>

        </div>
    )
}
export default MessageContainer
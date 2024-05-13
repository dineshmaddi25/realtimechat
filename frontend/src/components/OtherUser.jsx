import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);

    // Function to handle user selection
    const selectedUserHandler = (user) => {
        console.log(user);
        dispatch(setSelectedUser(user));
    }

    return (
        <>
            {/* Apply background color if the user is selected */}
            <div
                onClick={() => selectedUserHandler(user)}
                className={`flex gap-2 items-center text-white hover:text-zinc-700 hover:bg-zinc-200 rounded-sm p-2 cursor-pointer ${
                    // Check if selectedUser is not null and its _id matches the _id of the current user
                    selectedUser && selectedUser._id === user._id ? 'bg-zinc-200' : ''
                }`}
            >
                <div className="avatar online">
                    <div className="w-10 rounded-full">
                        <img src={user?.profilePhoto} alt="User-profile" />
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <div className="flex justify-between  gap-2">
                        <p className="text-black">{user?.fullName}</p>
                    </div>
                </div>
            </div>
            <div className="divider my-0 py-0 h-1"></div>
        </>
    );
}

export default OtherUser;

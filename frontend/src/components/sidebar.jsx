import React from "react";
import { TbLockSearch } from "react-icons/tb";
import OtherUsers from "./OtherUsers";
import toast from "react-hot-toast";
import axios from "axios"
import { useNavigate } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
const Sidebar = () => {
    const navigate = useNavigate();
   

    const logoutHandler = async () => {
        try {
            const res = await axios.get("http://localhost:8081/api/v1/user/logout");
            navigate("/login");
            toast.success(res.data.message);
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Logout failed. Please try again later.");
        }
    };
    
    
    return (
        <div className="border-r border-blue-950 p-4 flex flex-col">
            <form action="" className="flex">
                <div className="join">
                    <div>
                        <div>
                            <input className="join-item input-info w-full input input-bordered max-w-xs" placeholder="Search" />
                        </div>
                    </div>
                    <div className="indicator">
                        <button type='submit' className="btn join-item input-info w-full input input-bordered max-w-xs text-white"><TbLockSearch size="24px" className="text-cyan-300 w-6 h-6" /></button>
                    </div>
                </div>
            </form>
            <div className="divider px-3"></div> 
            <OtherUsers />
            <div className="mt-2">
            <button onClick={logoutHandler} className="btn glass  btn-info btn-sm input-bordered btn-sm text-center text-xl border text-black border-slate-500">Logout</button>
            </div>
            
        </div>
    );
};

export default Sidebar;

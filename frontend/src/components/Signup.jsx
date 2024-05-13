import React, { useState  } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
    const [user, setUser] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    })
    const navigate = useNavigate();
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
         
            const res = await axios.post('http://localhost:8081/api/v1/user/register',user, {
                headers :{
                    "Content-Type":'application/json'
                },
                withCredentials:true
            })
            if(res.data.success){
                navigate("/login");
                toast.success(res.data.message);

            }
            console.log(res);
        } catch (error) {
            console.log(error)
        }
        setUser({
            fullName: "",
            username: "",
            password: "",
            confirmPassword: "",
            gender: "",
        })
    }
    return (
        <div className="text-white min-w-96 mx-auto">
            <div className="w-full p-6 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border">
                <h1 className='text-3xl font-bold text-center text-gray-600'>Signup</h1>
                <form onSubmit={onSubmitHandler} action="" className="mx-auto">
                    <div>
                        <label className="label p-3">
                            <span className="text-base label-text text-justify text-gray-700">
                                Full Name
                            </span>
                        </label>
                        <input onChange={(e) => setUser({ ...user, fullName: e.target.value })} value={user.fullName} className='input-info w-full input input-bordered h-10 max-w-xs'
                            type="text" placeholder="Full Name" />
                    </div>
                    <div>
                        <label className="label p-3">
                            <span className="text-base label-text text-justify text-gray-700">
                                Username
                            </span>
                        </label>
                        <input onChange={(e) => setUser({ ...user, username: e.target.value })} value={user.username} className='input-info w-full input input-bordered h-10 max-w-xs'
                            type="text" placeholder="Username" />
                    </div>
                    <div>
                        <label className="label p-3">
                            <span className="text-base label-text text-justify text-gray-700">
                                Password
                            </span>
                        </label>
                        <input onChange={(e) => setUser({ ...user, password: e.target.value })} value={user.password} className='input-info w-full input input-bordered h-10 max-w-xs'
                            type="password" placeholder="Password" />
                    </div>
                    <div>
                        <label className="label p-3">
                            <span className="text-base label-text text-justify text-gray-700">
                                Confirm Password
                            </span>
                        </label>
                        <input onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} value={user.confirmPassword} className='input-info w-full input input-bordered h-10 max-w-xs'
                            type="password" placeholder="Confirm Password" />
                    </div>
                    <div>
                        <label className="label p-3">
                            <span className="text-base label-text text-justify text-gray-700">
                                Select Gender
                            </span>
                        </label>
                        <select onChange={(e) => setUser({ ...user, gender: e.target.value })} value={user.gender} className="select select-info w-full input input-bordered max-w-xs">
                            <option default selected>Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div className="w-full mx-auto flex items-center text-center mb-4">
                        <p className="mx-auto flex items-center text-center">
                            Already have an account?<Link className="mx-auto flex items-center text-center text-black" to="/login">Login</Link>
                        </p>
                    </div>
                    <div className="">
                        <button type="submit" className="btn glass btn-info w-full input-bordered h-10 max-w-xs text-center text-xl border border-slate-500">Signup</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;

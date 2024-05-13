import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post('http://localhost:8081/api/v1/user/login', user, {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: true
            })

            navigate("/");
            console.log(res.data);
            dispatch(setAuthUser(res.data));
            toast.success(res.data.message);

            console.log(res);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error)
        }
        console.log(user);
        setUser({
            username: "",
            password: "",
        })
    }
    return (
        <div className="text-white min-w-96 mx-auto">
            <div className="w-full p-6 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border">
                <h1 className='text-3xl font-bold text-center text-gray-600'>Login</h1>
                <form onSubmit={onSubmitHandler} action="" className="mx-auto">
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

                    <div className="w-full mx-auto flex items-center text-center mb-4">
                        <p className="mx-auto flex items-center text-center my-2">
                            Don't have an account?<Link className="mx-auto flex items-center text-center text-black" to="/register">Signup</Link>
                        </p>
                    </div>
                    <div className="">
                        <button type="submit" className="btn glass btn-info w-full input-bordered h-10 max-w-xs text-center text-xl border text-black border-slate-500">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;

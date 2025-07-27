import React from 'react';
import AuthContext from '../../Context/AuthContext';
import Loading from '../../Shared/Loading';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hook/useAuth';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signInWithEmailAndPass, googleSignIn } = useAuth()

    const navigate = useNavigate()
    const { state } = useLocation()


    const onSubmit = (data) => {

        signInWithEmailAndPass(data.email, data.password)
            .then(res => {
                console.log(res)
                toast.success("Login Successful")
                navigate(state ? state : '/dashboard')
            })
            .catch(err => {
                if (err.code === "auth/invalid-credential") {
                    toast.error("Invalid Email or password")
                }
            })

    }



    const handleGoogleLogin = () => {
        googleSignIn()
            .then(res => {
                const user = res.user
                // console.log(user)

                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    role: 'worker',
                    coin: 10,
                    imageUrl: user.photoURL,
                }

                axios.post('http://localhost:3000/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                    })
                toast.success("Registration Successful")
                navigate(state ? state : '/dashboard')
            })
            .catch(err => console.log(err))
    }



    return (
        <div className='min-h-[90vh] flex items-center justify-center p-6  '>
            <div className='w-5xl mx-auto backdrop-blur-3xl border border-primary shadow-2xl rounded-2xl px-10 py-20 flex gap-6 
            '>
                <div className='flex-1 hidden md:block'>
                    <img src="" alt="" />

                </div>
                <div className="divider lg:divider-horizontal"></div>
                <div className='flex-1 space-y-6 '>

                    <h1 className='text-4xl text-center py-6 font-bold'>Login Now</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2' >

                        <input {...register("email", { required: "Email Field Required" })} type="text" placeholder='name@example.com' className='w-full p-3 rounded-lg border border-primary  ' />
                        {errors.email?.type === 'required' && <p className='text-sm text-error pl-2' >{errors.email.message}</p>}

                        <input {...register("password", { required: "Password Field Required." })} name='password' type="password" placeholder='**********  ' className='w-full p-3 rounded-lg border border-primary' />
                        {errors.password?.type === 'required' && <p className='text-sm text-error pl-2' >{errors.password.message}</p>}


                        <button className='w-full p-3 bg-primary text-primary-content font-bold rounded-lg'>Login</button>
                    </form>
                    <div className='divider'>OR</div>
                    <button onClick={handleGoogleLogin} className='w-full p-3 bg-secondary text-secondary-content font-bold rounded-lg'>Login with Google</button>
                    <p className='text-lg text-center font-semibold'> Don't Have Account. <span className='font-bold'><Link to="/register">Register</Link></span> </p>


                </div>
            </div>
        </div>
    );
};

export default Login;
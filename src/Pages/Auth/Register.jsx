import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import useAuth from '../../Hook/useAuth';
import axios from 'axios';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';
import Swal from 'sweetalert2';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const { registerWithEmailPass } = useAuth()


    const onsubmit = async (data) => {
        const imgData = data.image[0]
        const imageFormData = new FormData();
        imageFormData.append('image', imgData);
        console.log(import.meta.env.VITE_imgBBApi);
        const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBBApi}`, imageFormData
        );
        const imageUrl = response?.data?.data?.display_url;



        registerWithEmailPass(data.email, data.password)
            .then((res) => {
                console.log(res)
                updateProfile(auth, { displayName: data.name, photoURL: imageUrl })

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Registration Successful",
                    showConfirmButton: false,
                    timer: 1500
                });

            })
            .catch((err) => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Something Went Wrong ! ",
                    showConfirmButton: false,
                    timer: 1500
                });
            })



    }



    return (
        <div className='min-h-[90vh] flex items-center justify-center '>
            <div className='w-5xl mx-auto backdrop-blur-3xl border border-primary shadow-2xl rounded-2xl px-10 py-20 flex gap-6 
            '>
                <div className='flex-1'>
                    <img src="" alt="" />

                </div>
                <div className="divider lg:divider-horizontal"></div>
                <div className='flex-1 space-y-6 '>

                    <h1 className='text-4xl text-center py-6 font-bold'>Register Now</h1>

                    <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col gap-2' >
                        <input
                            {...register("name", { required: "Name Field required" })}
                            type="text"
                            placeholder='Sazid Ahamed Sifat '
                            className='w-full p-3 rounded-lg border border-primary ' />
                        {errors.name?.type === 'required' && <p className='text-sm text-error pl-2'>{errors.name.message}</p>}


                        <input
                            {...register("email", { required: "Email Field required" })}
                            type="text"
                            placeholder='name@example.com'
                            className='w-full p-3 rounded-lg border border-primary  ' />
                        {errors.email?.type === 'required' && <p className='text-sm text-error pl-2'>{errors.email.message}</p>}



                        <input {...register("password", { required: "Password Field required" })}
                            type="password"
                            placeholder='**********  '
                            className='w-full p-3 rounded-lg border border-primary' />
                        {errors.password?.type === 'required' && <p className='text-sm text-error pl-2' >{errors.password.message}</p>}


                        <input accept='image/*' {...register("image", { required: "Upload a Image" })}
                            type="file"
                            className='w-full p-3 rounded-lg border border-primary' />
                        {errors.image?.type === 'required' && <p className='text-sm text-error pl-2' >{errors.image.message}</p>}



                        <select {...register("role", { required: "Select a Role" })}
                            className='w-full p-3 rounded-lg border border-primary' >
                            <option className='' value="worker">Worker</option>
                            <option className='' value="buyer">Buyer</option>
                        </select>
                        {errors.role?.type === 'required' && <p className='text-sm text-error pl-2' >{errors.role.message}</p>}


                        <button className='w-full p-3 bg-primary text-primary-content font-bold rounded-lg'>Register</button>
                    </form>
                    {/* <div className='divider'>OR</div>
                    <button className='w-full p-3 bg-secondary cursor-pointer text-secondary-content font-bold rounded-lg'>Login with Google</button> */}

                    <p className='text-lg text-center font-semibold'> Already Have Account. <span className='font-bold'><Link to="/login">Login</Link></span> </p>


                </div>
            </div>
        </div>
    );
};

export default Register;
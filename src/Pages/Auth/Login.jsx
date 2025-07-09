import React from 'react';
import AuthContext from '../../Context/AuthContext';
import Loading from '../../Shared/Loading';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hook/useAuth';

const Login = () => {

    const { register, handleSubmit,formState:{errors} } = useForm()
    const { signInWithEmailAndPass } = useAuth()


    const onSubmit = (data) => {

        signInWithEmailAndPass(data.email, data.password)

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

                    <h1 className='text-4xl text-center py-6 font-bold'>Login Now</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2' >

                        <input {...register("email",{required:"Email Field Required"})} type="text" placeholder='name@example.com' className='w-full p-3 rounded-lg border border-primary  ' />
                        {errors.email?.type === 'required' && <p className='text-sm text-error pl-2' >{errors.email.message}</p>}

                        <input {...register("password",{required:"Password Field Required."})} name='password' type="" placeholder='**********  ' className='w-full p-3 rounded-lg border border-primary' />
                        {errors.password?.type === 'required' && <p className='text-sm text-error pl-2' >{errors.password.message}</p>}


                        <button className='w-full p-3 bg-primary text-primary-content font-bold rounded-lg'>Login</button>
                    </form>
                    <div className='divider'>OR</div>
                    <button className='w-full p-3 bg-secondary text-secondary-content font-bold rounded-lg'>Login with Google</button>


                </div>
            </div>
        </div>
    );
};

export default Login;
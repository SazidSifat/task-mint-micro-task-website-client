import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hook/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../../Shared/Loading';

const AddTask = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user, loading, setLoading } = useAuth()
    const [userDetails, setUserDetails] = useState({})
    const buyerEmail = user?.email
    const buyerName = user?.displayName

    useEffect(() => {
        if (buyerEmail) {
            axios
                .get(`https://microtaskserver.vercel.app/users/${encodeURIComponent(buyerEmail)}`, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`
                    }
                })
                .then(res => setUserDetails(res.data))
                .catch(err => console.error(err));
        }
    }, [buyerEmail, user?.accessToken]);


    const onSubmit = async (data) => {
        const totalPayable = parseInt(data.required_workers) * parseInt(data.payable_amount)
        const task_image = data.task_image[0]
        setLoading(true)


        const imageFormData = new FormData();
        imageFormData.append('image', task_image);
        const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBBApi}`, imageFormData
        );
        const imageUrl = response?.data?.data?.display_url;
        const taskDetails = { ...data, task_image: imageUrl, totalPayable, buyerEmail: buyerEmail, buyerName: buyerName }

        if (taskDetails && buyerEmail) {
            if (userDetails.coin < totalPayable) {
                alert("Insufficient amount ,Please buy coin")

            } else {
                axios.post("https://microtaskserver.vercel.app/add-task", { task: taskDetails }, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`
                    }
                })
                    .then(res => {
                        if (res.data.insertedId) {
                            setLoading(false)
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Your Task has been added Successfully",
                                showConfirmButton: false,
                                timer: 1500
                            }
                            )
                        }
                    })
                    .catch(() => {
                        setLoading(false)
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Task adding Failed",
                            showConfirmButton: false,
                            timer: 1500
                        }
                        )
                    })
            }
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Missing Buyer email",
                showConfirmButton: false,
                timer: 1500
            }
            )
        }
    }

    return (
        <div className="px-10 mx-auto mt-6  rounded-lg ">
            <h2 className="text-2xl font-bold text-primary mb-6">Add New Task</h2>
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block mb-1 font-medium text-base-content">Task Title</label>
                    <input
                        {...register("task_title", { required: "Task title is required" })}
                        type="text"
                        className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary  w-full"
                        placeholder="e.g., Watch my YouTube video and comment"
                    />
                    {errors.task_title && <p className="text-error mt-1">{errors.task_title.message}</p>}
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block mb-1 font-medium text-base-content">Required Workers</label>
                        <input
                            {...register("required_workers", {
                                required: "Required Workers is required",
                                min: { value: 1, message: "Must be at least 1" },
                            })}
                            type="number"
                            className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary  w-full"
                            placeholder="e.g., 100"
                        />
                        {errors.required_workers && (
                            <p className="text-error mt-1">{errors.required_workers.message}</p>
                        )}
                    </div>

                    <div className="flex-1">
                        <label className="block mb-1 font-medium text-base-content">Payable Amount</label>
                        <input
                            {...register("payable_amount", {
                                required: "Payable amount is required",
                                min: { value: 1, message: "Must be at least 1" },
                            })}
                            type="number"
                            className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary  w-full"
                            placeholder="e.g., 10"
                        />
                        {errors.payable_amount && (
                            <p className="text-error mt-1">{errors.payable_amount.message}</p>
                        )}
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block mb-1 font-medium text-base-content">Completion Date</label>
                        <input
                            {...register("completion_date", { required: "Completion date is required" })}
                            type="date"
                            className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary  w-full"
                        />
                        {errors.completion_date && (
                            <p className="text-error mt-1">{errors.completion_date.message}</p>
                        )}
                    </div>

                    <div className="flex-1">
                        <label className="block mb-1 font-medium text-base-content">Submission Info</label>
                        <input
                            {...register("submission_info", { required: "Submission info is required" })}
                            type="text"
                            className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary  w-full"
                            placeholder="e.g., Screenshot / Proof link"
                        />
                        {errors.submission_info && (
                            <p className="text-error mt-1">{errors.submission_info.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block mb-1 font-medium text-base-content">Task Image</label>
                    <input
                        {...register("task_image")}
                        type="file"
                        className=" py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary  w-full"
                    />
                    {/* optional so no error shown */}
                </div>

                <div>
                    <label className="block mb-1 font-medium text-base-content">Task Detail</label>
                    <textarea
                        {...register("task_detail", { required: "Task detail is required" })}
                        rows="4"
                        className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary  w-full resize-none"
                        placeholder="Detailed description of the task"
                    ></textarea>
                    {errors.task_detail && (
                        <p className="text-error mt-1">{errors.task_detail.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="py-3 border-2 bg-primary px-3 rounded-xl w-full text-primary-content font-medium"
                >
                    {loading ? <span className="loading loading-bars loading-xs"></span> : "Add Task"}
                </button>
            </form>
        </div>
    );
};

export default AddTask;
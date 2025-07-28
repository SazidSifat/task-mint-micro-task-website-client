import React, { useEffect, useState } from 'react';
import useAuth from '../../Hook/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Zoom } from 'react-awesome-reveal';

const MyTask = () => {
    const { user } = useAuth()
    const email = user?.email
    const [myTasks, setMyTasks] = useState([]);
    const [openModal, setOpenModal] = useState(null)


    // 
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [info, setInfo] = useState('')


    useEffect(() => {
        if (email) {
            axios
                .get(`http://localhost:3000/my-tasks/${encodeURIComponent(email)}`, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`
                    }
                })
                .then(res => setMyTasks(res.data))
                .catch(err => console.error(err));
        }
    }, [email,user?.accessToken]);


    const handleDeleteTask = (id) => {



        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/my-tasks/${id}`, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`
                    }
                })
                    .then(res => {
                        if (res.data.deletedCount) {
                            setMyTasks(prev => prev.filter(task => task._id !== id))
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }

                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Failed to delete",
                            icon: "error",
                            showConfirmButton: false,
                            timer: 1500
                        });

                    })

            }
        });


    }

    const updateMyTask = (id) => {

        const updatedData = {
            task_title: title,
            task_detail: desc,
            submission_info: info
        }

        axios.put(`http://localhost:3000/update-my-task/${id}`, updatedData, {
            headers: {
                authorization: `Bearer ${user?.accessToken}`
            }
        })
            .then(({ data }) => {
                if (data.modifiedCount === 1) {
                    Swal.fire({
                        position: "center",
                        timer: 1500,
                        title: "Updated Successfully",
                        showCancelButton: false,
                        icon: "success",
                        showConfirmButton: false
                    })

                }
            })
    }


    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold text-primary mb-6">My Posted Tasks</h2>

            <div className="overflow-x-auto rounded-xl shadow-lg border border-base-300">
                <table className="table table-zebra w-full">
                    <thead className="bg-primary text-center text-primary-content">
                        <tr>
                            <th className="">Title</th>
                            <th>Workers Needed</th>
                            <th>Payment per Worker</th>
                            <th>Deadline</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {myTasks.map((task) => (
                            <tr key={task._id}>
                                <td>{task.task_title}</td>
                                <td>{task.required_workers}</td>
                                <td>{task.payable_amount}</td>
                                <td>{task.completion_date}</td>
                                <td className="flex gap-2 justify-center">
                                    <button onClick={() => setOpenModal(task)}
                                        className=" px-4   font-semibold rounded-lg bg-secondary   text-secondary-content btn-sm">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteTask(task._id)}
                                        className="px-4 py-1.5  font-semibold rounded-lg bg-error text-white btn-sm">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {
                openModal && <div className="fixed inset-0 bg-black/30  flex items-center justify-center z-50">
                    <Zoom>
                        <div className="bg-base-100 p-6 rounded-xl shadow-xl w-lg space-y-4 border border-base-300">
                            <h3 className="text-xl font-semibold text-primary">Edit Task</h3>

                            <input
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                defaultValue={openModal.task_title}
                                placeholder="Task Title"
                                className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary w-full"
                            />
                            <input
                                type="text"
                                onChange={(e) => setInfo(e.target.value)}
                                defaultValue={openModal.submission_info}
                                placeholder="Submission Info"
                                className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary w-full"
                            />
                            <textarea
                                onChange={(e) => setDesc(e.target.value)}
                                defaultValue={openModal.task_detail}
                                placeholder="Task Details"
                                className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary w-full"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    className="px-4 py-2  font-semibold rounded-lg border border-secondary text-secondary hover:text-secondary-content hover:bg-secondary"
                                    onClick={() => {
                                        setOpenModal(false)
                                        setTitle('')
                                        setInfo('')
                                        setDesc('')
                                    }}
                                >
                                    Cancel
                                </button>
                                <button onClick={() => updateMyTask(openModal._id)} className="px-4 py-2  font-semibold rounded-lg bg-primary text-primary-content hover:bg-primary/80 hover:text-primary-content">
                                    Save
                                </button>
                            </div>

                        </div>
                    </Zoom>
                </div>
            }
        </div>
    );
};

export default MyTask;
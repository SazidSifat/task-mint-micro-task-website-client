import React, { useEffect, useState } from 'react';
import useAuth from '../../Hook/useAuth';
import axios from 'axios';

const MyTask = () => {
    const { user } = useAuth()
    const email = user?.email
    const [myTasks, setMyTasks] = useState([]);
    const [openModal, setOpenModal] = useState(false)



    useEffect(() => {
        if (email) {
            axios
                .get(`http://localhost:3000/my-tasks/${encodeURIComponent(email)}`)
                .then(res => setMyTasks(res.data))
                .catch(err => console.error(err));
        }
    }, [email]);

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold text-primary mb-6">My Posted Tasks</h2>

            <div className="overflow-x-auto rounded-xl shadow-lg border border-base-300">
                <table className="table table-zebra w-full">
                    <thead className="bg-primary text-primary-content">
                        <tr>
                            <th className="text-left">Title</th>
                            <th>Workers Needed</th>
                            <th>Pay/Worker</th>
                            <th>Deadline</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myTasks.map((task) => (
                            <tr key={task._id}>
                                <td>{task.task_title}</td>
                                <td>{task.required_workers}</td>
                                <td>{task.payable_amount}</td>
                                <td>{task.completion_date}</td>
                                <td className="flex gap-2 justify-center">
                                    <button
                                        onClick={() => setOpenModal(true)}
                                        className="btn btn-secondary text-secondary-content btn-sm"
                                    >
                                        Edit
                                    </button>
                                    <button

                                        className="btn btn-error btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {
                openModal && <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-base-100 p-6 rounded-xl shadow-xl w-96 space-y-4 border border-base-300">
                        <h3 className="text-lg font-semibold text-primary">Edit Task</h3>
                        <input
                            type="text"
                            placeholder="Task Title"

                            className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary w-full"
                        />
                        <input
                            type="text"
                            placeholder="Submission Info"
                            className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary w-full"
                        />
                        <textarea
                            placeholder="Task Details"


                            className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary w-full"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                className="btn btn-outline btn-secondary"
                                onClick={() => setOpenModal(false)}
                            >
                                Cancel
                            </button>
                            <button className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default MyTask;
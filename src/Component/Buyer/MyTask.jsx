import React, { useEffect, useState } from 'react';
import useAuth from '../../Hook/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Zoom } from 'react-awesome-reveal';
import { useNavigate } from 'react-router';

const MyTask = () => {
    const { user, logout } = useAuth();
    const email = user?.email;
    const navigate = useNavigate();

    const [myTasks, setMyTasks] = useState([]);
    const [openModal, setOpenModal] = useState(null);

    // Controlled form fields for editing
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [info, setInfo] = useState('');

    // Loading states
    const [loadingTasks, setLoadingTasks] = useState(false);
    const [updatingTaskId, setUpdatingTaskId] = useState(null);
    const [deletingTaskId, setDeletingTaskId] = useState(null);

    // Fetch tasks
    useEffect(() => {
            if (!user?.accessToken) return; 
        if (email) {
            setLoadingTasks(true);
            axios
                .get(`https://microtaskserver.vercel.app/my-tasks/${encodeURIComponent(email)}`, {
                    headers: { authorization: `Bearer ${user?.accessToken}` },
                })
                .then((res) => {
                    setMyTasks(res.data);
                    setLoadingTasks(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoadingTasks(false);
                });
        }
    }, [email, user?.accessToken]);

    // Delete task handler with loading indicator
    const handleDeleteTask = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                setDeletingTaskId(id);
                axios
                    .delete(`https://microtaskserver.vercel.app/my-tasks/${id}`, {
                        headers: { authorization: `Bearer ${user?.accessToken}` },
                    })
                    .then((res) => {
                        if (res.data.deletedCount) {
                            setMyTasks((prev) => prev.filter((task) => task._id !== id));
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        }
                        setDeletingTaskId(null);
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete",
                            icon: "error",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        setDeletingTaskId(null);


                        const status = error.response?.status;

                        if (status === 401 || status === 400) {
                            // No token or invalid token
                            logout();
                            navigate('/login');
                        } else if (status === 403) {
                            navigate('/forbidden');
                        } else {
                            console.error("Unexpected error", error);
                        }
                    });
            }
        });
    };

    const updateMyTask = (id) => {
        setUpdatingTaskId(id);

        const updatedData = {
            task_title: title || openModal.task_title,
            task_detail: desc || openModal.task_detail,
            submission_info: info || openModal.submission_info,
        };

        axios
            .put(`https://microtaskserver.vercel.app/update-my-task/${id}`, updatedData, {
                headers: { authorization: `Bearer ${user?.accessToken}` },
            })
            .then(({ data }) => {
                if (data.modifiedCount === 1) {
                    // Update the task in local state immediately
                    setMyTasks((prev) =>
                        prev.map((task) => (task._id === id ? { ...task, ...updatedData } : task))
                    );

                    Swal.fire({
                        position: "center",
                        timer: 1500,
                        title: "Updated Successfully",
                        icon: "success",
                        showConfirmButton: false,
                    });

                    // Reset modal state and fields
                    setOpenModal(null);
                    setTitle('');
                    setInfo('');
                    setDesc('');
                }
                setUpdatingTaskId(null);
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update task",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setUpdatingTaskId(null);
                const status = error.response?.status;

                if (status === 401 || status === 400) {
                    // No token or invalid token
                    logout();
                    navigate('/login');
                } else if (status === 403) {
                    navigate('/forbidden');
                } else {
                    console.error("Unexpected error", error);
                }
            });
    };

    // Initialize form fields when modal opens
    useEffect(() => {
        if (openModal) {
            setTitle(openModal.task_title);
            setDesc(openModal.task_detail);
            setInfo(openModal.submission_info);
        }
    }, [openModal]);

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold text-primary mb-6">My Posted Tasks</h2>

            <div className="overflow-x-auto rounded-xl shadow-lg border border-base-300">
                <table className="table table-zebra w-full">
                    <thead className="bg-primary text-center text-primary-content">
                        <tr>
                            <th>Title</th>
                            <th>Workers Needed</th>
                            <th>Payment per Worker</th>
                            <th>Deadline</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {loadingTasks ? (
                            <tr>
                                <td colSpan={5} className="p-6 text-center text-gray-500 font-medium">
                                    <span className="loading loading-bars loading-xs"></span>
                                </td>
                            </tr>
                        ) : myTasks.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-6 text-center text-gray-500 font-medium">
                                    No tasks available.
                                </td>
                            </tr>
                        ) : (
                            myTasks.map((task) => (
                                <tr key={task._id}>
                                    <td>{task.task_title}</td>
                                    <td>{task.required_workers}</td>
                                    <td>{task.payable_amount}</td>
                                    <td>{task.completion_date}</td>
                                    <td className="flex gap-2 justify-center">
                                        <button
                                            onClick={() => setOpenModal(task)}
                                            className="px-4 font-semibold rounded-lg bg-secondary text-secondary-content btn-sm"
                                            type="button"
                                            disabled={updatingTaskId === task._id || deletingTaskId === task._id}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTask(task._id)}
                                            className="px-4 py-1.5 font-semibold rounded-lg bg-error text-white btn-sm"
                                            type="button"
                                            disabled={updatingTaskId === task._id || deletingTaskId === task._id}
                                        >
                                            {deletingTaskId === task._id ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {openModal && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <Zoom>
                        <div className="bg-base-100 p-6 rounded-xl shadow-xl w-lg space-y-4 border border-base-300">
                            <h3 className="text-xl font-semibold text-primary">Edit Task</h3>

                            <input
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                value={title}
                                placeholder="Task Title"
                                className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary w-full"
                            />
                            <input
                                type="text"
                                onChange={(e) => setInfo(e.target.value)}
                                value={info}
                                placeholder="Submission Info"
                                className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary w-full"
                            />
                            <textarea
                                onChange={(e) => setDesc(e.target.value)}
                                value={desc}
                                placeholder="Task Details"
                                className="py-3 border-2 border-primary/50 px-3 rounded-xl focus:outline-secondary w-full"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    className="px-4 py-2 font-semibold rounded-lg border border-secondary text-secondary hover:text-secondary-content hover:bg-secondary"
                                    onClick={() => {
                                        setOpenModal(null);
                                        setTitle('');
                                        setInfo('');
                                        setDesc('');
                                    }}
                                    disabled={updatingTaskId !== null}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => updateMyTask(openModal._id)}
                                    className="px-4 py-2 font-semibold rounded-lg bg-primary text-primary-content hover:bg-primary/80 hover:text-primary-content"
                                    disabled={updatingTaskId !== null}
                                >
                                    {updatingTaskId === openModal._id ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </Zoom>
                </div>
            )}
        </div>
    );
};

export default MyTask;

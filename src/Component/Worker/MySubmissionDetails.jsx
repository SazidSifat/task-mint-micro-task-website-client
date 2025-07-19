import React, { useEffect, useState } from 'react';
import useAuth from '../../Hook/useAuth';
import axios from 'axios';

const MySubmissionDetails = () => {

    const [tasks, setTasks] = useState([])

    const { user } = useAuth()
    const email = user?.email

    useEffect(() => {


        if (email) {
            axios.get(`http://localhost:3000/my-submitted-task/${email}`)
                .then((res) => {
                    console.log(res.data)
                    setTasks(res.data)
                })
        }
    }, [email])

    return (
        <div className="overflow-x-auto rounded-xl shadow-lg border border-base-300">
            <table className="table table-zebra w-full">
                <thead className="bg-primary text-primary-content text-center">
                    <tr>
                        <th className="">Title</th>
                        <th>Workers Needed</th>
                        <th>Payment per Worker</th>
                        <th>Deadline</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {tasks.map((task) => (
                        <tr key={task._id}>
                            <td>{task.task_title}</td>
                            <td>{task.required_workers}</td>
                            <td>{task.payable_amount}</td>
                            <td>{task.completion_date}</td>
                            <td className="flex gap-2 justify-center">
                                <button
                                    className=" px-4   font-semibold rounded-lg bg-secondary   text-secondary-content btn-sm">
                                    Edit
                                </button>
                                <button
                                    className="px-4 py-1.5  font-semibold rounded-lg bg-error text-white btn-sm">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MySubmissionDetails;
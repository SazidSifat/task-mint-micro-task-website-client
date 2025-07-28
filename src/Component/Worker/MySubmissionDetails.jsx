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
                        <th>Buyer Name</th>
                        <th>Payable</th>
                        <th>Submitted Date</th>
                        <th>Status</th>

                    </tr>
                </thead>
                <tbody className='text-center'>
                    {tasks.map((task) => (
                        <tr key={task._id}>
                            <td className='font-bold'>{task.task_title}</td>
                            <td>{task.buyerName}</td>
                            <td>{task.payable_amount}</td>
                            <td className='text-base-content/70'>{new Date(task.current_Date).toLocaleString("en-US", {
                                timeZone: "Asia/Dhaka",
                            })}</td>
                            <td>
                                <p
                                    className={`font-bold capitalize ${task.status === "pending"
                                            ? "text-secondary"
                                            : task.status === "rejected"
                                                ? "text-error"
                                                : "text-primary"
                                        }`}
                                >
                                    {task.status}
                                </p>
                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default MySubmissionDetails;
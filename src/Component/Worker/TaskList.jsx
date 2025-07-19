import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const TaskList = () => {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/tasks")
            .then(res => setTasks(res.data))
    }, [])

    console.log(tasks)
    return (
        <div className=" mx-auto p-6 space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Available Tasks</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {tasks.map((task) => (
                    <div
                        key={task._id}
                        className="rounded-xl border border-primary/50 bg-white shadow hover:shadow-md transition p-5 flex flex-col justify-between gap-3"
                    >
                        <div>
                            <img src={task.task_image} alt="" className="rounded-lg h-48" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl  font-bold text-primary">{task.task_title}</h3>
                            <p className="text-sm  font-semibold">Buyer: <span className="font-medium">{task.buyerName}</span></p>
                            <p className="text-sm "><span className="font-semibold">Deadline:</span> {new Date(task.completion_date).toLocaleDateString()}</p>
                            <div className="divider"></div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm  font-semibold">Payment: {task.payable_amount} coins</p>
                                <p className="text-sm "><span className="font-semibold">Needed:</span> {task.required_workers}</p>
                            </div>
                        </div>

                        <Link to={`/dashboard/task-list/${task._id}`}
                            className="mt-4 px-4 py-3 text-center bg-primary text-primary-content rounded-lg text-sm font-medium transition"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;

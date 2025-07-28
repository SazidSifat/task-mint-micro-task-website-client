import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../Hook/useAuth";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


const BuyerHome = () => {
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [myTask, setMyTask] = useState([]);
    const [pendingTaskSubmitted, setPendingTaskSubmitted] = useState([]);
    const { user } = useAuth()
    const email = user?.email
    let totalPayment = 0
    let totalReqWorker = 0

    useEffect(() => {
        if (email) {
            axios.get(`http://localhost:3000/my-tasks/${encodeURIComponent(email)}`)
                .then(res => {
                    setMyTask(res.data)
                })
                .catch(err => console.error(err));
        }
    }, [email]);

    useEffect(() => {
        if (email) {
            axios.get(`http://localhost:3000/submitted-task?buyerEmail=${email}`)
                .then(res => {
                    const task = res.data.filter(t => t.status === "pending")
                    setPendingTaskSubmitted(task)
                })
                .catch(err => console.error(err));
        }
    }, [email]);


    myTask.forEach(t => {
        totalPayment += t.totalPayable
        totalReqWorker += parseInt(t.required_workers)

    });



    const updateTask = (id, newStatus) => {

        axios.patch(`http://localhost:3000/update-submitted-task/${id}`, { newStatus: newStatus })
            .then(() => {

                if (newStatus === "approved") {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Task Approved ",
                        showConfirmButton: false,
                        timer: 1500
                    }
                    )
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Task Rejected ",
                        showConfirmButton: false,
                        timer: 1500
                    }
                    )

                }
            })
            .catch(() => {
                toast.error("Task Fetching Failed")

            })


    }



    return (
        <div className="p-6  mx-auto space-y-10">

            <section>
                <h2 className="text-3xl font-bold text-primary mb-6">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="rounded-xl border border-primary bg-base-200 shadow-sm p-10 text-center">
                        <h3 className="text-gray-600 text-2xl font-bold">Total Tasks</h3>
                        <p className="text-5xl font-bold text-primary">{myTask.length}</p>
                    </div>
                    <div className="rounded-xl border border-primary bg-base-200 shadow-sm p-10 text-center">
                        <h3 className="text-gray-600 text-2xl font-bold">Pending Task</h3>
                        <p className="text-5xl font-bold text-secondary">{totalReqWorker}</p>
                        <small className="text-primary/50">(sum of all  required_workers count of added Tasks)</small>
                    </div>
                    <div className="rounded-xl border border-primary bg-base-200 shadow-sm p-10 text-center">
                        <h3 className="text-gray-600 text-2xl font-bold">Total Payments</h3>
                        <p className="text-5xl font-bold text-accent">${(totalPayment / 10).toFixed(2)}</p>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-semibold text-primary mb-4">Tasks to Review</h3>

                <div className="overflow-x-auto rounded-xl shadow-lg border border-base-300">
                    <table className="table table-zebra w-full">
                        <thead className="bg-primary text-center text-primary-content">
                            <tr>
                                <th className=" ">Worker Name</th>
                                <th>Task Title</th>
                                <th>Payable Amount</th>
                                <th>Submission Details</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {pendingTaskSubmitted.map((task) => (
                                <tr key={task._id}>
                                    <td className="font-bold">{task.worker_name}</td>
                                    <td className="font-bold">{task.task_title}</td>
                                    <td className="font-bold text-center">{task.payable_amount}</td>
                                    <td className="font-bold">
                                        <button onClick={() => setSelectedSubmission(task)} className=" px-4 py-1.5   font-semibold rounded-lg bg-primary   text-primary-content btn-sm">
                                            View Submission
                                        </button>
                                    </td>
                                    <td className="flex gap-2 justify-center">
                                        <button onClick={() => updateTask(task._id, "approved")} className=" px-4 py-1.5   font-semibold rounded-lg bg-secondary   text-secondary-content btn-sm">
                                            Accept
                                        </button>
                                        <button onClick={() => updateTask(task._id, "rejected")} className="px-4 py-1.5  font-semibold rounded-lg bg-error text-white btn-sm" >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>


            {selectedSubmission && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md rounded-lg p-8 shadow-lg space-y-4 relative">
                        <button
                            onClick={() => setSelectedSubmission(null)}
                            className="absolute top-6 right-6 text-gray-500 hover:text-red-500 text-xl font-bold"
                        >
                            <RxCross2 size={25} />
                        </button>
                        <h3 className="text-xl font-semibold text-primary">Submission Details</h3>
                        <div className="space-y-2">
                            <p>
                                <span className="font-medium text-gray-700">Task:</span>{" "}
                                {selectedSubmission.task_title}
                            </p>
                            <p>
                                <span className="font-medium text-gray-700">Worker:</span>{" "}
                                {selectedSubmission.worker_name}
                            </p>
                        </div>
                        <div className="divider"></div>
                        <div className="space-y-2">
                            <h4 className="font-medium">Submission Details:</h4>
                            <div className=" text-gray-600 text-sm">
                                {selectedSubmission.submissionDetails}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyerHome;

import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../Hook/useAuth";

const dummySubmissions = [
    {
        _id: "sub1",
        worker_name: "John Doe",
        task_title: "Watch YouTube & Comment",
        payable_amount: 10,
        current_date: new Date(),
        submission_details: "Submitted link: https://imgbb.com/proof",
    },
    {
        _id: "sub2",
        worker_name: "Jane Smith",
        task_title: "Install & Test My App",
        payable_amount: 20,
        current_date: new Date(),
        submission_details: "Uploaded a screenshot and review",
    },
];

const BuyerHome = () => {
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [totalTask, setTotalTask] = useState(0);
    const {user} = useAuth()
    const email = user?.email



    useEffect(() => {
        if (email) {
            axios
                .get(`http://localhost:3000/my-tasks/${encodeURIComponent(email)}`)
                .then(res => setTotalTask(res.data.length))
                .catch(err => console.error(err));
        }
    }, [email]);

    return (
        <div className="p-6  mx-auto space-y-10">
            {/* Stats */}
            <section>
                <h2 className="text-3xl font-bold text-primary mb-6">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card */}
                    <div className="rounded-xl border border-primary bg-base-200 shadow-sm p-10 text-center">
                        <h3 className="text-gray-600 text-2xl font-bold">Total Tasks</h3>
                        <p className="text-5xl font-bold text-primary">{totalTask}</p>
                    </div>
                    <div className="rounded-xl border border-primary bg-base-200 shadow-sm p-10 text-center">
                        <h3 className="text-gray-600 text-2xl font-bold">Pending Workers</h3>
                        <p className="text-5xl font-bold text-secondary">120</p>
                    </div>
                    <div className="rounded-xl border border-primary bg-base-200 shadow-sm p-10 text-center">
                        <h3 className="text-gray-600 text-2xl font-bold">Total Payments</h3>
                        <p className="text-5xl font-bold text-accent">25</p>
                    </div>
                </div>
            </section>

            {/* Submissions */}
            <section>
                <h3 className="text-2xl font-semibold text-primary mb-4">Tasks to Review</h3>

                <div className="overflow-x-auto rounded-xl shadow-lg border border-base-300">
                    <table className="table table-zebra w-full">
                        <thead className="bg-primary text-primary-content">
                            <tr>
                                <th className="text-left ">Title</th>
                                <th>Pay/Worker</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummySubmissions.map((task) => (
                                <tr key={task._id}>
                                    <td className="font-bold">{task.task_title}</td>
                                    <td className="font-bold">{task.payable_amount}</td>

                                    <td className="flex gap-2 justify-center">
                                        <button
                                            onClick={() => setSelectedSubmission(true)}
                                            className=" px-4   font-semibold rounded-lg bg-secondary   text-secondary-content btn-sm"
                                        >
                                            Edit
                                        </button>
                                        <button

                                            className="px-4 py-1.5  font-semibold rounded-lg bg-error text-white btn-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Modal */}
            {selectedSubmission && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg space-y-4 relative">
                        <button
                            onClick={() => setSelectedSubmission(null)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
                        >
                            &times;
                        </button>
                        <h3 className="text-xl font-semibold text-[#5a716b]">📄 Submission Details</h3>
                        <p>
                            <span className="font-medium text-gray-700">Task:</span>{" "}
                            {selectedSubmission.task_title}
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">Worker:</span>{" "}
                            {selectedSubmission.worker_name}
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">Submitted on:</span>{" "}
                            {new Date(selectedSubmission.current_date).toLocaleString()}
                        </p>
                        <div className="border-t pt-3 text-gray-600 text-sm">
                            {selectedSubmission.submission_details}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyerHome;

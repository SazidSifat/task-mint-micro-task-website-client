import React, { useEffect, useState } from "react";
import useAuth from "../../Hook/useAuth";
import axios from "axios";

const WorkerHome = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const email = user?.email;
    let totalEarning = 0;

    useEffect(() => {
        if (email) {
            setLoading(true);
            axios.get(`https://microtaskserver.vercel.app/my-submitted-task/${email}`, {
                headers: {
                    authorization: `Bearer ${user?.accessToken}`
                }
            })
                .then(res => {
                    setSubmissions(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [email, user?.accessToken]);

    const totalSubmission = submissions.length;
    const pendingSubmission = submissions.filter(s => s.status === "pending");
    const approvedSubmissions = submissions.filter(s => s.status === "approved");

    approvedSubmissions.forEach(s => {
        totalEarning += parseInt(s.payable_amount);
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="mx-auto p-6 space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white py-10 rounded-xl border border-primary/50 shadow text-center">
                    <h3 className="text-lg font-medium text-gray-600">Total Submissions</h3>
                    <p className="text-3xl text-[#5a716b] font-bold mt-2">{totalSubmission}</p>
                </div>

                <div className="bg-white py-10 rounded-xl border border-primary/50 shadow text-center">
                    <h3 className="text-lg font-medium text-gray-600">Pending Submissions</h3>
                    <p className="text-3xl text-yellow-500 font-bold mt-2">{pendingSubmission.length}</p>
                </div>

                <div className="bg-white py-10 rounded-xl border border-primary/50 shadow text-center">
                    <h3 className="text-lg font-medium text-gray-600">Total Earnings ($)</h3>
                    <p className="text-3xl text-green-600 font-bold mt-2">${(totalEarning / 20).toFixed(2)}</p>
                </div>
            </div>

            <div className="bg-white shadow border border-primary/50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-primary mb-4">Approved Submissions</h3>

                {approvedSubmissions.length > 0 ? (
                    <div className="overflow-x-auto rounded-xl">
                        <table className="min-w-full table-zebra text-left text-sm">
                            <thead>
                                <tr className="bg-primary text-white">
                                    <th className="py-3 px-4">Task Title</th>
                                    <th className="py-3 px-4">Payable Amount</th>
                                    <th className="py-3 px-4">Buyer</th>
                                    <th className="py-3 px-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {approvedSubmissions.map((sub) => (
                                    <tr key={sub._id} className="hover:bg-gray-50">
                                        <td className="py-2 px-4">{sub.task_title}</td>
                                        <td className="py-2 px-4">${sub.payable_amount}</td>
                                        <td className="py-2 px-4">{sub.buyerName}</td>
                                        <td className="py-2 px-4 text-green-600 font-semibold capitalize">
                                            {sub.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center my-10">No approved submissions yet.</p>
                )}
            </div>
        </div>
    );
};

export default WorkerHome;

import React, { useState } from "react";

const stats = {
    totalBuyers: 12,
    totalWorkers: 34,
    totalCoins: 2350,
    totalPayments: 1125,
};

const dummyWithdrawals = [
    {
        _id: "w1",
        worker_name: "Sazid Ahamed",
        worker_email: "s@s.com",
        withdrawal_coin: 200,
        withdrawal_amount: 10,
        payment_system: "Bkash",
        account_number: "017xxxxxxxx",
        withdraw_date: "2025-07-13T14:30:00Z",
    },
    {
        _id: "w2",
        worker_name: "Rakib Hasan",
        worker_email: "r@r.com",
        withdrawal_coin: 400,
        withdrawal_amount: 20,
        payment_system: "Nagad",
        account_number: "018xxxxxxxx",
        withdraw_date: "2025-07-14T11:00:00Z",
    },
];

const AdminHome = () => {
    const [withdrawals, setWithdrawals] = useState(dummyWithdrawals);

    const handleApprove = (id) => {
        setWithdrawals(prev => prev.filter(w => w._id !== id));
        alert(`Marked ${id} as paid (simulate backend call here)`);
    };

    return (
        <div className=" mx-auto p-6 space-y-10 mt-10">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className=" rounded-xl bg-base-200 flex gap-3 flex-col items-center justify-center shadow py-10 border border-primary/50">
                    <p className=" text-base-content text-xl font-bold">Total Workers</p>
                    <h3 className="text-5xl font-bold  text-[#10b981]">{stats.totalWorkers}</h3>
                </div>
                <div className=" rounded-xl bg-base-200 flex gap-3 flex-col items-center justify-center shadow py-10 border border-primary/50">
                    <p className="text-base-content text-xl font-bold">Total Buyer</p>
                    <h3 className="text-5xl font-bold  text-[#3b82f6]">{stats.totalWorkers}</h3>
                </div>
                <div className=" rounded-xl bg-base-200 flex gap-3 flex-col items-center justify-center shadow py-10 border border-primary/50">
                    <p className="text-base-content text-xl font-bold">Total Coin</p>
                    <h3 className="text-5xl font-bold  text-[#f59e0b]">{stats.totalWorkers}</h3>
                </div>
                <div className=" rounded-xl bg-base-200 flex  gap-3 flex-col items-center justify-center shadow py-10 border border-primary/50">
                    <p className="text-base-content text-xl font-bold">Total Payment</p>
                    <h3 className="text-5xl font-bold  text-[#ef4444]">{stats.totalWorkers}</h3>
                </div>

            </div>

            {/* Withdraw Request Table */}
            <div>
                <h3 className="text-xl font-semibold text-secondary mb-4">Pending Withdrawals</h3>
                <div className="overflow-x-auto   rounded-lg shadow-sm">
                    <table className="min-w-full text-sm table-zebra">
                        <thead className="bg-secondary text-center text-secondary-content/90">
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Coins</th>
                                <th className="px-4 py-2">Amount ($)</th>
                                <th className="px-4 py-2">Payment System</th>
                                <th className="px-4 py-2">Account</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className=" text-center bg-base-200 text-base-content">
                            {withdrawals.map((w) => (
                                <tr key={w._id} >
                                    <td className="px-4 py-2 font-medium">{w.worker_name}</td>
                                    <td className="px-4 py-2 ">{w.worker_email}</td>
                                    <td className="px-4 py-2 text-yellow-600 font-semibold">{w.withdrawal_coin}</td>
                                    <td className="px-4 py-2 text-green-600 font-bold">${w.withdrawal_amount}</td>
                                    <td className="px-4 py-2">{w.payment_system}</td>
                                    <td className="px-4 py-2">{w.account_number}</td>
                                    <td className="px-4 py-2 text-base-content/50 ">
                                        {new Date(w.withdraw_date).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2.5">
                                        <button
                                            onClick={() => handleApprove(w._id)}
                                            className="px-3 py-2 bg-[#5a716b] hover:bg-[#4c5e59] text-white rounded-md text-sm transition"
                                        >
                                            Mark as Paid
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {withdrawals.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="text-center py-6 text-gray-500">
                                        ✅ All withdrawals are approved.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;

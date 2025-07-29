import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../Hook/useAuth';

const PaymentHistory = () => {

    const [wData, setWData] = useState([])
    const { user } = useAuth()
    const email = user?.email


    useEffect(() => {
        axios.get(`https://microtaskserver.vercel.app/payment-history/${email}`, {
            headers: {
                authorization: `Bearer ${user?.accessToken}`
            }
        })
            .then(({ data }) => {
                setWData(data)

            })
    }, [email,user?.accessToken])

    return (
        <div className=" mx-auto p-6">
            <h2 className="text-2xl font-bold text-[#5a716b] mb-6">Payment History</h2>

            <div className="overflow-x-auto rounded-lg shadow-sm">
                <table className="min-w-full table table-zebra text-sm">
                    <thead className="bg-primary text-primary-content text-center ">
                        <tr>

                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Currency</th>
                            <th className="px-4 py-3">Transaction ID</th>
                            <th className="px-4 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-base-200 divide-y text-center">
                        {wData.map((payment) => (
                            <tr key={payment._id} className="">
                                <td className="px-4 py-3 font-bold text-base-content">{payment.email}</td>
                                <td className="px-4 py-3 text-green-700 font-semibold">${(payment.amount / 100).toFixed(2)}</td>
                                <td className="px-4 py-3 uppercase text-base-content">{payment.currency}</td>
                                <td className="px-4 py-3  text-base-content truncate max-w-[180px]">{payment.transactionID}</td>
                                <td className="px-4 py-3 text-base-content">{new Date(payment.paidAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
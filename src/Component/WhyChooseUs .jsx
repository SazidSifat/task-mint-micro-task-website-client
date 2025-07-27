import React from 'react';
import { FaMoneyBillWave, FaLock, FaBolt } from 'react-icons/fa';

const WhyChooseUs = () => {
    return (
        <section className="py-20 container mx-auto bg-base-300  rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-8">Why Choose TaskMint ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                <div className="px-6 py-10 bg-base-100 rounded-xl shadow hover:shadow-lg transition">
                    <FaMoneyBillWave className="text-emerald-600 text-3xl mb-2 mx-auto" />
                    <h3 className="text-xl font-semibold mb-2">Fast Payouts</h3>
                    <p className="text-gray-700">Withdraw your earnings quickly with Bkash, Nagad, or Rocket.</p>
                </div>
                <div className="px-6 py-10 bg-base-100 rounded-xl shadow hover:shadow-lg transition">
                    <FaLock className="text-amber-500 text-3xl mb-2 mx-auto" />
                    <h3 className="text-xl font-semibold mb-2">Secure & Transparent</h3>
                    <p className="text-gray-700">Your data and coins are protected with role-based access and secure tokens.</p>
                </div>
                <div className="px-6 py-10 bg-base-100 rounded-xl shadow hover:shadow-lg transition">
                    <FaBolt className="text-blue-500 text-3xl mb-2 mx-auto" />
                    <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
                    <p className="text-gray-700">Get instant notifications for approvals, payments, and submissions.</p>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;

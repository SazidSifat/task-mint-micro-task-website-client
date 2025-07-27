import React from 'react';
import { FaUserPlus, FaClipboardCheck, FaMoneyBillWave } from 'react-icons/fa';

const HowItWorks = () => {
    return (
        <section className="py-12 mx-auto container  bg-base-100 text-center">
            <h2 className="text-3xl font-bold mb-8">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                <div className="py-10 shadow-lg rounded-xl border border-primary/50  hover:scale-105 transition">
                    <FaUserPlus className="text-emerald-500 text-4xl mb-4 mx-auto" />
                    <h4 className="text-xl font-semibold">1. Sign Up</h4>
                    <p className="text-gray-600">Create an account as a Buyer or Worker.</p>
                </div>
                <div className="py-10 shadow-lg rounded-xl border border-primary/50 hover:scale-105 transition">
                    <FaClipboardCheck className="text-amber-500 text-4xl mb-4 mx-auto" />
                    <h4 className="text-xl font-semibold">2. Complete Tasks</h4>
                    <p className="text-gray-600">Workers select and submit micro tasks.</p>
                </div>
                <div className="py-10 shadow-lg rounded-xl border border-primary/50 hover:scale-105 transition">
                    <FaMoneyBillWave className="text-green-500 text-4xl mb-4 mx-auto" />
                    <h4 className="text-xl font-semibold">3. Get Paid</h4>
                    <p className="text-gray-600">Earn coins and withdraw them as cash.</p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;

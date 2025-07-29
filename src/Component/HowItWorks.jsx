import React, { useEffect } from 'react';
import { FaUserPlus, FaClipboardCheck, FaMoneyBillWave } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HowItWorks = () => {
    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    const steps = [
        {
            icon: <FaUserPlus className="text-emerald-500 text-4xl mb-4 mx-auto" />,
            title: '1. Sign Up',
            description: 'Create an account as a Buyer or Worker.',
        },
        {
            icon: <FaClipboardCheck className="text-amber-500 text-4xl mb-4 mx-auto" />,
            title: '2. Complete Tasks',
            description: 'Workers select and submit micro tasks.',
        },
        {
            icon: <FaMoneyBillWave className="text-green-500 text-4xl mb-4 mx-auto" />,
            title: '3. Get Paid',
            description: 'Earn coins and withdraw them as cash.',
        },
    ];

    return (
        <section className="py-14 px-4 md:px-16 bg-base-100 text-base-content">
            <h2
                className="text-3xl font-bold text-center mb-12"
                data-aos="fade-up"
            >
                How It Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="py-10 px-6 bg-base-200 rounded-xl shadow-md border border-primary/40 text-center hover:shadow-xl hover:scale-105 transition-all duration-300"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                    >
                        {step.icon}
                        <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                        <p className="text-gray-600">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;

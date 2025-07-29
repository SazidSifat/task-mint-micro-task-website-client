import React, { useEffect } from 'react';
import { FaMoneyBillWave, FaLock, FaBolt } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const WhyChooseUs = () => {
    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    const features = [
        {
            icon: <FaMoneyBillWave className="text-emerald-600 text-3xl mb-2 mx-auto" />,
            title: "Fast Payouts",
            description: "Withdraw your earnings quickly with Bkash, Nagad, or Rocket.",
        },
        {
            icon: <FaLock className="text-amber-500 text-3xl mb-2 mx-auto" />,
            title: "Secure & Transparent",
            description: "Your data and coins are protected with role-based access and secure tokens.",
        },
        {
            icon: <FaBolt className="text-blue-500 text-3xl mb-2 mx-auto" />,
            title: "Real-Time Updates",
            description: "Get instant notifications for approvals, payments, and submissions.",
        },
    ];

    return (
        <section className="py-20 px-4 md:px-16 bg-base-300 rounded-2xl text-base-content text-center">
            <h2
                className="text-3xl font-bold mb-12"
                data-aos="fade-up"
            >
                Why Choose TaskMint?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="px-6 py-10 bg-base-100 rounded-xl shadow hover:shadow-xl hover:scale-105 transition-all duration-300"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                    >
                        {feature.icon}
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-700">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;

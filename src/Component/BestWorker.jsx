import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BestWorker = () => {
    const [worker, setWorker] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    useEffect(() => {
        axios.get('https://microtaskserver.vercel.app/workerDetails')
            .then((res) => setWorker(res.data))
            .catch(() => setError("Failed to load worker details"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="bg-base-100 text-base-content py-14 px-4 md:px-16">
            {/* Animated Heading */}
            <motion.h2
                className="text-3xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Best Workers
            </motion.h2>

            {/* Loading/Error/Empty States */}
            {loading && <p className="text-center text-lg">Loading...</p>}
            {error && <p className="text-center text-error">{error}</p>}
            {!loading && worker.length === 0 && !error && (
                <p className="text-center text-lg text-warning">No workers found.</p>
            )}

            {/* Worker Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {worker.map((w, i) => (
                    <motion.div
                        key={w._id}
                        className="bg-base-200 p-6 rounded-box shadow hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
                        data-aos="fade-up"
                        data-aos-delay={i * 100}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <img
                            src={w?.imageUrl}
                            alt={w?.name || "Worker profile"}
                            className="w-24 h-24 rounded-full border-4 border-primary mb-4"
                        />
                        <h3 className="text-xl font-semibold text-primary">{w.name}</h3>
                        <p className="text-base-content opacity-90 mt-2">
                            Coins: <span className="font-bold">{w?.coin || 0}</span>
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default BestWorker;

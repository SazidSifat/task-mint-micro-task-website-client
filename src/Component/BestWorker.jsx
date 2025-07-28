import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BestWorker = () => {
    const [worker, setWorker] = useState([])

    useEffect(() => {

        axios.get('http://localhost:3000/workerDetails')
            .then((res) => setWorker(res.data))
            .catch(() => {})

    }, [])


    return (
        <section className="bg-base-100 text-base-content py-14 px-4 md:px-16">
            <h2 className="text-3xl font-bold text-center mb-12">Best Workers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {worker.map((w) => (
                    <div
                        key={w._id}
                        className="bg-base-200 p-6 rounded-box shadow hover:shadow-lg transition duration-300 flex flex-col items-center text-center">
                        <img
                            src={w?.imageUrl}
                            alt={w?.name}
                            className="w-24 h-24 rounded-full border-4 border-primary mb-4"
                        />
                        <h3 className="text-xl font-semibold text-primary">{w.name}</h3>
                        <p className="text-base-content opacity-90 mt-2">
                            Coins: <span className="font-bold">{w.coin}</span>
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BestWorker;

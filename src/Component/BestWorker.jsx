import React from 'react';

const workers = [
    { id: 1, name: "Alice", coins: 1500, photo: "https://randomuser.me/api/portraits/women/21.jpg" },
    { id: 2, name: "Bob", coins: 2450, photo: "https://randomuser.me/api/portraits/men/34.jpg" },
    { id: 3, name: "Cathy", coins: 3100, photo: "https://randomuser.me/api/portraits/women/45.jpg" },
    { id: 4, name: "David", coins: 1800, photo: "https://randomuser.me/api/portraits/men/55.jpg" },
    { id: 5, name: "Eva", coins: 2900, photo: "https://randomuser.me/api/portraits/women/11.jpg" },
    { id: 6, name: "Frank", coins: 2250, photo: "https://randomuser.me/api/portraits/men/22.jpg" },
    { id: 7, name: "Grace", coins: 1950, photo: "https://randomuser.me/api/portraits/women/66.jpg" },
];

// Sort by coins desc, take top 6
const topWorkers = workers
    .sort((a, b) => b.coins - a.coins)
    .slice(0, 6);

const BestWorker = () => {
    return (
        <section className="bg-base-100 text-base-content py-14 px-4 md:px-16">
            <h2 className="text-3xl font-bold text-center mb-12">Best Workers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {topWorkers.map(({ id, name, coins, photo }) => (
                    <div
                        key={id}
                        className="bg-base-200 p-6 rounded-box shadow hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
                    >
                        <img
                            src={photo}
                            alt={name}
                            className="w-24 h-24 rounded-full border-4 border-primary mb-4"
                        />
                        <h3 className="text-xl font-semibold text-primary">{name}</h3>
                        <p className="text-base-content opacity-90 mt-2">
                            Coins: <span className="font-bold">{coins}</span>
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BestWorker;

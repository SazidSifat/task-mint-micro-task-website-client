import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ImCoinDollar } from "react-icons/im";
import { NavLink } from "react-router"; // React Router DOM
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); 

  useEffect(() => {
    axios.get("http://localhost:3000/tasks").then(({ data }) => {
      setTasks(data);
    });
  }, []);

  const handleSort = (order) => {
    setSortOrder(order);
    const sorted = [...tasks].sort((a, b) => {
      if (order === "asc") return a.totalPayable - b.totalPayable;
      if (order === "desc") return b.totalPayable - a.totalPayable;
      return 0;
    });
    setTasks(sorted);
  };

  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-secondary mb-6">
          Available Tasks
        </h2>

        {/* Sorting Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => handleSort("asc")}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary/70 transition"
          >
            Sort by Price ↑
          </button>
          <button
            onClick={() => handleSort("desc")}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary/70 transition"
          >
            Sort by Price ↓
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tasks.map((task, i) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-white border border-primary/50 rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col justify-between overflow-hidden"
            >
              {/* Task Image */}
              <img
                src={task.task_image || "/fallback.jpg"}
                alt={task.task_title}
                className="w-full h-48 object-cover"
              />

              {/* Task Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl text-left font-semibold text-primary mb-2">
                    {task.task_title}
                  </h3>
                  {/* <p className="text-gray-700 mb-4">{task.description}</p> */}
                </div>

                {/* Payable & Deadline */}
                <div className="flex justify-between items-center mb-4">
                  <span className="flex items-center gap-1 font-bold text-yellow-500">
                    <ImCoinDollar /> {task.totalPayable}
                  </span>
                  <span className="text-gray-500 text-sm">
                    Deadline: {task.completion_date}
                  </span>
                </div>

                {/* View Button */}
                <NavLink
                  to={`/taskDetails/${task._id}`}
                  className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-secondary/70 transition"
                >
                  View
                </NavLink>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tasks;

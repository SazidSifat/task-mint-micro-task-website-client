import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { data, Link } from "react-router";

const FeatureTask = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    // Main section animation only
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  useEffect(() => {
    axios.get("https://microtaskserver.vercel.app/feature-task").then(({ data }) => {
     
      setTasks(data);
    });
  }, []);

  return (
    <section className="p-8 bg-base-200 min-h-screen" data-aos="fade-up">
      <div className="container mx-auto">
        <header className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Feature Tasks</h2>
          <p className="text-sm md:text-base text-gray-500 mt-2">
            Choose a task, check the pay and deadline, and start earning!
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="card bg-base-100 p-3 border border-primary/50 transition-transform transform hover:-translate-y-2 hover:scale-105"
            >
              {/* Thumbnail */}
              <figure>
                <img
                  src={task.task_image}
                  alt={task.task_title}
                  className=" w-full h-60 object-cover"
                />
              </figure>

              {/* Card Body */}
              <div className="card-body  flex flex-col justify-between ">
                {/* Top Content */}
                <div>
                  <div className="h-12">
                    <h3 className="card-title  text-lg">{task.task_title}</h3>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-semibold text-gray-700">
                      Pay: {task.totalPayable}
                    </span>
                    <span className="font-sm text-gray-500">
                      Deadline: {task.completion_date}
                    </span>
                  </div>
                </div>

                {/* Bottom Button */}
                <div className="card-actions mt-4">
                  <Link to={`/taskDetails/${task._id}`} className="w-full">
                    <button className="btn w-full btn-primary">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 w-full text-center">
          <Link to="/tasks" className="btn btn-primary">
            View All Tasks
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatureTask;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router";
import axios from "axios";
import useAuth from "../Hook/useAuth";

const TaskDetail = () => {
  const { id } = useParams();

  const [task, setTask] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/tasks/${id}`, {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setTask(data);
      });
  }, [id, user?.accessToken]);

  return (
    <div className="container mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white border border-primary/50 rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Task Image */}
        <img
          src={task.task_image}
          alt={task.task_title}
          className="w-full h-64 object-cover"
        />

        {/* Task Content */}
        <div className="p-8 space-y-6">
          <h2 className="text-3xl font-bold text-secondary">
            {task.task_title}
          </h2>
          <p className="text-gray-700">{task.task_detail}</p>

          {/* Buyer Info */}
          <div className="border border-primary/50 rounded-xl p-4 bg-base-100">
            <h3 className="text-xl font-semibold mb-2 text-primary">
              Buyer Info
            </h3>
            <p>
              <span className="font-bold">Name:</span> {task.buyerName}
            </p>
            <p>
              <span className="font-bold">Email:</span> {task.buyerEmail}
            </p>
          </div>

          {/* Task Info */}
          <div className="border border-primary/50 rounded-xl p-4 bg-base-100 grid grid-cols-2 gap-4">
            <div>
              <p>
                <span className="font-bold">Payable Amount:</span> $
                {task.payable_amount}
              </p>
            </div>
            <div>
              <p>
                <span className="font-bold">Total Payable:</span> $
                {task.totalPayable}
              </p>
            </div>
            <div>
              <p>
                <span className="font-bold">Required Workers:</span>{" "}
                {task.required_workers}
              </p>
            </div>
            <div>
              <p>
                <span className="font-bold">Completion Date:</span>{" "}
                {task.completion_date}
              </p>
            </div>
            <div className="col-span-2">
              <p>
                <span className="font-bold">Submission Info:</span>{" "}
                {task.submission_info}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskDetail;

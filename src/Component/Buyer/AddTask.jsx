import React from 'react';

const AddTask = () => {
    return (
        <div className="max-w-6xl mx-auto mt-10 px-6  rounded-lg ">
            <form className="space-y-5">
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Task Title</label>
                    <input
                        type="text"
                        name="task_title"

                        required
                        className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Watch my YouTube video and comment"
                    />
                </div>



                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block mb-1 font-medium text-gray-700">Required Workers</label>
                        <input
                            type="number"
                            name="required_workers"
                            required
                            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., 100"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 font-medium text-gray-700">Payable Amount</label>
                        <input
                            type="number"
                            name="payable_amount"

                            required
                            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., 10"
                        />
                    </div>
                </div>

                <div className='flex gap-4'>
                    <div className='flex-1'>
                        <label className="block mb-1  font-medium text-gray-700">Completion Date</label>
                        <input
                            type="date"
                            name="completion_date"

                            required
                            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className='flex-1'>
                        <label className="block mb-1 font-medium text-gray-700">Submission Info</label>
                        <input
                            type="text"
                            name="submission_info"

                            required
                            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Screenshot / Proof link"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">Task Image URL</label>
                    <input
                        type="file"
                        name="task_image_url"

                        className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Image link (optional)"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Task Detail</label>
                    <textarea
                        name="task_detail"

                        required
                        className="w-full border border-gray-300 px-4 py-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        placeholder="Detailed description of the task"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-primary-content font-medium py-3 rounded-md transition"
                >
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default AddTask;
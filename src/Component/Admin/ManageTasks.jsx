import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

const ManageTasks = () => {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/tasks')
            .then(res => setTasks(res.data))

    }, [setTasks])

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5a716b",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`http://localhost:3000/tasks/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            const afterDelete = tasks.filter(task => task._id !== id)
                            setTasks(afterDelete)

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold text-primary mb-6">Manage All Tasks</h2>

            <div className="overflow-x-auto rounded-xl shadow-lg border border-base-300">
                <table className="table table-zebra w-full">
                    <thead className="bg-primary text-primary-content">
                        <tr>
                            <th className=' text-center'>Task Title</th>
                            <th className=' text-center'>Required Worker</th>
                            <th className=' text-center'>Submission Date</th>
                            <th className=' text-center'>Total Payable </th>
                            <th className=' text-center' >Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks?.map((task) => (
                            <tr key={task._id}>

                                <td className='text-center'>{task.task_title}</td>
                                <td className='text-center'>{task.required_workers}</td>
                                <td className='text-center'>{task.completion_date}</td>
                                <td className='text-center'>{task.totalPayable}</td>
                                <td className="flex items-center gap-3 justify-center">
                                    <button onClick={() => handleDelete(task._id)}
                                        className="p-2 font-semibold rounded-lg bg-error text-white btn-sm">
                                        <MdDelete size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageTasks;
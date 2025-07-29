import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import useAuth from '../../Hook/useAuth';

const ManageUsers = () => {

    const [users, setUsers] = useState([])
    const { user } = useAuth()



    useEffect(() => {
        axios.get('https://microtaskserver.vercel.app/users')
            .then(res => setUsers(res.data))

    }, [setUsers])

    const updateRole = (e, id) => {
        const newRole = e.target.value


        axios.patch(`https://microtaskserver.vercel.app/update-role/${id}`, { role: newRole }, {
            headers: {
                authorization: `Bearer ${user?.accessToken}`
            }
        })
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Role Updated",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(() => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Role Updating Error",
                    showConfirmButton: false,
                    timer: 1500
                });

            })
    }


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

                axios.delete(`https://microtaskserver.vercel.app/users/${id}`, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`
                    }
                })
                    .then(res => {
                        if (res.data.deletedCount) {

                            const afterDelete = users.filter(user => user._id !== id)
                            setUsers(afterDelete)

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
            <h2 className="text-2xl font-bold text-primary mb-6">My Posted Tasks</h2>

            <div className="overflow-x-auto rounded-xl shadow-lg border border-base-300">
                <table className="table table-zebra w-full">
                    <thead className="bg-primary text-primary-content">
                        <tr>
                            <th className="text-left">Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Coins</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.length > 0 ? (
                            users.map((user) => (
                                <tr key={user._id}>
                                    <td>
                                        <img
                                            src={user.imageUrl}
                                            alt={user.name}
                                            className="w-10 h-10 object-cover rounded"
                                        />
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td className="capitalize">{user.role}</td>
                                    <td>{user.coin}</td>
                                    <td className="flex items-center gap-3 justify-center">
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="p-2 font-semibold rounded-lg bg-error text-white btn-sm"
                                        >
                                            <MdDelete size={20} />
                                        </button>
                                        <select
                                            onChange={(e) => updateRole(e, user._id)}
                                            className="py-2 px-4 border border-primary/50 rounded-lg font-semibold"
                                            defaultValue={user.role}
                                        >
                                            <option value="buyer">Buyer</option>
                                            <option value="worker">Worker</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6}>
                                    <p className="text-center text-base-content/50 text-2xl font-bold py-6">
                                        No Users Found
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageUsers;
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Pencil, Trash, CircleArrowLeft } from "lucide-react";
import Link from "next/link";

const UserTable = () => {
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/user/deleteUser/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (userId: number) => {
    router.push(`/edit-user/${userId}`); // Redirect to edit page
  };

  return (
    <div className="container mx-auto p-6">
      <button>
        <Link href="/">
          <CircleArrowLeft />
          CreateUser
        </Link>
      </button>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full border-collapse text-sm text-left text-gray-700">
          <thead className="bg-gray-200 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Mobile</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Password</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">Date of Birth</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-3">{user.id}</td>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.mobile}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.password}</td>
                <td className="px-4 py-3">{user.gender}</td>
                <td className="px-4 py-3">
                  {new Date(user.date_of_birth).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 flex space-x-2">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;

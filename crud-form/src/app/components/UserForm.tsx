"use client";

import { useState, useEffect } from "react";

interface UserFormProps {
  initialData?: {
    name: string;
    mobile: string;
    email: string;
    password: string;
    gender: string;
    date_of_birth: string;
  };
  onSubmit: (formData: any) => Promise<void>;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password:"",
    gender: "",
    date_of_birth: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };
  console.log(initialData)

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-center">{initialData ? "Edit User" : "Create User"}</h2>

      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded mb-2" required />
      <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" className="w-full p-2 border rounded mb-2" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded mb-2" required />
      <input type="text" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full p-2 border rounded mb-2" required />

      <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded mb-2" required>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        {initialData ? "Update User" : "Create User"}
      </button>
    </form>
  );
};

export default UserForm;

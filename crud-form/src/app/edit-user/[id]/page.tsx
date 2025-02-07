"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import UserForm from "@/app/components/UserForm";

const EditUserPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/user/${id}`)
        .then((res) => setUserData(res.data.data))
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [id]);

  const handleUpdateUser = async (formData: any) => {
    try {
      await axios.patch(`http://localhost:3000/user/updateUser/${id}`, formData);
      alert("User updated successfully!");
      router.push("/users");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };

  return userData ? <UserForm initialData={userData} onSubmit={handleUpdateUser} /> : <p>Loading...</p>;
};

export default EditUserPage;

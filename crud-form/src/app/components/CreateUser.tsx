"use client";

import UserForm from "@/app/components/UserForm";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateUserPage = () => {
  const router = useRouter();

  const handleCreateUser = async (formData: any) => {
    try {
      await axios.post("http://localhost:3000/user/createUser", formData);
      alert("User created successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user.");
    }
  };

  return <UserForm onSubmit={handleCreateUser} />;
};

export default CreateUserPage;

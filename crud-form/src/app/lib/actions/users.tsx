"use server";

export async function getUsers() {
    let response = await fetch("http://localhost:3000/user/");
    let data = await response.json();
    return data;
}

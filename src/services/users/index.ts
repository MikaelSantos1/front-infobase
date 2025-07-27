import { api } from "../api";

interface User {
  email: string;
  role: "ADMIN" | "COLLABORATOR" | "MANAGER";
  is_active: boolean;
  name: string;
}

export async function signIn(email: string, password: string) {
  const { data } = await api.post("/users/sign-in", {
    email,
    password,
  });
  return data;
}

export async function fetchUsers() {
  const { data } = await api.get("/users");
  return data;
}

export async function disableUser({ userId }: { userId: string }) {
  const { data } = await api.delete(`user/${userId}`);
  return data;
}

export async function createUser(data: User) {
  const { data: user } = await api.post("/users", {
    ...data,
    password: "default_password",
  });
  return user;
}

export async function updateUser(data: User) {
  const { data: user } = await api.put(`/users/${data.email}`, {
    ...data,
  });
  return user;
}

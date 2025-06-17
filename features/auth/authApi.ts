import { apiClient } from "@/lib/api";
import { User } from "../../types/user";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UpdatePayload {
  name?:string,
  email?:string,
  phoneNumber?:string,
  role?:string,
  _id?:string
}

interface userReturnRequest {
    user: User;
    token: string;
}

export const login = async (data: LoginPayload): Promise<userReturnRequest> => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};

export const logout = async ()=>{
  await apiClient.post("/auth/logout",{});
}

export const update = async (data: UpdatePayload): Promise<User> => {
  const response = await apiClient.put(`/users/${data._id}`, data);
  return response.data;
}
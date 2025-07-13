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

export interface changePasswordPayload{
  oldPassword:string;
  newPassword:string;
  confirmPassword:string;
}

export interface picture{
  imageUrl:string,
  publicId:string
}

export const login = async (data: LoginPayload): Promise<userReturnRequest> => {
   const response = await apiClient.post('/api/login', data, { withCredentials: true });
  return response.data;
};

export const logout = async ()=>{
  await apiClient.post("/auth/logout",{});
}

export const update = async (data: UpdatePayload): Promise<User> => {
  const response = await apiClient.put(`/users/${data._id}`, data);
  return response.data;
}

export const changePassword = async (data:changePasswordPayload):Promise<string>=>{
  const response = await apiClient.put("/auth/password",data)
  console.log("response in authApi",response.data)
  return response.data
}

export const picture = async (data:picture):Promise<User>=>{
  const response = await apiClient.put("/users/picture/upload",data);
  return response.data.user
}
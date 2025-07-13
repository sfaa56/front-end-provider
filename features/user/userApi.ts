import { apiClient } from "@/lib/api";

export const fetchUsers = async (page: number, limit: number) => {
  const response = await apiClient.get(`/users?page=${page}&limit=${limit}`);
  return response.data;
}

export const deleteUser = async (userId: string) => {
  const response = await apiClient.delete(`/users/${userId}`);
  return response.data;
}

export const approveUser = async (userId: string) => {
  const response = await apiClient.put(`/admin/approve-provider/${userId}`);
  return response.data;
}


export const blockUser = async (userId: string) => {
  const response = await apiClient.put(`/users/${userId}/block`);
  return response.data;
}

export const unblockUser = async (userId: string) => {
  const response = await apiClient.put(`/users/${userId}/unblock`);
  return response.data;
}



export const getUserById = async (userId: string) => {
  const response = await apiClient.get(`/users/${userId}`);
  return response.data;
}

export const updateUser = async (userId: string, userData: any) => {
  const response = await apiClient.put(`/users/${userId}`, userData);
  return response.data;
}



import apiClient from '../../lib/axios'

export const loginUser = async (email: string, password: string) => {
  const res = await apiClient.post("/auth/login", { email, password });
  return res.data;
};

export const signupUser = async (name: string, email: string, password: string) => {
  const res = await apiClient.post("/auth/register", { name, email, password });
  return res.data;
};

export const refreshAuthToken = async () => {
  const res = await apiClient.post("/auth/refresh");
  return res.data;
};

export const logoutUser = async () => {
  const res = await apiClient.post("/auth/logout");
  return res.data;
};

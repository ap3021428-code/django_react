import axios from "axios";

export function getAuthApi() {
  const token = localStorage.getItem("access");

  return axios.create({
    baseURL: "http://localhost:8000",
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });
}

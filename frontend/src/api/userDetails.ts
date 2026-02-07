import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type User = {
  id: string;
  email: string;
  is_active: boolean;
  full_name?: string;
};

const getUserDetails = async (): Promise<User[]> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const response = await axios.get("http://localhost:8000/api/v1/users/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useUserDetails = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: getUserDetails,
    staleTime: 5 * 60 * 1000,
  });
};

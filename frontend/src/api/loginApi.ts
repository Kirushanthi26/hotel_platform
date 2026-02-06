import type { LoginFormValues } from "@/features/auth/pages/LogInPage";
import axios from "axios";

export const loginUser = async (data: LoginFormValues) => {
  const formData = new URLSearchParams();
  formData.append("username", data.email);
  formData.append("password", data.password);

  const { data: responseData } = await axios.post(
    "http://localhost:8000/api/v1/login/access-token",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );
  return responseData;
};

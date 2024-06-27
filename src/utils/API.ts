import { APIResponse, User } from "../types";
import axios, { AxiosError, AxiosResponse } from "axios";

export async function registerUser(user: User) {
  let response: AxiosResponse<APIResponse> | undefined;
  let errors: AxiosError | undefined;

  try {
    response = await axios.post<APIResponse>(
      "http://localhost:4000/api/v1/users/register",
      user,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  } catch (error) {
    errors = error as AxiosError;
    console.log("Error while registering user: ", errors);
  }

  return { response, errors };
}

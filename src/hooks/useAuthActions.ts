import { useRecoilState, useSetRecoilState } from "recoil";
import { APIResponse, LoginUserType, SignUpUserType } from "../types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { apiLoadingStateAtom, currentUserStateAtom } from "../contexts/AuthAtom";
import { useCallback } from "react";

axios.defaults.baseURL = "http://localhost:4000/api/v1/users";

const useAuthActions = () => {
  const setCurrentUser = useSetRecoilState(currentUserStateAtom);
  const [isLoading, setIsLoading] = useRecoilState(apiLoadingStateAtom);

  async function registerUser(user: SignUpUserType) {
    let response: AxiosResponse<APIResponse> | undefined;
    let errors: AxiosError<APIResponse> | undefined;

    setIsLoading(true);

    try {
      response = await axios.post<APIResponse>("/register", user, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      errors = error as AxiosError<APIResponse>;
      console.log("Error while registering user: ", errors);
    } finally {
      setIsLoading(false);
    }

    return { response, errors };
  }

  async function loginUser(user: LoginUserType) {
    let response: AxiosResponse<APIResponse> | undefined;
    let errors: AxiosError | undefined;

    setIsLoading(true);

    try {
      response = await axios.post<APIResponse>("/login", user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.data?.accessToken}`;
    } catch (error) {
      errors = error as AxiosError;
      console.log("Error while logging in user: ", errors);
    } finally {
      setIsLoading(false);
    }

    return { response, errors };
  }

  async function logoutUser() {
    let response: AxiosResponse<APIResponse> | undefined;
    let errors: AxiosError | undefined;

    try {
      axios.defaults.headers.common["Authorization"] = "";
      response = await axios.post<APIResponse>("/logout", {}, { withCredentials: true });
    } catch (error) {
      errors = error as AxiosError;
      console.log("Error while registering user: ", errors);
    }

    return { response, errors };
  }

  const refreshAccessToken = useCallback(async () => {
    let response: AxiosResponse<APIResponse> | undefined;
    let errors: AxiosError | undefined;

    setIsLoading(true);

    try {
      response = await axios.post("/refresh-token", {}, { withCredentials: true });

      if (response?.data.data) {
        setCurrentUser(response?.data.data);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.data?.accessToken}`;
      }
    } catch (error) {
      errors = error as AxiosError;
      console.log("Error while refreshing the token: ", errors);
    } finally {
      setIsLoading(false);
    }

    return { response, errors };
  }, [setCurrentUser, setIsLoading]);

  return { registerUser, loginUser, logoutUser, refreshAccessToken, isLoading };
};
export default useAuthActions;

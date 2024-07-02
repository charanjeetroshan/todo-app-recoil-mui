import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "../validationSchemas/loginSchema";
import { z } from "zod";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { StyledContainer } from "../components/shared/StyledContainer";
import { Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import { currentUserStateAtom } from "../contexts/AuthAtom";
import { APIResponse } from "../types";
import useAuthActions from "../hooks/useAuthActions";

function Login() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserStateAtom);
  const {
    handleSubmit,
    watch,
    register,
    control,
    formState: { errors: formErrors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      credentials: "",
      password: "",
    },
  });
  const { loginUser, isLoading } = useAuthActions();

  const credentials = watch("credentials");

  const handleLogin: SubmitHandler<z.infer<typeof loginSchema>> = async (data) => {
    const { response, errors } = await loginUser({
      ...data,
      email: credentials,
      username: credentials,
    });

    if (response?.data.success) {
      setCurrentUser(response.data.data ?? {});

      toast.success(response.data.message, {
        position: "bottom-center",
        style: { textAlign: "center", width: "380px", maxWidth: "100%" },
      });
    } else if (errors?.response?.data) {
      const error = errors.response.data as APIResponse;
      toast.error(error.message, {
        position: "bottom-center",
        style: { textAlign: "center", width: "380px", maxWidth: "100%" },
      });
    }
  };

  if (currentUser.accessToken) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return <CircularProgress color="inherit" />;
  }

  return (
    <StyledContainer>
      <Typography variant="h1" fontSize="3.5rem" mb={4}>
        Login to the todo's app
      </Typography>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Stack spacing={2} width="600px" maxWidth="100%" margin="0 auto">
          <Controller
            name="credentials"
            control={control}
            render={({ field }) => (
              <TextField
                {...register("credentials")}
                type="text"
                variant="outlined"
                color={formErrors.credentials ? "error" : "info"}
                label="Email / Username"
                error={!!formErrors.credentials?.message}
                helperText={formErrors.credentials?.message}
                {...field}
                value={credentials}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                type="password"
                variant="outlined"
                label="Password"
                color={formErrors.password ? "error" : "info"}
                error={!!formErrors.password?.message}
                helperText={formErrors.password?.message}
                {...field}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="info"
            sx={{ padding: "0.8rem 3rem" }}
          >
            Login
          </Button>
        </Stack>
      </form>
    </StyledContainer>
  );
}

export default Login;

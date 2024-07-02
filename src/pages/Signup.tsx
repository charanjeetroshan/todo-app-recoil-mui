import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { StyledContainer } from "../components/shared/StyledContainer";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { signUpSchema } from "../validationSchemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import FileInput from "../components/ui/FileInput";
import useAuthActions from "../hooks/useAuthActions";

const StyledTextField = styled(TextField)({
  width: "100%",
});

function Signup() {
  const theme = useTheme();
  const { registerUser, isLoading } = useAuthActions();

  const [registerationSuccessful, setRegistrationSuccessful] = useState(false);
  const [image, setImage] = useState<File>();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      avatar: undefined,
    },
  });

  const {
    formState: { errors: formErrors },
  } = form;

  const handleSignUp: SubmitHandler<z.infer<typeof signUpSchema>> = async (data) => {
    const { response, errors } = await registerUser({
      ...data,
      avatar: image,
    });

    if (response?.data.success) {
      toast.success(response.data.message, {
        position: "bottom-center",
        style: { textAlign: "center", width: "380px", maxWidth: "100%" },
      });

      setRegistrationSuccessful(true);
    } else if (errors?.isAxiosError) {
      toast.error("The user couldn't get registered.", {
        position: "bottom-center",
        style: { textAlign: "center", width: "380px", maxWidth: "100%" },
      });
    }
  };

  if (registerationSuccessful) {
    return <Navigate to="/log-in" replace />;
  }

  if (isLoading) {
    return <CircularProgress color="inherit" />;
  }

  return (
    <StyledContainer>
      <Typography variant="h1" fontSize="3.5rem" mb={4}>
        Sign up for the todo's app
      </Typography>
      <form onSubmit={form.handleSubmit(handleSignUp)}>
        <Stack spacing={2} alignItems="center" width="100%">
          <Stack direction="row" justifyContent="space-around" spacing={2} width="100%">
            <Stack spacing={2} width="100%">
              <Controller
                name="fullName"
                control={form.control}
                render={({ field }) => (
                  <StyledTextField
                    type="text"
                    variant="outlined"
                    color={formErrors.fullName?.message ? "error" : "info"}
                    label="Full Name"
                    error={!!formErrors.fullName?.message}
                    helperText={formErrors.fullName?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field }) => (
                  <StyledTextField
                    type="email"
                    variant="outlined"
                    label="Email"
                    color={formErrors.email?.message ? "error" : "info"}
                    error={!!formErrors.email?.message}
                    helperText={formErrors.email?.message}
                    {...field}
                  />
                )}
              />
            </Stack>
            <Stack spacing={2} width="100%">
              <Controller
                name="username"
                control={form.control}
                render={({ field }) => (
                  <StyledTextField
                    type="text"
                    variant="outlined"
                    label="Username"
                    color={formErrors.username?.message ? "error" : "info"}
                    error={!!formErrors.username?.message}
                    helperText={formErrors.username?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field }) => (
                  <StyledTextField
                    type="password"
                    variant="outlined"
                    label="Password"
                    color={formErrors.password?.message ? "error" : "info"}
                    error={!!formErrors.password?.message}
                    helperText={formErrors.password?.message}
                    {...field}
                  />
                )}
              />
            </Stack>
          </Stack>
          <Controller
            name="avatar"
            control={form.control}
            render={({ field: { onChange, ...field } }) => (
              <>
                <FileInput
                  label="Browse files to upload"
                  acceptedFileTypes={["image/*"]}
                  borderColor={formErrors.avatar ? "#d32" : theme.palette.info.main}
                  error={!!formErrors.avatar}
                  color={formErrors.avatar ? "error" : "info"}
                  {...field}
                  onChange={(e) => {
                    setImage((e.target.files as FileList)[0]);
                    onChange(e);
                  }}
                />
                {formErrors.avatar && (
                  <p className="text-[#d32f2f]">{formErrors.avatar.message}</p>
                )}
              </>
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="info"
            sx={{ padding: "0.8rem 3rem", alignSelf: "flex-start" }}
          >
            Sign up
          </Button>
        </Stack>
      </form>
    </StyledContainer>
  );
}

export default Signup;

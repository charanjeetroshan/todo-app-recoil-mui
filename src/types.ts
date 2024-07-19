export type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type SignUpUserType = {
  fullName: string;
  email: string;
  username: string;
  password: string;
  avatar: File | undefined;
};

export type LoginUserType =
  | {
      username: string | undefined;
      password: string;
    }
  | {
      email: string | undefined;
      password: string;
    };

export type APIResponse = {
  statusCode: number;
  data?: LoggedInUser;
  message: string;
  success: boolean;
  errors?: [];
};

export type LoggedInUser = {
  user?: {
    username: string;
    email: string;
    fullName: string;
    avatar: string;
    coverImage: string;
  };
  accessToken?: string;
  refreshToken?: string;
};

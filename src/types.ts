export type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type User = {
  fullName: string;
  email: string;
  username: string;
  password: string;
  avatar: File | undefined;
};

export type APIResponse = {
  statusCode: number;
  data: User[] | null;
  message: string;
  success: boolean;
};

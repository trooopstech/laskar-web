type User = {
  id: string;
  email: string;
  name?: string;
  photo?: string;
  is_verified?: boolean;
};

interface UserWithJWT {
  user: User;
  token: string;
  error: Error;
}

interface UserLoginInput {
  email: string;
  password: string;
}

interface UserCreateInput {
  email: string;
  name?: string;
  password: string;
}

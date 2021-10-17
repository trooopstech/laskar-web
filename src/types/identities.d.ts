type User = {
  id: string;
  email: string;
  name?: string;
  photo?: string;
  color?: string;
  is_verified?: boolean;
  birthdate?: string;
  gender: "MALE" | "FEMALE";
  phone_number?: string;
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
  name: string;
  password: string;
}

interface UserUpdateInput {
  phone_number?: string;
  gender?: "MALE" | "FEMALE";
  birthdate?: Date;
}

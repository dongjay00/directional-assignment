export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponseDto = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

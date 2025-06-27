export interface LoginFormState {
  error?: {
    email?: string;
    password?: string;
  };
  message?: string;
}

export interface RegisterFormState {
  error?: {
    email?: string;
    password?: string;
  };
  message?: string;
}

export type UserRegisterInput = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type UserRegisterOutput = {
  name: string;
  email: string;
};

export interface IUserRegisterService {
  execute: (data: UserRegisterInput) => Promise<UserRegisterOutput>;
}

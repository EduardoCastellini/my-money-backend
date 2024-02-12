export interface ISignIn {
  execute: (email: string, password: string) => Promise<string>;
}

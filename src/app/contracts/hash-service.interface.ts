export interface IHashService {
  hash(plaintext: string): Promise<string>;

  compare(plaintext: string, hashedValue: string): Promise<boolean>;
}

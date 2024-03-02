import { hash, genSaltSync, compare } from 'bcrypt';
import { IHashService } from 'src/app/contracts/hash-service.interface';

export class HashAdapter implements IHashService {
  async hash(plaintext: string): Promise<string> {
    const salt = genSaltSync(10);

    return await hash(plaintext, salt);
  }

  async compare(plaintext: string, hashedValue: string): Promise<boolean> {
    return compare(plaintext, hashedValue);
  }
}

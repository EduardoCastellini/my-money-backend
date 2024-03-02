import bcrypt from 'bcrypt';
import { IHashService } from 'src/app/contracts/hash-service.interface';

export class HashAdapter implements IHashService {
  private readonly salt = 10;

  async hash(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, this.salt);
  }

  async compare(plaintext: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(plaintext, hashedValue);
  }
}

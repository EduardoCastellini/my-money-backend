import { ISignIn } from 'src/domain/contracts/sign-in.interface';
import { IUserRepository } from '../contracts/user-repository.interface';

export class SignInUseCase implements ISignIn {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepo.findOne(email);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.password !== password) {
      throw new Error('Invalid password');
    }

    return user.id;
  }
}

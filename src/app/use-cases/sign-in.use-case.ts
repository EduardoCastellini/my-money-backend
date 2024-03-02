import { ISignIn } from 'src/domain/contracts/sign-in.interface';
import { IUserRepository } from '../contracts/user-repository.interface';
import { IJwtService } from '../contracts/jwt-service.interface';
import { IHashService } from '../contracts/hash-service.interface';
import { NotFoundException } from '@nestjs/common';

export class SignInUseCase implements ISignIn {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly hashService: IHashService,
    private readonly jwtService: IJwtService,
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepo.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await this.hashService.compare(password, user.password))) {
      throw new NotFoundException('Invalid password');
    }

    const userId = user.id;
    return this.jwtService.sign({ email, userId });
  }
}

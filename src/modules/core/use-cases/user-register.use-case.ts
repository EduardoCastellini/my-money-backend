import { IUserRepository } from '../contracts/user-repository.interface';
import {
  IUserRegister,
  UserRegisterInput,
  UserRegisterOutput,
} from 'src/modules/core/domain/contracts/user-register.interface';
import { UserEntity } from 'src/modules/core/domain/entities/user.entity';
import { IHashService } from '../contracts/hash-service.interface';
import { ConflictException } from '@nestjs/common';

export class UserRegisterUseCase implements IUserRegister {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly hashService: IHashService,
  ) {}

  async execute(data: UserRegisterInput): Promise<UserRegisterOutput> {
    const userAlreadyExists = await this.userRepo.findOneByEmail(data.email);

    if (userAlreadyExists) {
      throw new ConflictException('User already exists');
    }

    const password = await this.hashService.hash(data.password);

    const user = UserEntity.create({
      ...data,
      password,
    });

    await this.userRepo.save(user);

    return {
      name: user.name,
      email: user.email,
    };
  }
}

import { IUserRepository } from 'src/modules/core/contracts/user-repository.interface';
import { UserEntity } from 'src/modules/core/domain/entities/user.entity';
import { PrismaService } from '../prisma.service';
import { Inject } from '@nestjs/common';

export class UserRepository implements IUserRepository {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async save(userEntity: UserEntity): Promise<UserEntity> {
    const user = await this.prisma.users.create({
      data: {
        id: userEntity.id,
        name: userEntity.name,
        email: userEntity.email,
        password: userEntity.password,
        createdAt: userEntity.createdAt,
      },
    });

    return new UserEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
    });
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return new UserEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}

import { IUserRepository } from 'src/app/contracts/user-repository.interface';
import { UserEntity } from 'src/domain/entities/user.entity';
import { PrismaService } from '../prisma.service';

export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async save(userEntity: UserEntity): Promise<UserEntity> {
    const user = await this.prisma.users.create({
      data: {
        id: userEntity.id,
        name: userEntity.name,
        email: userEntity.email,
        password: userEntity.password,
      },
    });

    return new UserEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
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

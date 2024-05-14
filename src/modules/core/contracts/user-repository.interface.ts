import { UserEntity } from 'src/modules/core/domain/entities/user.entity';

export interface IUserRepository {
  save(user: UserEntity): Promise<UserEntity>;
  findOneByEmail(email: string): Promise<UserEntity>;
}

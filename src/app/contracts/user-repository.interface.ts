import { UserEntity } from 'src/domain/entities/User.entity';

export interface IUserRepository {
  save(user: UserEntity): Promise<UserEntity>;
  findOneByEmail(email: string): Promise<UserEntity>;
}

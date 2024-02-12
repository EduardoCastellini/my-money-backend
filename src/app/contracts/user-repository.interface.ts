import { UserEntity } from 'src/domain/entities/User.entity';

export interface IUserRepository {
  save(user: UserEntity): Promise<UserEntity>;
  findOne(userId: string): Promise<UserEntity>;
}

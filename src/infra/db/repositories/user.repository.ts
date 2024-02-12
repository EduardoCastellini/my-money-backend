import { IUserRepository } from 'src/app/contracts/user-repository.interface';
import { UserEntity } from 'src/domain/entities/user.entity';

export class UserRepository implements IUserRepository {
  private users: UserEntity[] = [];

  async save(user: UserEntity): Promise<UserEntity> {
    this.users.push(user);

    return user;
  }

  async findOne(userId: string): Promise<UserEntity> {
    return new Promise((resolve, reject) => {
      const user = this.users.find((user) => user.id === userId);
      if (!user) {
        reject('User not found');
      }

      resolve(user);
    });
  }
}

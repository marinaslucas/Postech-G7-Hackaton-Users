import { InMemoryRepository } from '../../../../../shared/domain/repositories/in-memory-repository';
import { UserEntity } from '../../../../../users/domain/entities/user.entity';
import { UserRepository } from '../../../../..//users/domain/repositories/user.repository';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';

export class UserInMemoryRepository
  extends InMemoryRepository<UserEntity>
  implements UserRepository
{
  async findByEmail(email: string): Promise<UserEntity> {
    const entity = this.items.find(item => item.email === email);
    if (!entity) {
      throw new NotFoundError(`User not found for email provided ${email}`);
    }
    return entity;
  }
  async emailExists(email: string): Promise<void> {
    const user = await this.findByEmail(email);
    if (user) {
      throw new Error('Email already exists');
    }
  }
}

import { UserEntity } from '../../../../../users/domain/entities/user.entity';
import { UserRepository } from '../../../../../users/domain/repositories/user.repository';
import { NotFoundError } from '../../../../../shared/domain/errors/not-found-error';
import { SearchableInMemoryRepository } from '../../../../../shared/domain/repositories/in-memory-searchable-repository';

export class UserInMemoryRepository
  extends SearchableInMemoryRepository<UserEntity>
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

  protected async applyFilter(
    items: UserEntity[],
    filter: string | null
  ): Promise<UserEntity[]> {
    if (!filter) {
      return items;
    }
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
}

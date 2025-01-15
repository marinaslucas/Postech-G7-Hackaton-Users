import { Entity } from '../entities/entity';
import { RepositoryInterface } from './repositories-contracts';

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }
  async findById(id: string): Promise<E> {
    const _id = `${id}`;
    const item = this.items.find(item => item.id === _id);
    if (!item) {
      throw new Error('Entity not found');
    }
    return item;
  }
  async findAll(): Promise<E[]> {
    return this.items;
  }
  async update(entity: E): Promise<void> {
    this.items = this.items.map(item => {
      if (item.id === entity.id) {
        return entity;
      }
      return item;
    });
  }
  async delete(id: string): Promise<void> {
    this.items = this.items.filter(item => item.id !== id);
  }
}

import { Entity } from '../entities/entity';
import { InMemoryRepository } from './in-memory-repository';
import { SearchableRepositoryInterface } from './searchable-reposiroty-contract';

export abstract class SearchableInMemoryRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any>
{
  search(params: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

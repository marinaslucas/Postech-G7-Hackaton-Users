import { Entity } from '../entities/entity';
import { InMemoryRepository } from './in-memory-repository';
import {
  SearchableRepositoryInterface,
  SearchParams,
  SearchResult,
} from './searchable-repository-contract';

export abstract class SearchableInMemoryRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any, any>
{
  sortableFields: string[] = [];
  async search(params: SearchParams): Promise<SearchResult<E>> {
    const itemsFiltered = await this.applyFilter(this.items, params.filter);
    const itemsSorted = await this.applySort(
      itemsFiltered,
      params.sort,
      params.sortDir
    );
    const itemsPaginated = await this.applyPagination(
      itemsSorted,
      params.page,
      params.perPage
    );
    return new SearchResult({
      items: itemsPaginated,
      total: itemsPaginated.length,
      currentPage: params.page,
      perPage: params.perPage,
      sort: params.sort,
      sortDir: params.sortDir,
      filter: params.filter,
    });
  }

  protected abstract applyFilter(
    items: E[],
    filter: string | null
  ): Promise<E[]>;

  protected applySort(
    items: E[],
    sort: SearchParams['sort'] | null,
    sortDir: SearchParams['sortDir']
  ): Promise<E[]> {
    if (!sort || !this.sortableFields.includes(sort)) {
      return Promise.resolve(items);
    }
    return Promise.resolve(
      [...items].sort((entityA: E, entityB: E) => {
        if (entityA.props[sort] < entityB.props[sort]) {
          return sortDir === 'asc' ? -1 : 1;
        }
        if (entityA.props[sort] > entityB.props[sort]) {
          return sortDir === 'asc' ? 1 : -1;
        }
        return 0;
      })
    );
  }

  protected applyPagination(
    items: E[],
    page: SearchParams['page'],
    perPage: SearchParams['perPage']
  ): Promise<E[]> {
    const start = (page - 1) * perPage;
    const limit = start + perPage;
    return Promise.resolve(items.slice(start, limit));
  }
}

import { Entity } from '../entities/entity';
import { RepositoryInterface } from './repositories-contracts';

export type SortDirection = 'asc' | 'desc';

export type SearchProps<Filter = string> = {
  page?: number;
  perPage?: number;
  sort?: string | null;
  sortDir?: SortDirection | null;
  filter?: Filter | null;
};

export class SearchParams {
  protected _page: number;
  protected _perPage: number | null;
  protected _sort: string | null;
  protected _sortDir: SortDirection | null;
  protected _filter: string | null;

  constructor(props?: SearchProps) {
    this.page = props?.page;
    this.perPage = props?.perPage;
    this.sort = props?.sort;
    this.sortDir = props?.sortDir;
    this.filter = props?.filter;
  }

  get page() {
    return this._page;
  }

  private set page(value: number) {
    let pageValue = Number(value);
    if (Number.isNaN(pageValue)) {
      pageValue = 1;
    } else {
      pageValue = Math.abs(parseInt(pageValue.toFixed(0)));
    }
    this._page = pageValue;
  }

  get perPage() {
    return this._perPage;
  }

  private set perPage(value: number) {
    let pageSize = Number(value);
    if (Number.isNaN(pageSize)) {
      pageSize = 1;
    } else {
      pageSize = Math.abs(parseInt(pageSize.toFixed(0)));
    }
    this._perPage = pageSize;
  }

  get sort() {
    return this._sort;
  }

  private set sort(value: string | null) {
    let sortValue = value ? value.toString() : null;
    this._sort = sortValue;
  }

  get sortDir() {
    return this._sortDir;
  }

  private set sortDir(value: string | null) {
    if (!this.sort) {
      this._sortDir = null;
      return;
    }

    if (!value) {
      this._sortDir = 'desc';
      return;
    }

    const dir = value.toString().toLowerCase();
    this._sortDir = dir !== 'asc' && dir !== 'desc' ? 'desc' : dir;
  }

  get filter() {
    return this._filter;
  }

  private set filter(value: string | null) {
    let filterValue = value ? value.toString() : null;
    this._filter = filterValue;
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchInput,
  SearchOutput,
> extends RepositoryInterface<E> {
  search(props: SearchParams): Promise<SearchOutput>;
}

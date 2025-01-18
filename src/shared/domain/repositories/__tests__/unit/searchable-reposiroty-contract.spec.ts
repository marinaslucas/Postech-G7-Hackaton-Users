import { SearchParams } from '../../searchable-reposiroty-contract';

describe('SearchableRepositoryContract unit tests', () => {
  it('should be defined', () => {
    expect(true).toBeDefined();
  });
  describe('getters', () => {
    it('should return the page value if provided', () => {
      const specifiedPage = 2;
      const { page } = new SearchParams({ page: specifiedPage });
      expect(page).toBe(2);
    });
    it('should return the page value as 1 if not provided', () => {
      const sut = new SearchParams();
      const page = sut.page;
      expect(page).toBe(1);
    });
    it('should return the perPage value if provided', () => {
      const specifiedPerPage = 10;
      const { perPage } = new SearchParams({ perPage: specifiedPerPage });
      expect(perPage).toBe(10);
    });
    it('should return the perPage as 1 if not provided', () => {
      const { perPage } = new SearchParams();
      expect(perPage).toBe(1);
    });
    it('should return the sort value if provided', () => {
      const specifiedSort = 'name';
      const { sort } = new SearchParams({ sort: specifiedSort });
      expect(sort).toBe('name');
    });
    it('should return the sort value as null if not provided', () => {
      const { sort } = new SearchParams();
      expect(sort).toBeNull();
    });
    it('should return the sortDir value if sort and sordDir are provided', () => {
      const specifiedSortDir = 'asc';
      const { sortDir } = new SearchParams({
        sortDir: specifiedSortDir,
        sort: 'name',
      });
      expect(sortDir).toBe('asc');
    });
    it('should return the sortDir value as null if sort is not provided', () => {
      const { sortDir } = new SearchParams({ sortDir: 'desc' });
      expect(sortDir).toBeNull();
    });
    it('should return the sortDir value as desc if sortDir is not provided', () => {
      const { sortDir } = new SearchParams({ sort: 'name' });
      expect(sortDir).toBe('desc');
    });
    it('should return the filter value if provided', () => {
      const specifiedFilter = 'name';
      const { filter } = new SearchParams({ filter: specifiedFilter });
      expect(filter).toBe('name');
    });
    it('should return the filter value as null if not provided', () => {
      const { filter } = new SearchParams();
      expect(filter).toBeNull();
    });
  });
});

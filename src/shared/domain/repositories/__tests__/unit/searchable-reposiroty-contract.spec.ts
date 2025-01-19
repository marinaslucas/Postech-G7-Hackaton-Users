import { SearchParams } from '../../searchable-reposiroty-contract';

describe('SearchableRepositoryContract unit tests', () => {
  it('should be defined', () => {
    expect(true).toBeDefined();
  });
  describe('getters', () => {
    it('should return the page value if provided or not', () => {
      const sut = new SearchParams();
      expect(sut.page).toEqual(1);

      const params = [
        { page: null as any, expected: 1 },
        { page: undefined as any, expected: 1 },
        { page: '' as any, expected: 1 },
        { page: 'test' as any, expected: 1 },
        { page: 0, expected: 1 },
        { page: -1, expected: 1 },
        { page: 5.5, expected: 1 },
        { page: true, expected: 1 },
        { page: false, expected: 1 },
        { page: {}, expected: 1 },
        { page: 1, expected: 1 },
        { page: 2, expected: 2 },
      ];

      params.forEach(i => {
        expect(new SearchParams({ page: i.page }).page).toBe(i.expected);
      });
    });
    it('should return the perPage value if provided or not', () => {
      const params = [
        { perPage: null as any, expected: 15 },
        { perPage: undefined as any, expected: 15 },
        { perPage: '' as any, expected: 15 },
        { perPage: 'test' as any, expected: 15 },
        { perPage: 0, expected: 15 },
        { perPage: -1, expected: 15 },
        { perPage: 5.5, expected: 15 },
        { perPage: true, expected: 15 },
        { perPage: false, expected: 15 },
        { perPage: {}, expected: 15 },
        { perPage: 1, expected: 1 },
        { perPage: 2, expected: 2 },
        { perPage: 25, expected: 25 },
      ];
      params.forEach(i => {
        expect(new SearchParams({ perPage: i.perPage }).perPage).toBe(
          i.expected
        );
      });
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

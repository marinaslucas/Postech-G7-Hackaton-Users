import { UserRepository } from '../../domain/repositories/user.repository';
import { UserOutput, UserOutputMapper } from '../dtos/user-output';
import { UseCase as DefaultUseCase } from '../../../shared/application/providers/usecases/use-case';
import { SearchInput } from '../../../shared/application/dtos/search-input';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '../../../shared/application/dtos/pagination-output';

export namespace ListUsersUseCase {
  export type Input = SearchInput<string>;

  export type Output = PaginationOutput<UserOutput>;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      console.log('usecase input', input);
      const params = new UserRepository.SearchParams(input);
      console.log('usecase params', params);
      const searchResult = await this.userRepository.search(params);
      console.log('usecase searchResult', searchResult);
      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: UserRepository.SearchResult): Output {
      const items = searchResult.items.map(entity => {
        return UserOutputMapper.toOutput(entity);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }
}

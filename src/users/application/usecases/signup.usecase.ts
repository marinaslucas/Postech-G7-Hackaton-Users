import { UserEntity } from '../../../users/domain/entities/user.entity';
import { UserRepository } from '../../../users/domain/repositories/user.repository';
import { BadRequestError } from '../errors/bad-request-error';
import { HashProvider } from '../../../shared/application/providers/hash-provider';
import { Output } from '../dtos/user-output';

export namespace SignupUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export class UseCase {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider
    ) {}

    async execute(input: Input): Promise<Output> {
      const { email, password, name } = input;

      if (!email || !password || !name) {
        throw new BadRequestError('Input data not provided');
      }

      await this.userRepository.emailExists(email);

      const hashedPassword = await this.hashProvider.generateHash(password);

      const userEntity = new UserEntity(
        Object.assign(input, {
          password: hashedPassword,
        })
      );

      await this.userRepository.insert(userEntity);

      const insertedUserEntity = userEntity.toJson();
      return insertedUserEntity;
    }
  }
}

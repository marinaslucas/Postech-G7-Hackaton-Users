import { UserRepository } from '../../../users/domain/repositories/user.repository';
import { BadRequestError } from '../errors/bad-request-error';

export namespace GetUserUseCase {
    export type Input = {
        id: string;
    };

    export type Output = {
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt?: Date;
    };

    export class UseCase {
        constructor(
            private userRepository: UserRepository.Repository
        ) { }

        async execute(input: Input): Promise<Output> {
            const { id } = input;

            if (!id) {
                throw new BadRequestError('Input data not provided');
            }

            const userEntity = (await this.userRepository.findById(id)).toJson();

            return userEntity;
        }
    }
}

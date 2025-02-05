//processa o video
//faz o upload para o storage (ja tem aqui o usecase criado de upload)
//em caso de erro, envia notificação para o user

import { VideoRepository } from '../../domain/repositories/video.repository';
import { UseCase as DefaultUseCase } from '../../../shared/application/providers/usecases/use-case';

export namespace ProcessVideoUseCase {
  export class UseCase implements DefaultUseCase<void, void> {
    constructor(private videoRepository: VideoRepository.Repository) {}

    async execute() {
      throw new Error('Method not implemented.');
    }
  }
}

import { VideoRepository } from '../../domain/repositories/video.repository';
import { VideoOutput, VideoOutputMapper } from '../dtos/video-output';
import { BadRequestError } from '../../../shared/application/errors/bad-request-error';
import { UseCase as DefaultUseCase } from '../../../shared/application/providers/usecases/use-case';
import { VideoEntity } from '../../domain/entities/video.entity';
import { AuthService } from 'src/auth/infraestructure/auth.service';

export namespace UploadVideoUseCase {
  export type Input = {
    file: any
    jwtToken: string;
  };

  export type Output = VideoOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private videoRepository: VideoRepository.Repository,
      private authService: AuthService
    ) { }

    async execute(input: Input): Promise<Output> {
      console.log('UploadVideoUseCase.execute START...');
      const { file, jwtToken } = input;

      if (!file) {
        throw new BadRequestError('File is missing or invalid');
      }

      const decodedToken = await this.authService.decode(jwtToken);

      console.log('decodedToken', decodedToken);

      const videoEntity = new VideoEntity({
        title: file.filename,
        userEmail: 'marina3@me.com',
        base64: `data:video/mp4;base64,${file.file.toString('base64')}`,
        userId: '39f50baf-7c80-44fd-88ee-a7ab50dcf4a1',
        status: 'processing',
        createdAt: new Date(),
      });


      await this.videoRepository.insert(videoEntity);

      return this.toOutput(videoEntity);
    }

    private toOutput(entity: VideoEntity): VideoOutput {
      return VideoOutputMapper.toOutput(entity);
    }
  }
}

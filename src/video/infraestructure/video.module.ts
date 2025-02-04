import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { GoogleCloudStorageService } from '../../shared/infraestructure/storage/services/google-cloud-storage.service';
import { VideoRepository } from '../domain/repositories/video.repository';
import { DeleteStorageVideoUseCase } from '../application/usecases/processed/delete-processed-video.usecase';

@Module({
  imports: [],
  controllers: [VideoController],
  providers: [
    GoogleCloudStorageService,
    VideoRepository,
    DeleteStorageVideoUseCase,
  ],
})
export class VideoModule {}

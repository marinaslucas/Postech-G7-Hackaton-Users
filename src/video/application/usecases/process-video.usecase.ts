/* eslint-disable prettier/prettier */
import { VideoRepository } from '../../domain/repositories/video.repository';
import { UseCase as DefaultUseCase } from '../../../shared/application/providers/usecases/use-case';
import ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';
import archiver from 'archiver';
import { VideoOutput, VideoOutputMapper } from '../dtos/video-output';
import { NotFoundError } from '../../../shared/domain/errors/not-found-error';
import { GoogleCloudStorageService } from '../../../shared/infraestructure/storage/implementations/google-cloud-storage';
import { ServerError } from '../../../shared/domain/errors/server-error';

export namespace ProcessVideoUseCase {
  export type Input = {
    id: string;
  };

  export type Output = VideoOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private videoRepository: VideoRepository.Repository, private storageService: GoogleCloudStorageService) {}

    private createTempDir(id: string): string {
      console.log('ProcessVideoUseCase.createTempDir', id);
      const tempDir = path.join(process.cwd(), 'temp', id);
      
      console.log(`Attempting to create directory: ${tempDir} (length: ${tempDir.length})`);
      
      try {
        if (fs.existsSync(tempDir)) {
          console.log(`Directory already exists: ${tempDir}`);
        } else {
          fs.mkdirSync(tempDir, { recursive: true });
          console.log(`Created directory: ${tempDir}`);
        }
      } catch (error) {
        console.error(`Failed to create directory: ${tempDir}`, error);
        throw error; // Rethrow the error after logging it
      }
      
      return tempDir;
    }

    private async processVideo(videoPath: string, outputDir: string): Promise<string[]> {
      console.log('ProcessVideoUseCase.processVideo', videoPath, outputDir);
      
      return new Promise((resolve, reject) => {
        const screenshots: string[] = [];
        
        console.log(`Processing video at path: ${videoPath}`);
        console.log(`Output directory for screenshots: ${outputDir}`);
        
        ffmpeg(videoPath)
          .on('end', () => resolve(screenshots))
          .on('error', (err) => {
            console.error('FFmpeg error:', err);
            reject(err);
          })
          .on('progress', (progress) => {
            const screenshotPath = path.join(outputDir, `screenshot-${progress.frames}.png`);
            screenshots.push(screenshotPath);
          })
          .screenshots({
            count: 30,
            folder: outputDir,
            filename: 'screenshot-%i.png',
          });
      });
    }

    private async createZipFile(screenshots: string[], outputDir: string): Promise<string> {
      const zipPath = path.join(outputDir, 'screenshots.zip');
      const output = fs.createWriteStream(zipPath);
      const archive = archiver('zip', { zlib: { level: 9 } });

      return new Promise((resolve, reject) => {
        output.on('close', () => resolve(zipPath));
        archive.on('error', (err) => reject(err));

        archive.pipe(output);
        screenshots.forEach((screenshot) => {
          archive.file(screenshot, { name: path.basename(screenshot) });
        });
        archive.finalize();
      });
    }

    private cleanup(tempDir: string): void {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    }

    async execute(input: Input): Promise<Output> {
      const { id } = input;

      console.log('ProcessVideoUseCase.execute', input)

      const video = await this.videoRepository.findById(id);
      if (!video) {
        throw new NotFoundError('Video not found');
      }

      console.log('ProcessVideoUseCase.usecase video', video)

      const tempDir = this.createTempDir(id);
      console.log('ProcessVideoUseCase.usecase tempDir', tempDir)

      const videoPath = path.join(tempDir, 'video.mp4');
      console.log('ProcessVideoUseCase.usecase videoPath', videoPath)

      try {
        console.log('ProcessVideoUseCase.usecase start processing...')
        const videoBuffer = Buffer.from(video.base64, 'base64');
        console.log('ProcessVideoUseCase.usecase videoBuffer', videoBuffer)
        fs.writeFileSync(videoPath, videoBuffer);
       console.log('ProcessVideoUseCase.usecase writeFile')  
        const screenshots = await this.processVideo(videoPath, tempDir);

        console.log('ProcessVideoUseCase.usecase screenshots', screenshots)
        const zipPath = await this.createZipFile(screenshots, tempDir);

        console.log('ProcessVideoUseCase.usecase zipPath', zipPath)
        const zipUrl = await this.storageService.upload(zipPath, 'processed');

        console.log('ProcessVideoUseCase.usecase zipUrl', zipUrl)

        video.updateStatus('completed');
        video.updateVideoUrl(zipUrl);
        console.log('ProcessVideoUseCase.usecase video updated with zip url', video)

        await this.videoRepository.update(video);

        this.cleanup(tempDir);

        console.log('ProcessVideoUseCase.usecase completed')
        return VideoOutputMapper.toOutput(video);
      } catch (error) {
        //this.cleanup(tempDir);
        
        video.updateStatus('failed');
        await this.videoRepository.update(video);

        //ENVIAR MENSAGEM PARA CLIENTE

        throw new ServerError('Failed to process video');
      }
    }
  }
}


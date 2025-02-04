import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateVideoUseCase } from 'src/video/application/usecases/update-video';

export class UpdateVideoDto
  implements Omit<UpdateVideoUseCase.Input, 'id'>
{
  @ApiProperty({
    description: 'Status do vídeo',
  })
  @IsString()
  @IsNotEmpty()
  status: 'processing' | 'completed' | 'failed' | 'retrieved';

  @ApiProperty({
    description: 'ID do vídeo',
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}

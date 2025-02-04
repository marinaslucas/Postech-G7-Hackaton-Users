import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dtos/create-video.dto';
import { UpdateVideoDto } from './dtos/update-video.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }

  @Get()
  findAll() {
    return this.videoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }

//   @Post('video')
//   @UseGuards(AuthGuard('jwt'))
//   @UseInterceptors(FileInterceptor('file'))
//   async uploadVideo(@UploadedFile() file: Express.Multer.File, @Headers('authorization') authHeader: string) {
//     const jwtToken = authHeader.split(' ')[1]; // Extract the token from the Bearer scheme
//     //console.log('Received JWT Token:', jwtToken); // Log the token for debugging
    // return this.videoService.uploadVideo(file, jwtToken);
// }
}
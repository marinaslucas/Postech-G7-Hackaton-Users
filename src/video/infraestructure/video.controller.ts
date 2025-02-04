import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Inject,
    HttpCode,
    Query,
    Put,
    UseGuards,
  } from '@nestjs/common';
  import { DeleteProcessedVideoUseCase } from '../application/usecases/delete-processed-video.usecase';
  import { RetrieveProcessedVideoUseCase } from '../application/usecases/retrieve-processed-video.usecase';
  import { UploadProcessedVideoUseCase } from '../application/usecases/upload-processed-video.usecase';
  import { UploadVideoUseCase } from '../application/usecases/upload-video.usecase';
  import { ProcessVideoUseCase } from '../application/usecases/process-video.usecase';
  import { GetVideoUseCase } from '../application/usecases/get-video.usecase';
  import { UpdateVideoUseCase } from '../application/usecases/update-video';
  import { ListVideosUseCase } from '../application/usecases/list-videos.usecase';

  import { ListVideosDto } from './dtos/list-videos.dto';
  import { RetrieveProcessedVideoDto } from './dtos/retrieve-processed-video.dto';
  import { UpdateVideoDto } from './dtos/update-video.dto';
  import { UploadProcessedVideoDto } from './dtos/upload-processed-video.dto';
  import { UploadVideoDto } from './dtos/upload-video.dto';

  import {
    VideoCollectionPresenter,
    VideoPresenter,
  } from './presenters/video.presenter';
  import { VideoOutput } from '../application/dtos/video-output';
  import { AuthService } from '../../auth/infraestructure/auth.service';
  import { AuthGuard } from '../../auth/infraestructure/auth.guard';
  import {
    ApiBearerAuth,
    ApiResponse,
    ApiTags,
    getSchemaPath,
  } from '@nestjs/swagger';
  
  @ApiTags('Videos')
  @Controller('videos')
  export class VideosController {
    @Inject(DeleteProcessedVideoUseCase.UseCase) 
    private deleteProcessedVideoUseCase: DeleteProcessedVideoUseCase.UseCase;
  
    @Inject(RetrieveProcessedVideoUseCase.UseCase)
    private retrieveProcessedVideoUseCase: RetrieveProcessedVideoUseCase.UseCase;
  
    @Inject(UploadProcessedVideoUseCase.UseCase)
    private uploadProcessedVideoUseCase: UploadProcessedVideoUseCase.UseCase;
  
    @Inject(UploadVideoUseCase.UseCase)
    private uploadVideoUseCase: UploadVideoUseCase.UseCase;
  
    @Inject(UpdateUserUseCase.UseCase)
    private updateUserUseCase: UpdateUserUseCase.UseCase;
  
    @Inject(UpdatePasswordUseCase.UseCase)
    private updatePasswordUseCase: UpdatePasswordUseCase.UseCase;
  
    @Inject(DeleteUserUseCase.UseCase)
    private deleteUserUseCase: DeleteUserUseCase.UseCase;
  
    @Inject(AuthService)
    private authService: AuthService;
  
    static userToResponse(output: UserOutput) {
      return new UserPresenter(output);
    }
  
    static listUsersToResponse(output: ListUsersUseCase.Output) {
      return new UserCollectionPresenter(output);
    }
  
    @ApiResponse({
      status: 409,
      description: 'Conflito de e-mail',
    })
    @ApiResponse({
      status: 422,
      description: 'Corpo da requisição com dados inválidos',
    })
    @HttpCode(201)
    @Post()
    async create(@Body() signupDto: SignupDto) {
      const output = await this.signupUseCase.execute(signupDto);
      return UsersController.userToResponse(output);
    }
  
    @ApiResponse({
      status: 200,
      schema: {
        type: 'object',
        properties: {
          accessToken: {
            type: 'string',
          },
        },
      },
    })
    @ApiResponse({
      status: 422,
      description: 'Corpo da requisição com dados inválidos',
    })
    @ApiResponse({
      status: 404,
      description: 'E-mail não encontrado',
    })
    @ApiResponse({
      status: 400,
      description: 'Credenciais inválidas',
    })
    @HttpCode(200)
    @Post('login')
    async login(@Body() signinDto: SigninDto) {
      const output = await this.signinUseCase.execute(signinDto);
      const accessToken: { accessToken: string } =
        await this.authService.generateJwt(output.id);
      return accessToken;
    }
  
    @ApiBearerAuth()
    @ApiResponse({
      status: 200,
      description: 'User found',
      schema: {
        type: 'object',
        properties: {
          meta: {
            type: 'object',
            properties: {
              total: { type: 'number' },
              currentPage: { type: 'number' },
              lastPage: { type: 'number' },
              perPage: { type: 'number' },
            },
          },
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(UserPresenter) },
          },
        },
      },
    })
    @ApiResponse({
      status: 422,
      description: 'Parâmetros de consulta inválidos',
    })
    @ApiResponse({
      status: 401,
      description: 'Acesso não autorizado',
    })
    @UseGuards(AuthGuard)
    @Get()
    async search(@Query() searchParams: ListUsersDto) {
      const output = await this.listUsersUseCase.execute(searchParams);
      return UsersController.listUsersToResponse(output);
    }
  
    @ApiBearerAuth()
    @ApiResponse({
      status: 404,
      description: 'Id não encontrado',
    })
    @ApiResponse({
      status: 401,
      description: 'Acesso não autorizado',
    })
    @UseGuards(AuthGuard)
    @UseGuards(AuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const output = await this.getUserUseCase.execute({ id });
      return UsersController.userToResponse(output);
    }
  
    @ApiBearerAuth()
    @ApiResponse({
      status: 422,
      description: 'Corpo da requisição com dados inválidos',
    })
    @ApiResponse({
      status: 404,
      description: 'Id não encontrado',
    })
    @ApiResponse({
      status: 401,
      description: 'Acesso não autorizado',
    })
    @UseGuards(AuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      const output = await this.updateUserUseCase.execute({
        id,
        ...updateUserDto,
      });
      return UsersController.userToResponse(output);
    }
  
    @ApiBearerAuth()
    @ApiResponse({
      status: 422,
      description: 'Corpo da requisição com dados inválidos',
    })
    @ApiResponse({
      status: 404,
      description: 'Id não encontrado',
    })
    @ApiResponse({
      status: 401,
      description: 'Acesso não autorizado',
    })
    @UseGuards(AuthGuard)
    @Patch(':id')
    async updatePassword(
      @Param('id') id: string,
      @Body() updatePasswordDto: UpdatePasswordDto
    ) {
      const output = await this.updatePasswordUseCase.execute({
        id,
        ...updatePasswordDto,
      });
      return UsersController.userToResponse(output);
    }
  
    @ApiBearerAuth()
    @ApiResponse({
      status: 204,
      description: 'Resposta de confirmação da exclusão',
    })
    @ApiResponse({
      status: 404,
      description: 'Id não encontrado',
    })
    @ApiResponse({
      status: 401,
      description: 'Acesso não autorizado',
    })
    @UseGuards(AuthGuard)
    @HttpCode(204)
    @Delete(':id')
    async remove(@Param('id') id: string) {
      await this.deleteUserUseCase.execute({ id });
    }
  }
  

//   @Post('video')
//   @UseGuards(AuthGuard('jwt'))
//   @UseInterceptors(FileInterceptor('file'))
//   async uploadVideo(@UploadedFile() file: Express.Multer.File, @Headers('authorization') authHeader: string) {
//     const jwtToken = authHeader.split(' ')[1]; // Extract the token from the Bearer scheme
//     //console.log('Received JWT Token:', jwtToken); // Log the token for debugging
    // return this.videoService.uploadVideo(file, jwtToken);
// }
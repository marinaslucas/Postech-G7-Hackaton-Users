import { UpdatePasswordUseCase } from '../../application/usecases/update-password.usecase';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto
  implements Omit<UpdatePasswordUseCase.Input, 'id'>
{
  @ApiProperty({
    description: 'Senha atual do usuário',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Nova senha do usuário',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

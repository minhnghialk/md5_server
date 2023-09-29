import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Allow, IsEmail, IsBoolean, IsEnum } from 'class-validator';
import { UserRole, UserStatus } from '../users.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Allow()
  avatar?: string;
  @IsEmail()
  email?: string;
  @IsBoolean()
  emailAuthentication?: boolean;
  @Allow()
  firstName?: string;
  @Allow()
  lastName?: string;
  @Allow()
  userName?: string;
  @Allow()
  password?: string;
  @IsEnum({ type: 'enum', enum: UserRole, default: UserRole.MEMBER })
  role?: UserRole;
  @IsEnum({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status?: UserStatus;
}

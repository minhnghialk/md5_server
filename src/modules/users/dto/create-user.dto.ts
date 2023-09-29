import { Allow, IsEmail } from 'class-validator';
export class CreateUserDto {
  @Allow()
  firstName: string;

  @Allow()
  lastName: string;

  @Allow()
  userName: string;

  @IsEmail()
  email: string;

  @Allow()
  password: string;
}

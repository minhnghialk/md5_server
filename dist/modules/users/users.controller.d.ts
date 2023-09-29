import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response, Request } from 'express';
import { MailService } from '../mailes/mail.service';
import { JwtService } from '../jwts/jwt.service';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class UsersController {
    private readonly usersService;
    private readonly mail;
    private readonly jwt;
    constructor(usersService: UsersService, mail: MailService, jwt: JwtService);
    changePassword(changePasswordDto: ChangePasswordDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    resetPassword(resetPasswordDto: ResetPasswordDto, res: Response): Promise<Response<any, Record<string, any>>>;
    authenticationResetPassword(token: string, res: Response): Promise<Response<any, Record<string, any>>>;
    authenticationChangePassword(token: string, res: Response): Promise<Response<any, Record<string, any>>>;
    emailAuthentication(userId: string, token: string, res: Response): Promise<Response<any, Record<string, any>>>;
    resendEmail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    login(loginDto: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    register(createUserDto: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
}

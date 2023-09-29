import { AuthenticationService } from './authentication.service';
import { UsersService } from './../users/users.service';
import { AuthenticationDto } from './dto/authentication.dto';
import { Response } from 'express';
import { JwtService } from '../jwts/jwt.service';
export declare class AuthenticationController {
    private readonly authenticationService;
    private readonly usersService;
    private readonly jwt;
    constructor(authenticationService: AuthenticationService, usersService: UsersService, jwt: JwtService);
    memberAuthentication(authenticationDto: AuthenticationDto, res: Response): Promise<Response<any, Record<string, any>>>;
}

export declare class JwtService {
    createToken(data: any, time: string): string | false;
    verifyToken(token: string): any;
}

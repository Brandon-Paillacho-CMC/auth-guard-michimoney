import { CanActivate, ExecutionContext } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
export declare const AUTH_CONFIG_TOKEN = "AuthConfigToken";
interface AuthConfig {
    introspectionUrl: string;
    clientId: string;
    clientSecret: string;
}
export declare class AuthGuard implements CanActivate {
    private http;
    private config;
    constructor(http: HttpService, config: AuthConfig);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
export {};

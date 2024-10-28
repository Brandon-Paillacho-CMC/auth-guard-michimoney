import { DynamicModule } from '@nestjs/common';
import { AuthConfig } from './auth-config.dto';
export declare class AuthGuardModule {
    static register(authConfig: AuthConfig): DynamicModule;
}

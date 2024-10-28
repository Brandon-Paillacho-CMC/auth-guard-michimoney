// auth-guard.module.ts
import { Module, DynamicModule, Provider } from '@nestjs/common';
import { AUTH_CONFIG_TOKEN, AuthGuard } from './auth-guard.service';
import { HttpModule } from '@nestjs/axios';
import { AuthConfig } from './auth-config.dto';

@Module({
  imports: [HttpModule],
  providers: [AuthGuard],
  exports: [AuthGuard, HttpModule, AUTH_CONFIG_TOKEN],
})
export class AuthGuardModule {
  static register(authConfig: AuthConfig): DynamicModule {
    const authConfigProvider: Provider = {
      provide: AUTH_CONFIG_TOKEN,
      useValue: authConfig,
    };

    return {
      module: AuthGuardModule,
      imports: [HttpModule],
      providers: [authConfigProvider, AuthGuard],
      exports: [AuthGuard, HttpModule, AUTH_CONFIG_TOKEN],
    };
  }
}

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom, throwError } from "rxjs";
import { Request } from "express";

export const AUTH_CONFIG_TOKEN = "AuthConfigToken";

interface AuthConfig {
  introspectionUrl: string;
  clientId: string;
  clientSecret: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private http: HttpService,
    @Inject(AUTH_CONFIG_TOKEN) private config: AuthConfig
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new HttpException("No token enviado", HttpStatus.UNAUTHORIZED);
    }
    try {
      const params = new URLSearchParams();
      params.append("client_secret", this.config.clientSecret);
      params.append("client_id", this.config.clientId);
      params.append("token", token);
      const res = await firstValueFrom(
        this.http.post(this.config.introspectionUrl, params).pipe(
          catchError((error: any) => {
            if (error.response?.data?.error) {
              return throwError(
                () =>
                  new HttpException(
                    "No autorizado, token invalido",
                    HttpStatus.UNAUTHORIZED
                  )
              );
            }
            console.log(error);
            return throwError(
              () =>
                new HttpException(
                  `Error: ${JSON.stringify(error.response?.data)}`,
                  HttpStatus.UNAUTHORIZED
                )
            );
          })
        )
      );

      if (!res.data.active) {
        throw new HttpException("Token no valido", HttpStatus.FORBIDDEN);
      }

      return true;
    } catch (error) {
      // Lanza el error capturado con su código de estado correspondiente
      if (error instanceof HttpException) {
        throw error;
      }
      // Error inesperado de autorización
      throw new HttpException(
        "Error inesperado de autorización",
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}

// auth-config.dto.ts
export class AuthConfig {
  introspectionUrl: string;
  clientId: string;
  clientSecret: string;
  constructor(introspectionUrl: string, clientId: string, clientSecret: string) {
    this.introspectionUrl = introspectionUrl;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }
}
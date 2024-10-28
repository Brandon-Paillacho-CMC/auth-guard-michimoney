"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthConfig = void 0;
// auth-config.dto.ts
class AuthConfig {
    constructor(introspectionUrl, clientId, clientSecret) {
        this.introspectionUrl = introspectionUrl;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }
}
exports.AuthConfig = AuthConfig;

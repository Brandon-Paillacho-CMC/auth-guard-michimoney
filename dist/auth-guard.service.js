"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = exports.AUTH_CONFIG_TOKEN = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
exports.AUTH_CONFIG_TOKEN = "AuthConfigToken";
let AuthGuard = class AuthGuard {
    constructor(http, config) {
        this.http = http;
        this.config = config;
    }
    canActivate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = context.switchToHttp().getRequest();
            const token = this.extractTokenFromHeader(request);
            if (!token) {
                throw new common_1.HttpException("No token enviado", common_1.HttpStatus.UNAUTHORIZED);
            }
            try {
                const params = new URLSearchParams();
                params.append("client_secret", this.config.clientSecret);
                params.append("client_id", this.config.clientId);
                params.append("token", token);
                const res = yield (0, rxjs_1.firstValueFrom)(this.http.post(this.config.introspectionUrl, params).pipe((0, rxjs_1.catchError)((error) => {
                    var _a, _b;
                    if ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) {
                        return (0, rxjs_1.throwError)(() => new common_1.HttpException("No autorizado, token invalido", common_1.HttpStatus.UNAUTHORIZED));
                    }
                    console.log(error);
                    return (0, rxjs_1.throwError)(() => {
                        var _a;
                        return new common_1.HttpException(`Error: ${JSON.stringify((_a = error.response) === null || _a === void 0 ? void 0 : _a.data)}`, common_1.HttpStatus.UNAUTHORIZED);
                    });
                })));
                if (!res.data.active) {
                    throw new common_1.HttpException("Token no valido", common_1.HttpStatus.FORBIDDEN);
                }
                return true;
            }
            catch (error) {
                // Lanza el error capturado con su código de estado correspondiente
                if (error instanceof common_1.HttpException) {
                    throw error;
                }
                // Error inesperado de autorización
                throw new common_1.HttpException("Error inesperado de autorización", common_1.HttpStatus.UNAUTHORIZED);
            }
        });
    }
    extractTokenFromHeader(request) {
        var _a, _b;
        const [type, token] = (_b = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")) !== null && _b !== void 0 ? _b : [];
        return type === "Bearer" ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(exports.AUTH_CONFIG_TOKEN)),
    __metadata("design:paramtypes", [axios_1.HttpService, Object])
], AuthGuard);

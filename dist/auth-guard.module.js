"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthGuardModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuardModule = void 0;
// auth-guard.module.ts
const common_1 = require("@nestjs/common");
const auth_guard_service_1 = require("./auth-guard.service");
const axios_1 = require("@nestjs/axios");
let AuthGuardModule = AuthGuardModule_1 = class AuthGuardModule {
    static register(authConfig) {
        const authConfigProvider = {
            provide: auth_guard_service_1.AUTH_CONFIG_TOKEN,
            useValue: authConfig,
        };
        return {
            module: AuthGuardModule_1,
            imports: [axios_1.HttpModule],
            providers: [authConfigProvider, auth_guard_service_1.AuthGuard],
            exports: [auth_guard_service_1.AuthGuard, axios_1.HttpModule, auth_guard_service_1.AUTH_CONFIG_TOKEN],
        };
    }
};
exports.AuthGuardModule = AuthGuardModule;
exports.AuthGuardModule = AuthGuardModule = AuthGuardModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [auth_guard_service_1.AuthGuard],
        exports: [auth_guard_service_1.AuthGuard, axios_1.HttpModule, auth_guard_service_1.AUTH_CONFIG_TOKEN],
    })
], AuthGuardModule);

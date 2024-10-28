# auth-guard-michimoney

Instalar el paquete

```bash
npm i auth-guard-michimoney
```

Configurar el modulo

```ts
import { HttpModule } from '@nestjs/axios';
import { AuthGuardModule } from 'auth-guard-michimoney';
import { AuthConfig } from 'auth-guard-michimoney/dist/auth-config.dto';
@Module({
  imports: [
    //Otros modulos
    HttpModule,
    AuthGuardModule.register({
      introspectionUrl: 'url',
      clientId: 'clientid',
      clientSecret: 'clientSecret',
    } as AuthConfig), // Proporciona la configuración aquí
  ],
})
```

Utilizar el guard personalizado

```ts
import { AuthGuard } from 'auth-guard-michimoney';
@UseGuards(AuthGuard)
```

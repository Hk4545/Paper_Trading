import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupModule } from './signup/signup.module';
import { LoginModule } from './login/login.module';
import { JwtModule } from '@nestjs/jwt';
import { OrderController } from './order/order.controller';
import * as dotenv from 'dotenv';
dotenv.config();
// import { Order } from './order/order';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
import { StockinfoModule } from './stockinfo/stockinfo.module';
import * as crypto from 'crypto';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO), SignupModule, LoginModule
    , JwtModule.registerAsync({
      useFactory: () => ({
          secret: crypto.randomBytes(32).toString('hex'),
          signOptions: { expiresIn:'30d'},
        }),
    }), OrderModule, StockinfoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}

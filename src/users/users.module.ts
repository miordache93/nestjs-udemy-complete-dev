import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';


@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
  ],
  imports: [
    TypeOrmModule.forFeature([User])
  ]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}

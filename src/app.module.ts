import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/Tasks', {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    TasksModule,
    AuthModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
})
export class AppModule {}

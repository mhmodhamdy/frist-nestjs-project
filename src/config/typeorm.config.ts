import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TaskEntity } from 'src/tasks/task.entity';
import { UserEntity } from 'src/auth/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb://localhost/Tasks',
  useUnifiedTopology: true,
  entities: [UserEntity, TaskEntity],
  synchronize: true,
};

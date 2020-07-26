import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task.module';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  status: TaskStatus;
}
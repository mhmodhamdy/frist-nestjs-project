import { BaseEntity, Entity, PrimaryColumn, Column } from 'typeorm';
import { TaskStatus } from './task.module';

@Entity()
export class TaskEntity extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus, Task } from './task.module';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task')
    private taskModel: Model<Task>,
  ) // @InjectRepository(TaskRepository)
  // private taskRepository: TaskRepository,
  {}

  async getAllTasks(): Promise<Task[]> {
    return await this.taskModel.find();
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskModel.findById(id);
    if (!found) {
      throw new NotFoundException('The task with the given id was not found');
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, status } = createTaskDto;
    const task = new this.taskModel({
      title,
      description,
      status,
    });
    await task.save();
    return task;
  }

  async deleteTask(id: string): Promise<Task> {
    const task = await this.taskModel.findByIdAndDelete(id);
    if (!task) {
      throw new NotFoundException('The task with the given id was not found');
    }
    return task;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}

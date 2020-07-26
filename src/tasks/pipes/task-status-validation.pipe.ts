import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task.module';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value} is an invalid status"`);
    }
    return value;
  }
  isStatusValid(status: any) {
    const indx = this.allowedStatuses.indexOf(status);
    return indx !== -1;
  }
}

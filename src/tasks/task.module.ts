import * as mongoose from 'mongoose';

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  status: {
    type: TaskStatus,
    default: 'OPEN',
  },
});

export interface Task extends mongoose.Document {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  status: TaskStatus;
}

// using decotators

// import { Document, Mongoose } from 'mongoose';
// import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

// @Schema()
// export class TaskSchema extends Document {
//   @Prop()
//   title: {
//     type: string;
//     required: true;
//     minlength: 3;
//     maxlength: 255;
//   };

//   @Prop()
//   description: {
//     type: string;
//     required: true;
//     minlength: 3;
//     maxlength: 255;
//   };

//   @Prop()
//   status: {
//     type: TaskStatus;
//     default: 'OPEN';
//   };
// }

// export const taskSchema = SchemaFactory.createForClass(TaskSchema);

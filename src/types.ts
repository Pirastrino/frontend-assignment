import z from 'zod';
import {taskData as taskDataValidationSchema} from './validations';

export type TaskFormData = z.infer<typeof taskDataValidationSchema>;

export type Task = Required<TaskFormData> & {
  id: number;
  completed: boolean;
};

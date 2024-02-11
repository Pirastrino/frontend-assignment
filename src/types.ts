import z from 'zod';
import {loginData, taskData} from './validations';

export type Task = Required<TaskFormData> & {
  id: number;
  completed: boolean;
};

export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
};

export type TaskFormData = z.infer<typeof taskData>;
export type LoginFormData = z.infer<typeof loginData>;

import z from 'zod';

export const taskData = z.object({
  name: z.string().min(3, 'Task name must be at least 3 characters'),
  description: z.string().optional(),
});

export const loginData = z.object({
  username: z.string(),
  password: z.string(),
});

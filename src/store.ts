import {persistentAtom} from '@nanostores/persistent';

import {Task} from './types';

export const $tasks = persistentAtom<Task[]>('todos', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const addTask = (task: Task) => {
  $tasks.set([...$tasks.get(), task]);
};

export const removeTask = (id: Task['id']) => {
  $tasks.set($tasks.get().filter((task) => task.id !== id));
};

export const toggleTaskCompleted = (id: Task['id']) => {
  $tasks.set(
    $tasks.get().map((task) => {
      if (task.id === id) {
        return {...task, completed: !task.completed};
      }
      return task;
    })
  );
};

export const updateTask = (id: Task['id'], task: Task) => {
  $tasks.set(
    $tasks.get().map((t) => {
      if (t.id === id) {
        return task;
      }
      return t;
    })
  );
};

export const getTask = (id?: Task['id']) => $tasks.get().find((task) => task.id === id);

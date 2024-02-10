import {useState} from 'react';
import {Link as ReactRouterLink} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {
  Button,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';

import {Layout, Task as TaskItem} from '../components';
import {formatDate} from '../utils';

import logoBg from '../assets/logo-bg.svg';
import {Task} from '../types';

const tasks: Task[] = [
  {
    id: 1,
    name: 'Task 1',
    description: 'Description 1',
    completed: false,
  },
  {
    id: 2,
    name: 'Task 2',
    description: 'Description 2',
    completed: true,
  },
  {
    id: 3,
    name: 'Task 3',
    description: 'Description 3',
    completed: false,
  },
  {
    id: 4,
    name: 'Task 4',
    description: 'Description 4',
    completed: true,
  },
];

export const Welcome = () => {
  // TODO: Replace with local storage
  const [store, setStore] = useState(tasks);
  const {t} = useTranslation();

  const name = 'Anette';
  const welcome = `${t('overview.hello')} ${name}!`;

  const todo = store.filter((task) => !task.completed);
  const done = store.filter((task) => task.completed);

  const allDone = todo.length === 0;

  const toggleCompleted = (id: Task['id']) => () =>
    setStore((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return {...task, completed: !task.completed};
        }
        return task;
      })
    );

  return (
    <Layout>
      <CardHeader>
        <Flex>
          <VStack align="start">
            <Heading size="md">{welcome}</Heading>
            <Text color="text-secondary">{formatDate(new Date())}</Text>
          </VStack>
          <Spacer />
          <Button>
            <Link as={ReactRouterLink} to="/new_task" w="full">
              {t('overview.btn.addTask')}
            </Link>
          </Button>
        </Flex>
      </CardHeader>
      <CardBody>
        {allDone && (
          <VStack>
            <Image src={logoBg} alt="Logo" />
            <Heading size="md">{t('overview.title')}</Heading>
            <Text variant="secondary">{t('overview.noMoreTasks')}</Text>
          </VStack>
        )}
        <VStack>
          {!allDone && (
            <VStack w="full" align="left" spacing={4}>
              <Heading size="md">{t('overview.todo.title')}</Heading>
              <Divider />
              {todo.map((taskData) => (
                <TaskItem
                  {...taskData}
                  key={`task-${taskData.id}`}
                  onChange={toggleCompleted(taskData.id)}
                />
              ))}
            </VStack>
          )}
          {done.length > 0 && (
            <VStack w="full" align="left" pt="2.5rem">
              <Heading size="md">{t('overview.done.title')}</Heading>
              <Divider />
              {done.map((taskData) => (
                <TaskItem
                  {...taskData}
                  key={`task-${taskData.id}`}
                  onChange={toggleCompleted(taskData.id)}
                />
              ))}
            </VStack>
          )}
        </VStack>
      </CardBody>
    </Layout>
  );
};

export default Welcome;

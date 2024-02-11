import {useTranslation} from 'react-i18next';
import {useStore} from '@nanostores/react';
import {Link as ReactRouterLink} from 'react-router-dom';
import {
  Button,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';

import {Layout, Task as TaskItem} from '../components';
import {$tasks, $user, toggleTaskCompleted} from '../stores';
import {formatDate} from '../utils';
import {MISSING_TEXT} from '../constants';

import {ReactComponent as IconAdd} from '../assets/icons/icon-add.svg';
import logoBg from '../assets/logo-bg.svg';

export const Welcome = () => {
  const {t} = useTranslation();
  const user = useStore($user);
  const tasks = useStore($tasks);

  const todo = tasks.filter(({userId, completed}) => user?.id === userId && !completed);
  const done = tasks.filter(({userId, completed}) => user?.id === userId && completed);

  const welcome = `${t('overview.hello')} ${user?.firstName ?? MISSING_TEXT}!`;

  const allDone = todo.length === 0;

  return (
    <Layout>
      <CardHeader>
        <Flex>
          <VStack align="start">
            <Heading size="md">{welcome}</Heading>
            <Text color="text-secondary">{formatDate(new Date())}</Text>
          </VStack>
          <Spacer />
          <Button
            as={ReactRouterLink}
            to="/new_task"
            rightIcon={<Icon as={IconAdd} fill="text-white" />}
          >
            {t('overview.btn.addTask')}
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
                  onChange={() => toggleTaskCompleted(taskData.id)}
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
                  onChange={() => toggleTaskCompleted(taskData.id)}
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

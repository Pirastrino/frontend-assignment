import {Link as ReactRouterLink} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {
  Button,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
  Link,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';

import {Layout} from '../components';
import {formatDate} from '../utils';

import logoBg from '../assets/logo-bg.svg';

export const Welcome = () => {
  const {t} = useTranslation();
  const name = 'Anette';
  const welcome = `${t('overview.hello')} ${name}!`;

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
        <VStack>
          <Image src={logoBg} alt="Logo" />
          <Heading size="md">{t('overview.title')}</Heading>
          <Text variant="secondary">{t('overview.noMoreTasks')}</Text>
        </VStack>
        <VStack align="left">
          <div>To-Do Placeholder</div>
          <div>Done Placeholder</div>
        </VStack>
      </CardBody>
    </Layout>
  );
};

export default Welcome;

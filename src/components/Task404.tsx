import {Link as ReactRouterLink} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Button, Heading, Icon, Image, VStack} from '@chakra-ui/react';

import Layout from './Layout';

import {ReactComponent as IconForward} from '../assets/icons/icon-forward.svg';
import logoBg from '../assets/logo-bg.svg';

const Task404 = () => {
  const {t} = useTranslation();

  return (
    <Layout>
      <VStack spacing={8} textAlign="center">
        <Image src={logoBg} alt="Logo" />
        <Heading size="md">{t('task404.title')}</Heading>
        <Button
          as={ReactRouterLink}
          to="/overview"
          leftIcon={<Icon as={IconForward} transform="rotate(180deg)" fill="text-white" />}
        >
          {t('task404.btn.back')}
        </Button>
      </VStack>
    </Layout>
  );
};

export default Task404;

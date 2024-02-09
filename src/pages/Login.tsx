import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Button, CardBody, CardFooter, CardHeader, Heading, Text, VStack} from '@chakra-ui/react';

import {Layout, FormInput} from '../components';

const Login: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isLogged = true; // replace with actual login fn

    if (isLogged) {
      console.log('logged in');
      return navigate('/overview');
    }
  };

  return (
    <Layout maxW={560}>
      <CardHeader>
        <VStack spacing="6" align="left">
          <Heading size="md">{t('login.title')}</Heading>
          <Text color="text-secondary">{t('login.description')}</Text>
        </VStack>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardBody>
          <VStack>
            <FormInput id="name" name="name" label="Username" required />
            <FormInput id="password" name="password" label="Password" type="password" required />
          </VStack>
        </CardBody>
        <CardFooter>
          <Button type="submit" width="full">
            {t('login.submit')}
          </Button>
        </CardFooter>
      </form>
    </Layout>
  );
};

export default Login;

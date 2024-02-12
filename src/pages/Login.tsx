import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Button, CardBody, CardFooter, CardHeader, Heading, Text, VStack} from '@chakra-ui/react';

import {useForm} from '../hooks';
import {Layout, FormInput} from '../components';
import {loginData} from '../validations';
import {login} from '../api/login';
import {INVALID_CREDENTIALS} from '../constants';

const Login: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {
    values,
    errors,
    setErrors,
    handleChange,
    handleSubmit: submit,
  } = useForm({
    validationSchema: loginData,
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = submit((data) =>
    login(data, {
      onSuccess: () => navigate('/overview'),
      onError: (error?: Error) => {
        setErrors({
          username: error?.message ?? INVALID_CREDENTIALS,
          password: '',
        });
      },
    })
  );

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
            <FormInput
              id="username"
              name="username"
              label="Username"
              required
              value={values.username}
              errorMessage={errors.username}
              onChange={handleChange}
              autoFocus={values.username.length === 0 || errors.username.length > 0}
            />
            <FormInput
              id="password"
              name="password"
              label="Password"
              type="password"
              required
              value={values.password}
              errorMessage={errors.password}
              onChange={handleChange}
            />
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

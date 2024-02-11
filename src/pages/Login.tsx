import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Button, CardBody, CardFooter, CardHeader, Heading, Text, VStack} from '@chakra-ui/react';

import {useForm} from '../hooks';
import {Layout, FormInput} from '../components';
import {loginData} from '../validations';
import {INVALID_CREDENTIALS} from '../constants';

const Login: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {values, errors, setErrors, handleChange, handleSubmit} = useForm({
    validationSchema: loginData,
    initialValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: typeof values) => {
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const response = await res.json();
        if (!res.ok) {
          return setErrors({
            username: response?.message ?? INVALID_CREDENTIALS,
            password: '',
          });
        }
        navigate('/overview');
      })
      .then(console.log);
  };

  return (
    <Layout maxW={560}>
      <CardHeader>
        <VStack spacing="6" align="left">
          <Heading size="md">{t('login.title')}</Heading>
          <Text color="text-secondary">{t('login.description')}</Text>
        </VStack>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
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

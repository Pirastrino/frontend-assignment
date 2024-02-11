import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Helmet} from 'react-helmet-async';
import {Box, Card, CardProps, Container} from '@chakra-ui/react';

import TopBar from './TopBar';
import {$user} from '../stores';
import {validateToken} from '../api/login';

type Props = CardProps & {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({children, ...cardProps}) => {
  const {i18n, t} = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: implement token expiration so that it does not tries to validate token on every page load
    const token = $user.get()?.token;

    validateToken(token, {
      onError: () => {
        navigate('/login');
      },
    });
  }, []);

  return (
    <>
      <Helmet
        titleTemplate={`%s - ${t('app.title')}`}
        defaultTitle={t('app.title')}
        htmlAttributes={{lang: i18n.language}}
      >
        <meta name="description" content={t('app.description')} />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
      </Helmet>
      <Box height="100vh" width="100wv" bgColor="fill-gray">
        <Container maxW="1360px" px={{base: '.5rem', md: '2.5rem'}}>
          {/* TODO: only for logged in users */}
          <TopBar />
          <Card variant="unstyled" w="full" bgColor="fill-white" margin="auto" {...cardProps}>
            {children}
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Layout;

import {useTranslation} from 'react-i18next';
import {Helmet} from 'react-helmet-async';
import {Box, Card, CardProps, Container} from '@chakra-ui/react';

type Props = CardProps & {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({children, ...cardProps}) => {
  const {i18n, t} = useTranslation();

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
          <Card variant="unstyled" w="full" bgColor="fill-white" margin="auto" {...cardProps}>
            {children}
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Layout;

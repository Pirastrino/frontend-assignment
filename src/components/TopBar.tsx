import {useTranslation} from 'react-i18next';
import {useLocation} from 'react-router-dom';
import {Box, Flex, Heading, HStack, Icon, Image, Spacer, Text} from '@chakra-ui/react';

import logo from '../assets/logo.svg';
import {$user} from '../stores';
import {MISSING_TEXT} from '../constants';

const TopBar = () => {
  const {t} = useTranslation();
  const {pathname} = useLocation();
  const user = $user.get();
  const name = user ? `${user.firstName} ${user.lastName}` : MISSING_TEXT;

  return (
    <Flex h={{base: 'topbar.base', md: 'topbar.md'}} alignItems="center">
      <HStack margin="auto">
        <Image boxSize="topbar.logo-boxSize" src={logo} alt="Logo" />
        <Heading color="fill-darkBlue" size="sm">
          {t('app.name')}
        </Heading>
      </HStack>
      {pathname !== '/login' && (
        <>
          <Spacer />
          <HStack>
            <Image
              boxSize={{base: '2.5rem', md: '1.5rem'}}
              src={user?.image}
              alt="Profile picture"
            />
            <Text display={{base: 'none', md: 'block'}}>{name}</Text>
          </HStack>
        </>
      )}
    </Flex>
  );
};

export default TopBar;

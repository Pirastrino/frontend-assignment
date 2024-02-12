import {useTranslation} from 'react-i18next';
import {useLocation, Link as ReactRouterLink} from 'react-router-dom';
import {useStore} from '@nanostores/react';
import {Flex, Heading, HStack, Image, Link, Spacer, Text} from '@chakra-ui/react';

import UserMenu from './UserMenu';
import logo from '../assets/logo.svg';
import {$user} from '../stores';
import {MISSING_TEXT} from '../constants';

const TopBar = () => {
  const {t} = useTranslation();
  const {pathname} = useLocation();
  const user = useStore($user);
  const name = user ? `${user.firstName} ${user.lastName}` : MISSING_TEXT;

  const isLoginPage = pathname === '/login';

  return (
    <Flex h={{base: 'topbar.base', md: 'topbar.md'}} alignItems="center">
      <Link
        as={ReactRouterLink}
        to={isLoginPage ? '/login' : '/overview'}
        _hover={{textDecoration: 'none'}}
        margin="auto"
      >
        <HStack>
          <Image boxSize="topbar.logo-boxSize" src={logo} alt="Logo" />
          <Heading color="fill-darkBlue" size="sm">
            {t('app.name')}
          </Heading>
        </HStack>
      </Link>
      {!isLoginPage && (
        <>
          <Spacer />
          <UserMenu>
            <HStack>
              <Image
                boxSize={{base: '2.5rem', md: '1.5rem'}}
                src={user?.image}
                alt="Profile picture"
              />
              <Text display={{base: 'none', md: 'block'}}>{name}</Text>
            </HStack>
          </UserMenu>
        </>
      )}
    </Flex>
  );
};

export default TopBar;

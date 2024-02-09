import {useTranslation} from 'react-i18next';
import {Box, Flex, Heading, HStack, Icon, Image, Spacer, Text} from '@chakra-ui/react';

import logo from '../assets/logo.svg';
import {ReactComponent as IconUser} from '../assets/icons/icon-user.svg';

const TopBar = () => {
  const {t} = useTranslation();

  const user = 'Anette Black'; // TBD: replace with logged in user

  return (
    <Flex h={{base: 'topbar.base', md: 'topbar.md'}} alignItems="center">
      <HStack>
        <Image boxSize="topbar.logo-boxSize" src={logo} alt="Logo" />
        <Heading color="fill-darkBlue" size="sm">
          {t('app.name')}
        </Heading>
      </HStack>
      <Spacer />
      <HStack>
        <Box
          display="flex"
          borderRadius="full"
          bgColor="fill-brand"
          boxSize={{base: '2.5rem', md: '1.5rem'}}
        >
          <Icon as={IconUser} fill="fill-white" margin="auto" />
        </Box>
        <Text display={{base: 'none', md: 'block'}}>{user}</Text>
      </HStack>
    </Flex>
  );
};

export default TopBar;

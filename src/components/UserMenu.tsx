import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Menu, MenuButton, MenuItem, MenuList} from '@chakra-ui/react';
import React from 'react';

import {$tasks, $user} from '../stores';
import {useStore} from '@nanostores/react';

type Props = {
  children: React.ReactNode;
};

const UserMenu: React.FC<Props> = ({children}) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const user = useStore($user);
  const tasks = useStore($tasks);

  const clearAll = () => {
    $tasks.set(tasks.filter((task) => task.userId !== user?.id));
  };

  const clearCompleted = () => {
    $tasks.set(tasks.filter((task) => task.userId !== user?.id || !task.completed));
  };

  const logout = () => {
    $user.set(null);
    navigate('/login');
  };

  return (
    <Menu>
      <MenuButton>{children}</MenuButton>
      <MenuList>
        <MenuItem onClick={clearAll}>{t('userMenu.clearAll')}</MenuItem>
        <MenuItem onClick={clearCompleted}>{t('userMenu.clearCompleted')}</MenuItem>
        <MenuItem color="text-danger" onClick={logout}>
          {t('userMenu.logout')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;

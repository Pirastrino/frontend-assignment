import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Icon, IconButton, Menu, MenuButton, MenuItem, MenuList} from '@chakra-ui/react';

import {Task} from '../types';
import {removeTask} from '../stores';

import {ReactComponent as IconMore} from '../assets/icons/icon-more.svg';
import {ReactComponent as IconEdit} from '../assets/icons/icon-edit.svg';
import {ReactComponent as IconDelete} from '../assets/icons/icon-delete.svg';

type Props = {
  id: Task['id'];
};

const TaskMenu: React.FC<Props> = ({id}) => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  return (
    <Menu>
      <MenuButton>
        <IconButton
          aria-label="Task menu"
          variant="ghost"
          icon={<Icon as={IconMore} transform="rotate(180deg)" fill="text-primary" />}
        />
      </MenuButton>
      <MenuList>
        <MenuItem
          icon={<Icon as={IconEdit} fill="fill-darkBlue" boxSize={4} display="flex" />}
          onClick={() => navigate(`/task/${id}`)}
        >
          {t('taskMenu.edit')}
        </MenuItem>
        <MenuItem
          icon={<Icon as={IconDelete} fill="text-danger" boxSize={4} display="flex" />}
          color="text-danger"
          onClick={() => removeTask(id)}
        >
          {t('taskMenu.delete')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default TaskMenu;

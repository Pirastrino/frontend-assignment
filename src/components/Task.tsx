import {Checkbox, Heading, HStack, Spacer, Text, VStack} from '@chakra-ui/react';

import TaskMenu from './TaskMenu';
import {Task as TaskType} from '../types';

import {ReactComponent as IconCheck} from '../assets/icons/icon-check.svg';

type Props = TaskType & {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Task: React.FC<Props> = ({id, name, description, completed, onChange}) => (
  <HStack>
    <VStack align="left" w="full">
      <HStack spacing={4}>
        <Checkbox isChecked={completed} icon={<IconCheck fill="white" />} onChange={onChange} />
        <Heading as="h3" fontSize="lg">
          {name}
        </Heading>
        <Spacer />
        <TaskMenu id={id} />
      </HStack>
      <Text variant="tertiary" pl={12}>
        {description}
      </Text>
    </VStack>
  </HStack>
);

export default Task;

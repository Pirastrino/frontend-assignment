import {
  Box,
  Checkbox,
  HStack,
  VStack,
  Heading,
  Icon,
  Text,
  IconButton,
  Spacer,
} from '@chakra-ui/react';

import {Task as TaskType} from '../types';

import {ReactComponent as IconMore} from '../assets/icons/icon-more.svg';
import {ReactComponent as IconCheck} from '../assets/icons/icon-check.svg';

type Props = TaskType & {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Task: React.FC<Props> = ({name, description, completed, onChange}) => {
  const ast = false;
  return (
    <HStack>
      <VStack align="left" w="full">
        <HStack spacing={4}>
          <Checkbox isChecked={completed} icon={<IconCheck fill="white" />} onChange={onChange} />
          <Heading as="h3" fontSize="lg">
            {name}
          </Heading>
          <Spacer />
          <IconButton
            aria-label="Back"
            variant="ghost"
            icon={<Icon as={IconMore} transform="rotate(180deg)" fill="text-primary" />}
          />
        </HStack>
        <Text variant="tertiary" pl={12}>
          {description}
        </Text>
      </VStack>
    </HStack>
  );
};

export default Task;

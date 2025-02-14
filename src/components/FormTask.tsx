import {useTranslation} from 'react-i18next';
import {Link as ReactRouterLink} from 'react-router-dom';
import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Spacer,
  VStack,
} from '@chakra-ui/react';

import FormInput from './FormInput';
import {TaskFormData} from '../types';

import {ReactComponent as IconForward} from '../assets/icons/icon-forward.svg';

type Props = {
  title: string;
  submitLabel: string;
  discardLabel: string;
  values: TaskFormData;
  errors: TaskFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
};

const FormTask: React.FC<Props> = ({
  title,
  submitLabel,
  discardLabel,
  values,
  errors,
  onChange,
  onSubmit,
  onReset,
}) => {
  const {t} = useTranslation();
  const {name, description} = values;

  return (
    <>
      <CardHeader>
        <HStack spacing={6}>
          <Link as={ReactRouterLink} to="/overview">
            <IconButton
              aria-label="Back"
              variant="ghost"
              icon={<Icon as={IconForward} transform="rotate(180deg)" fill="text-primary" />}
            />
          </Link>
          <Heading size="md">{title}</Heading>
        </HStack>
      </CardHeader>
      <form onSubmit={onSubmit} onReset={onReset}>
        <CardBody>
          <VStack spacing={6} w="full">
            <FormInput
              name="name"
              label={t('formTask.label.name')}
              required
              value={name}
              onChange={onChange}
              errorMessage={errors.name}
              autoFocus={name.length === 0 || errors.name.length > 0}
            />
            <FormInput
              name="description"
              label={t('formTask.label.description')}
              type="textarea"
              value={description}
              onChange={onChange}
            />
          </VStack>
        </CardBody>
        <CardFooter>
          <Flex w="full">
            <Button type="reset" variant="ghost">
              {discardLabel}
            </Button>
            <Spacer />
            <Button type="submit">{submitLabel}</Button>
          </Flex>
        </CardFooter>
      </form>
    </>
  );
};

export default FormTask;

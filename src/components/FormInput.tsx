import {useState} from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Text,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';

import {ReactComponent as IconShow} from '../assets/icons/icon-show.svg';
import {ReactComponent as IconHide} from '../assets/icons/icon-hide.svg';

type Props<T> = (T extends 'textarea' ? TextareaProps : InputProps) & {
  label: string;
  type?: T;
  required?: boolean;
  helperText?: string;
  errorMessage?: string;
};

const FormInput = <T extends 'textarea' | InputProps['type']>({
  label,
  type = 'text',
  required = false,
  helperText,
  errorMessage = '',
  ...rest
}: Props<T>) => {
  const [isHidden, setIsHidden] = useState(true);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const borderColor = errorMessage ? 'border-danger' : undefined; // default border color is defined in the theme

  return (
    <FormControl isInvalid={errorMessage.length > 0}>
      <FormLabel>
        {required && (
          <Text as="span" color="text-danger" marginRight="0.25rem">
            *
          </Text>
        )}
        {label}
      </FormLabel>
      {type === 'textarea' ? (
        <Textarea {...(rest as TextareaProps)} borderColor={borderColor} />
      ) : (
        <InputGroup>
          <Input
            {...(rest as InputProps)}
            type={type === 'password' && !isHidden ? 'text' : type}
            borderColor={borderColor}
          />
          {type === 'password' && (
            <InputRightElement>
              <Icon
                as={isHidden ? IconShow : IconHide}
                fill="fill-darkBlue"
                cursor="pointer"
                onClick={toggleHidden}
              />
            </InputRightElement>
          )}
        </InputGroup>
      )}
      {/* FormErrorMessage is visible only when FormControl.isInvalid is true */}
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default FormInput;

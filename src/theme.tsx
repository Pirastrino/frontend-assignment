import {extendTheme} from '@chakra-ui/react';
import defaultTheme from '@chakra-ui/theme';

import type {StyleFunctionProps} from '@chakra-ui/theme-tools';

const {components} = defaultTheme;

const fonts = {
  body: 'Inter, sans-serif',
  heading: 'Inter, sans-serif',
};

const fontSizes = {
  heading: {
    1: '28px',
    2: '24px',
    3: '20px',
  },
  text: {
    base: '16px',
    small: '14px',
  },
};

const fontWeights = {
  heading: {
    1: 700,
    2: 600,
    3: 500,
  },
  text: {
    base: 400,
    alternative: 500,
  },
};

const input = {
  border: '1px solid',
  borderColor: 'border-gray',
  borderRadius: 'base',
  _hover: {
    borderColor: 'border-brand',
  },
  _focus: {
    borderColor: 'border-brand',
    boxShadow: '0px 0px 0px 4px var(--chakra-colors-border-shadow)',
  },
};

const theme = extendTheme({
  config: {initialColorMode: 'light', useSystemColorMode: false},
  colors: {
    'text-primary': '#001141',
    'text-secondary': '#4D5667',
    'text-tertiary': '#7A869A',
    'text-white': '#FFFFFF',
    'text-danger': '#B71C1C',

    'fill-brand': '#0F62FE',
    'fill-brand-hover': '#0043CE',
    'fill-darkBlue': '#001141',
    'fill-gray': '#F1F2F6',
    'fill-gray-hover': '#E6E8EF',
    'fill-gray-lightest': '#F1F2F6',
    'fill-white': '#FFFFFF',

    'border-brand': '#0F62FE',
    'border-gray': '#CAD1DE',
    'border-danger': '#E32C1E',
    'border-shadow': 'rgba(15, 98, 254, 0.2)', // transparentize from @chakra-ui/theme-tools is deprecated
  },
  sizes: {
    ...defaultTheme.sizes,
    topbar: {
      base: '5.5rem',
      md: '7rem',
      'logo-boxSize': '2rem',
    },
  },
  components: {
    Text: {
      baseStyle: {
        color: 'text-primary',
      },
      variants: {
        secondary: {
          color: 'text-secondary',
        },
        tertiary: {
          color: 'text-tertiary',
        },
      },
    },
    Heading: {
      baseStyle: {
        color: 'text-primary',
      },
    },
    Button: {
      baseStyle: {
        ...components.Button.baseStyle,
        bg: 'unset',
        backgroundColor: 'fill-brand',
        fontWeight: 'normal',
        color: 'text-white',
        borderRadius: 'full',
        padding: '0.375rem 1.25rem',
        _hover: {
          ...components.Button.baseStyle?._hover,
          bg: 'unset',
          backgroundColor: 'fill-brand-hover',
        },
        _active: {
          bg: 'unset',
          backgroundColor: 'fill-brand-hover',
        },
      },
      variants: {
        ghost: {
          ...components.Button.variants?.ghost,
          backgroundColor: 'fill-gray',
          _hover: {
            backgroundColor: 'fill-gray-hover',
          },
          _active: {
            backgroundColor: 'fill-gray-hover',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        ...components.Card.baseStyle,
        container: {
          ...components.Card.baseStyle?.container,
          borderRadius: '1.5rem',
          padding: {base: '1.5rem', md: '2.5rem'},
        },
        body: {
          ...components.Card.baseStyle?.header,
          paddingTop: {base: '1.5rem', md: '2.5rem'},
        },
        footer: {
          ...components.Card.baseStyle?.footer,
          paddingTop: {base: '1.5rem', md: '2.5rem'},
        },
      },
    },
    Checkbox: {
      baseStyle: (props: StyleFunctionProps) => ({
        ...components.Checkbox.baseStyle,
        control: {
          ...components.Checkbox.baseStyle?.(props).control,
          boxSize: '2rem',
          borderRadius: 'full',
          borderColor: 'border-gray',
          _hover: {
            boxShadow: '0px 0px 0px 4px var(--chakra-colors-border-shadow)',
          },
          _checked: {
            ...components.Checkbox.baseStyle?.(props).control?._checked,
            borderColor: 'border-brand',
            backgroundColor: 'fill-brand',
            _hover: {
              borderColor: 'border-brand',
              backgroundColor: 'fill-brand',
            },
          },
        },
      }),
    },
    FormLabel: {
      baseStyle: {
        color: 'text-secondary',
        fontSize: 'small',
      },
    },
    FormHelperText: {
      baseStyle: {
        color: 'text-tertiary',
        fontSize: 'small',
      },
    },
    Input: {
      baseStyle: {
        field: {
          ...defaultTheme.components.Input.baseStyle?.field,
          px: defaultTheme.space[4],
          py: defaultTheme.space[3],
        },
      },
      variants: {
        outline: (props: StyleFunctionProps) => ({
          ...defaultTheme.components.Input.variants?.outline,
          field: {
            ...defaultTheme.components.Input.variants?.outline(props).field,
            ...input,
          },
        }),
      },
    },
    Menu: {
      ...defaultTheme.components.Menu.baseStyle?.button,
      baseStyle: {
        ...defaultTheme.components.Menu.baseStyle,
        item: {
          ...defaultTheme.components.Menu.baseStyle?.item,
          height: '2.25rem',
          color: 'text-primary',
          _hover: {
            backgroundColor: 'fill-gray-lightest',
          },
        },
      },
    },
    Textarea: {
      baseStyle: {
        ...defaultTheme.components.Textarea.baseStyle,
        px: defaultTheme.space[4],
        py: defaultTheme.space[4],
      },
      variants: {
        outline: (props: StyleFunctionProps) => ({
          ...defaultTheme.components.Textarea.variants?.outline(props),
          ...input,
        }),
      },
    },
  },
  fonts,
  fontSizes,
  fontWeights,
});

export default theme;

import React from 'react';
import {ChakraProvider, extendTheme, Box, Heading} from '@chakra-ui/react';
import Dashboard from './views/Dashboard';
import {createRoot} from 'react-dom/client';
import NewtonProvider from './components/newton/NewtonProvider';
// @ts-ignore
import * as views from './views/**/*.tsx';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: 'gray.700'
      }
    }
  },

  fonts: {
    body: '"Poppins", system-ui, sans-serif',
    heading: '"Poppins", system-ui, sans-serif',
  },

  components: {
    Heading: {
      variant: {
        primary: {
          fontWeight: 'semibold',
          bgColor: 'gray.700',
          color: 'white',
          p: 6,
          rounded: 'md'
        },
      },
      sizes: {
        md: {
          fontWeight: 500
        }
      }
    }
  }
});

const Error404 = () => (
  <Box textAlign="center">
    <Heading>Not Found</Heading>
  </Box>
);

const onComponentRequest = (component: string) => {
  const view = component.split('/')
    .reduce((acc, chunk) => acc[chunk], views).default;

  return view ?? Error404;
};

createRoot(document.getElementById('app') ?? document.body)
  .render((
    <ChakraProvider theme={theme}>
      <NewtonProvider
        resolver={onComponentRequest}
        home={'Dashboard'}
      />
    </ChakraProvider>
  ));

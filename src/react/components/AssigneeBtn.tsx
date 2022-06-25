import {Box, ChakraComponent, ChakraProps} from '@chakra-ui/react';
import React from 'react';

const AssigneeBtn: ChakraComponent<"div", {name: string}> = ({name, ...props}) => {
  return (
    <Box
      bg="gray.200"
      cursor="pointer"
      w="100%"
      textAlign="center"
      py={4}
      rounded="md"
      {...props}
    >
        {name}
    </Box>
  );
};

export default AssigneeBtn;

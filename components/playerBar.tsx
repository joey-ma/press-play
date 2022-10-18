import { Box, Flex, Text } from '@chakra-ui/layout';

export default function PlayerBar() {
  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="0.25em">
      <Flex align="center">
        <Box padding="0.25em 1em" color="white" width="30%">
          <Text fontSize="large">song name</Text>
          <Text fontSize="sm">artist name</Text>
        </Box>
        <Box width="40%" display="flex" justifyContent="center">
          Controls
        </Box>
        <Box
          padding="0.25em 1em"
          color="white"
          display="flex"
          justifyContent="flex-end"
          width="30%"
        >
          More
        </Box>
      </Flex>
    </Box>
  );
}

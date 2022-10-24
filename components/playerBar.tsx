import { Box, Flex, Text } from '@chakra-ui/layout';
import { useStoreState } from 'easy-peasy';
import React from 'react';
import Player from './player';

export default function PlayerBar() {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useStoreState((state: any) => state.activeSong);

  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="0.25em">
      <Flex align="center">
        <Box padding="0.25em 1em" color="white" width="30%">
          {activeSong && (
            <React.Fragment>
              <Text fontSize="large">{activeSong.name}</Text>
              <Text fontSize="sm">{activeSong.artist.name}</Text>
            </React.Fragment>
          )}
        </Box>

        <Box width="40%" display="flex" justifyContent="center">
          {activeSong && (
            <Player songs={songs} activeSong={activeSong}></Player>
          )}
        </Box>
        <Box
          color="gray.600"
          padding="0.25em 1em"
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

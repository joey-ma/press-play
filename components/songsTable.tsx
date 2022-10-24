import { Box } from '@chakra-ui/layout';
import { Table, Thead, Td, Th, Tr, Tbody, IconButton } from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { formatTime } from '../lib/formatter';
import { useStoreActions } from 'easy-peasy';

const SongsTable = ({ songs }: any) => {
  const setActiveSongs = useStoreActions(
    (store: any) => store.changeActiveSongs
  );
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);

  function handlePlay(activeSong?: 'string') {
    setActiveSong(activeSong || songs[0]);
    setActiveSongs(songs);
  }

  return (
    <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
        <Box marginLeft="1em" marginBottom="1.5em">
          {/* Play Button */}
          <IconButton
            aria-label="press-play"
            icon={<BsFillPlayFill fontSize="30px" />}
            colorScheme="green"
            size="lg"
            isRound
            onClick={() => handlePlay()}
          />
        </Box>
        <Table variant="unstyled">
          <Thead borderBottom="1px solid rgba(255,255,255,0.1)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
              <Th verticalAlign="middle">
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs?.map((song: any, i: number) => (
              <Tr
                sx={{
                  transition: 'all .3s ',
                  '&:hover': { bg: 'rgba(255,255,255,0.1)' },
                }}
                key={song.id}
                cursor="pointer"
                onClick={() => handlePlay(song)}
              >
                <Td>{i + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{song.createdAt}</Td>
                {/* <Td>{song.createdAt.slice(0, song.createdAt.indexOf('T'))}</Td> */}
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SongsTable;

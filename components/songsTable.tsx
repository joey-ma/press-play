import { Box } from '@chakra-ui/layout';
import { Table, Thead, Td, Th, Tr, Tbody, IconButton } from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { formatTime } from '../lib/formatter';
import { useStoreActions } from 'easy-peasy';
import { useStoreState } from 'easy-peasy';
import { shuffle } from '../lib/mutations';

const SongsTable = ({ songs }: any) => {
  // props: songs -> playlist.songs
  console.log('props received in songs table, songs:', songs);

  const [activeSong, setActiveSong] = [
    useStoreState((store: any) => store.activeSong),
    useStoreActions((store: any) => store.changeActiveSong),
  ];
  const [activeSongs, setActiveSongs] = [
    useStoreState((store: any) => store.activeSongs),
    useStoreActions((store: any) => store.changeActiveSongs),
  ];
  const [isShuffling, setIsShuffling] = [
    useStoreState((state: any) => state.isShuffling),
    useStoreActions((store: any) => store.changeIsShuffling),
  ];
  const [shuffledPlaylistSongs, setShuffledPlaylistSongs] = [
    useStoreState((store: any) => store.shuffledPlaylistSongs),
    useStoreActions((store: any) => store.changeShuffledPlaylistSongs),
  ];

  function handlePlay(activeSong?: any) {
    console.log(
      'handle play -> activeSong:',
      activeSong, // undefined at first
      'isShuffling',
      isShuffling
    );

    // set active songs as ordered songs from playlist
    setActiveSongs(songs);

    if (isShuffling) {
      const shuffledSongs = shuffle(songs);
      console.log(
        `🚀 -> file: songsTable.tsx:40 -> handlePlay -> shuffledSongs`,
        shuffledSongs
      );
      setActiveSong(activeSong || shuffledSongs[0]);
      setShuffledPlaylistSongs(shuffledSongs);
    } else {
      setActiveSongs(songs);
      setActiveSong(activeSong || songs[0]);
    }
  }

  // set ordered playlist songs in store to the currently selected playlist (on load)
  // setOrderedPlaylistSongs(songs);

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
                onClick={() => {
                  // console.log('current song:', song, 'setting active song');
                  handlePlay(song);
                }}
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

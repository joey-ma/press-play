import {
  Box,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Text,
} from '@chakra-ui/react';
import ReactHowler from 'react-howler';
import { useEffect, useRef, useState } from 'react';
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from 'react-icons/md';
import { useStoreActions } from 'easy-peasy';

export default function Player({ songs, activeSong }: any) {
  const [isPlaying, setIsPlaying] = useState(activeSong ? true : false);
  console.log(
    `🚀 -> file: player.tsx -> line 27 -> Player -> isPlaying`,
    isPlaying
  );
  const [index, setIndex] = useState(0);
  // start playing the 1st song in the playlist, or the index of active song
  const [isSeeking, setIsSeeking] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(false);

  // keep track of:
  // shuffle state: true or false
  // repeat state: true or false
  // current song playing
  // current duration
  // location of play/pause
  // did player load?
  // did song load?

  function handleClick() {
    setIsPlaying((prev) => !prev);
    // set time of pause
  }
  return (
    <Box color="gray.600">
      <Box>
        <ReactHowler playing={isPlaying} src={activeSong?.url} />
      </Box>
      <Center>
        <ButtonGroup>
          <IconButton
            color={shuffle ? 'white' : 'gray.600'}
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            onClick={() => setShuffle((prevState) => !prevState)}
            icon={<MdShuffle />}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="previous"
            fontSize="24px"
            icon={<MdSkipPrevious />}
          />
          {isPlaying ? (
            <IconButton
              outline="none"
              variant="link"
              aria-label="pause"
              fontSize="24px"
              onClick={() => setIsPlaying((prevState) => !prevState)}
              icon={<MdOutlinePauseCircleFilled />}
            />
          ) : (
            <IconButton
              outline="none"
              variant="link"
              aria-label="play"
              fontSize="24px"
              onClick={() => setIsPlaying((prevState) => !prevState)}
              icon={<MdOutlinePlayCircleFilled />}
            />
          )}
          <IconButton
            outline="none"
            variant="link"
            aria-label="next"
            fontSize="24px"
            icon={<MdSkipNext />}
          />
          <IconButton
            color={repeat ? 'white' : 'gray.600'}
            outline="none"
            variant="link"
            aria-label="repeat"
            fontSize="24px"
            onClick={() => setRepeat((prevState) => !prevState)}
            icon={<MdOutlineRepeat />}
          />
        </ButtonGroup>
      </Center>
      <Box>
        <Flex justify="center" align="center">
          <Box width="10%" textAlign="left">
            <Text>1:22</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              aria-label={['min', 'max']}
              step={0.1}
              min={0}
              max={321}
              id="player-range-slider"
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.500" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text id="song-duration" fontSize="xs">
              321
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

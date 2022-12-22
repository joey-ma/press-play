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
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useEffect, useRef, useState } from 'react';
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from 'react-icons/md';
import { formatTime } from '../lib/formatter';
import { shuffle } from '../lib/mutations';

export default function PlayerControls({ songs, activeSong }: any) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(activeSong ? true : false);
  // start playing the 1st song in the playlist, or the index of active song
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  const [duration, setDuration] = useState<number>(0.0);
  const playerRef = useRef<any>(null); // <any> fixes the error "Property does not exist on type 'never'"

  const [isShuffling, setIsShuffling] = [
    useStoreState((state: any) => state.isShuffling),
    useStoreActions((store: any) => store.changeIsShuffling),
  ];

  // activeSong passed down as props from playerBar.tsx
  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong);

  const [activeSongs, setActiveSongs] = [
    useStoreState((state: any) => state.activeSongs),
    useStoreActions((store: any) => store.changeActiveSongs),
  ];

  const [shuffledPlaylistSongs, setShuffledPlaylistSongs] = [
    useStoreState((state: any) => state.shuffledPlaylistSongs),
    useStoreActions((store: any) => store.changeShuffledPlaylistSongs),
  ];

  // in order to update the seek (dot) on range slider
  // using requestAnimationFrame to produce smooth motion
  // stops when items in dependency array changes (stops playing || user seeking)
  useEffect(() => {
    let timerId: any;

    if (isPlaying && !isSeeking) {
      const f = () => {
        // sets seek, then recursively calls itself to continually animate smoothly while setting seek
        setSeek(playerRef.current.seek());
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }

    cancelAnimationFrame(timerId);
  }, [isPlaying, isSeeking]);

  useEffect(() => {
    console.log('isShuffling:', isShuffling, 'current index:', index);
    console.log(`activeSongs:`, activeSongs, 'vs songs:', songs);

    setActiveSong(songs[index]);
  }, [index, setActiveSong, songs]);

  // several things to keep track of:
  // shuffle state: true or false
  // repeat state: true or false
  // current song playing
  // current duration
  // location of play/pause
  // did player load?
  // did song load?

  function prevSong() {
    // gist
    setIndex((prevIndex) => (prevIndex ? prevIndex - 1 : songs.length - 1));
    // if (isRepeating)
    //   setIndex((prevIndex) =>
    //     prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    //   );
    // else {
    //   if (index === 0) setSeek(0);
    //   setIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
    // }
  }

  function nextSong() {
    setIndex((prevIndex) => (prevIndex <= songs.length ? prevIndex + 1 : 0));
    // gist
    if (isShuffling) {
      setActiveSong(shuffledPlaylistSongs[index]);
    } else {
      setActiveSong(songs[index]);
    }
    // if (isRepeating) {
    //   setIndex((prevIndex: number) => {
    //     return prevIndex === songs.length - 1 ? 0 : prevIndex + 1;
    //   });
    // } else {
    //   setIndex((prevIndex: number) => {
    //     if (prevIndex === songs.length - 1) {
    //       setIsPlaying(false);
    //       setSeek(0);
    //       return prevIndex;
    //     } else {
    //       return prevIndex + 1;
    //     }
    //   });
    // }
    // setIndex((prevIndex: any) => {
    //   if (isShuffling) {
    //     const next = Math.floor(Math.random() * songs.length);
    //     if (next === prevIndex) {
    //       return nextSong();
    //     } else {
    //       return prevIndex === songs.length - 1 ? 0 : prevIndex + 1;
    //     }
    //   }
    // });
  }

  function onEnd() {
    // with repeat on
    if (isRepeating) {
      playerRef.current.seek(0);
      setSeek(0);
      // if (playerRef !== undefined) playerRef.current.seek(0);
    } else {
      nextSong();
    }
  }

  function onLoad() {
    const songDuration = playerRef.current.duration();
    setDuration(songDuration);
  }

  function onSeek(e: any) {
    setSeek(parseFloat(e[0]));
    // working with an array: unique to range component from chakra-ui (related to its min, max capability)
    playerRef.current.seek(e[0]);
  }

  function handleShuffle() {
    setIsShuffling();
    const shuffledSongs = shuffle(songs);
    if (!isShuffling) setShuffledPlaylistSongs(shuffledSongs);
  }

  function handleClick() {
    setIsPlaying((prev) => !prev);
    // set time of pause
  }

  return (
    <Box color="gray.600">
      <Box>
        <ReactHowler
          playing={isPlaying}
          src={activeSong?.url}
          ref={playerRef}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      </Box>
      <Center flexDirection="column">
        <ButtonGroup>
          <IconButton
            color={isShuffling ? 'white' : 'gray.600'}
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            onClick={handleShuffle}
            icon={<MdShuffle />}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="previous"
            fontSize="24px"
            icon={<MdSkipPrevious />}
            onClick={prevSong}
          />
          {/* Play / Pause Button */}
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
            onClick={nextSong}
          />
          <IconButton
            color={isRepeating ? 'white' : 'gray.600'}
            outline="none"
            variant="link"
            aria-label="repeat"
            fontSize="24px"
            onClick={() => setIsRepeating((prevState) => !prevState)}
            icon={<MdOutlineRepeat />}
          />
        </ButtonGroup>
        <Box height="50px" width="30em">
          <Flex justify="center" align="center">
            <Box width="10%" textAlign="left">
              <Text>{formatTime(seek)}</Text>
            </Box>
            <Box width="50%">
              <RangeSlider
                aria-label={['min', 'max']}
                id="player-range-slider"
                step={0.1}
                min={0}
                max={duration ? (duration.toFixed(2) as unknown as number) : 0}
                onChange={onSeek}
                value={[seek]}
                onChangeStart={() => setIsSeeking(true)}
                onChangeEnd={() => setIsSeeking(false)}
              >
                <RangeSliderTrack bg="gray.800">
                  <RangeSliderFilledTrack bg="gray.500" />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
              </RangeSlider>
            </Box>
            <Box width="10%" textAlign="right">
              <Text id="song-duration">{formatTime(duration)}</Text>
            </Box>
          </Flex>
        </Box>
      </Center>
    </Box>
  );
}

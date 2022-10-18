import NextImage from 'next/image';
import NextLink from 'next/link';
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  Center,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/layout';
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from 'react-icons/md';
import { GiDuck } from 'react-icons/gi';
import { BsSpeakerFill } from 'react-icons/bs';
import { usePlaylist } from '../lib/hooks';

const navMenu = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/',
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search',
  },
  {
    name: 'Your Library',
    icon: MdLibraryMusic,
    route: '/library',
  },
  {
    name: 'Playing on...',
    icon: BsSpeakerFill,
    route: '/device',
  },
];

const musicMenu = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/',
  },
  {
    name: 'Favorites',
    icon: MdFavorite,
    route: '/favorites',
  },
  {
    name: 'Your Library',
    icon: MdLibraryMusic,
    route: '/library',
  },
  {
    name: 'Playing on...',
    icon: BsSpeakerFill,
    route: '/device',
  },
];

const Sidebar = () => {
  const { playlistMenu } = usePlaylist();

  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px">
        <Box>
          {/* App Logo v1: Ducky! */}
          {/* <Box
            id="app-logo"
            // bg="gray.200"
            // color="black"
            fontWeight={600}
            display="flex"
            alignItems="center"
            gap={5}
            marginBottom="20px"
            paddingX="25px"
          >
            <GiDuck size="4em" />
            Player for Life
          </Box> */}
          {/* App Logo v2: Slide */}
          <Box
            id="app-logo"
            color="gray.500"
            fontWeight={600}
            display="flex"
            alignItems="center"
            gap={5}
            marginBottom="20px"
            paddingX="25px"
          >
            Player for Life
            <NextImage
              src="/playground-svg.svg"
              style={{
                filter:
                  // close enough to gray.500,
                  // without bringing in `npm install --save-dev babel-plugin-inline-react-svg` just for this
                  'invert(72%) sepia(0%) saturate(372%) hue-rotate(145deg) brightness(90%) contrast(84%)',
              }}
              height={60}
              width={60}
            />
          </Box>
          {/* Nav Menu */}
          <Box id="nav-menu">
            <List spacing={2}>
              {navMenu.map((menu) => (
                <ListItem
                  paddingX="20px"
                  fontSize="16px"
                  key={menu.name}
                  alignItems="center"
                >
                  <LinkBox>
                    <NextLink href={menu.route} passHref>
                      <LinkOverlay display="flex" alignItems="center">
                        <ListIcon
                          as={menu.icon}
                          color="white"
                          marginRight="20px"
                        />
                        <span>{menu.name}</span>
                      </LinkOverlay>
                    </NextLink>
                  </LinkBox>
                </ListItem>
              ))}
            </List>
          </Box>
          <Divider
            color="transparent"
            // color="gray.800"
            marginY="15px"
          />
          {/* Music Menu */}
          <Box id="music-menu">
            <List spacing={2}>
              {musicMenu.map((menu) => (
                <ListItem
                  paddingX="20px"
                  fontSize="16px"
                  key={menu.name}
                  alignItems="center"
                >
                  <LinkBox>
                    <NextLink href={menu.route} passHref>
                      <LinkOverlay display="flex" alignItems="center">
                        <ListIcon
                          as={menu.icon}
                          color="white"
                          marginRight="20px"
                        />
                        <span>{menu.name}</span>
                      </LinkOverlay>
                    </NextLink>
                  </LinkBox>
                </ListItem>
              ))}
            </List>
          </Box>
          {/* Playlist Menu */}

          <Divider color="gray.800" marginY="20px" />
          <Box id="playlist-menu" marginBottom="20px" overflow="auto">
            {/* height="240px" */}
            <List spacing={2}>
              {playlistMenu.map((playlist: any) => (
                <ListItem
                  paddingX="20px"
                  fontSize="16px"
                  key={playlist.id}
                  alignItems="center"
                >
                  <LinkBox>
                    <NextLink
                      href={{
                        pathname: '/playlist/[id]',
                        query: { id: playlist.id },
                      }}
                      passHref
                    >
                      <LinkOverlay display="flex" alignItems="center">
                        <ListIcon
                          as={playlist.icon}
                          color="white"
                          marginRight="20px"
                        />
                        <span>{playlist.name}</span>
                      </LinkOverlay>
                    </NextLink>
                  </LinkBox>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;

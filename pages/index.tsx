import { FC } from 'react';
// import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import GradientLayout from '../components/gradientLayout';
import prisma from '../lib/prisma';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import { useMe } from '../lib/hooks';
import { formatDate } from '../lib/formatter';

interface HomeProps {
  artists?: {
    id: number | null;
    createdAt: any | null;
    updatedAt: any | null;
    name: string | null;
    songs: string[] | null;
  }[];
}

const Home: FC<HomeProps> = ({ artists }) => {
  const { user } = useMe();
  // todo: more isLoading & error handling

  // todo: not entirely (100%) responsive at the moment
  // I find that 80% of everyone who says their website is 100% responsive has some bugs
  // I'd like to explore ways to get as close to that 100% as possible
  const responsiveTextHeight = () => {
    if (typeof window !== 'undefined') {
      // console.log(`${(1220 / window.innerWidth) * 6}em`);

      if (window.innerWidth < 930) return '16em';
      if (window.innerWidth < 1005) return '10em';
      if (window.innerWidth < 1200) return '6em';
    }
    return '4em';
  };

  return (
    <GradientLayout
      color="gray"
      subtitle="profile"
      title={user?.name}
      image={user?.imageUrl}
      description={`Embrace lifelong learning. ${user?.playlistCount} playlists to start your day.`}
      roundImage
    >
      <Box color="white">
        <Box id="top-artists">
          <Text fontSize="2xl">Top artists this month</Text>
          <Text fontSize="md" fontWeight="400" padding="0em 1em">
            - only visible to you -
          </Text>
        </Box>
        {/* todo: make it more responsive, i.e. if window size < 1220px, wrap artist boxes */}

        <Flex
          margin="1em"
          wrap={
            typeof window !== 'undefined' && window.innerWidth <= 920
              ? 'wrap'
              : 'nowrap'
          }
        >
          {artists?.map((artist) => (
            <Box
              padding="10px"
              minWidth="1em"
              key={artist.name?.split(' ').join('-')}
            >
              <Box bg="gray.900" borderRadius="6px" padding="15px" width="100%">
                <Image
                  src="https://placekitten.com/300/300"
                  borderRadius="100%"
                />
                <Box marginTop="20px" height={responsiveTextHeight()}>
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

// function only runs on server side when someone requests this page
export async function getServerSideProps() {
  const artistsFound = await prisma.artist.findMany({});

  // 1 way to avoid getting a SerializableError
  // const stringifiedArtists = JSON.parse(JSON.stringify(artistsFound));

  // custom formatter
  const artists = artistsFound.map((each) => ({
    ...each,
    createdAt: formatDate(each.createdAt),
    updatedAt: formatDate(each.updatedAt),
  }));

  // if (process.env.NODE_ENV === 'development')
  //   console.log(
  //     `🚀 -> file: index.tsx -> line 89 -> getServerSideProps -> artistsFound:`,
  //     artists
  //   );

  return {
    // props: { artists },
    // ! SerializableError: Error serializing `.artists[0].createdAt` returned from `getServerSideProps` in "/".
    // ! Reason: `object` ("[object Date]") cannot be serialized as JSON. Please only return JSON serializable data types.
    // props: { ...JSON.parse(JSON.stringify(artists)) },
    // * line 114 almost works, but artists in Home component on line 21 returns undefined on client side, need lines 90-91
    props: { artists },
    // currently using custom formatter lines 94-98
  };
  // Error serializing date returned from getServerSideProps
  // https://logfetch.com/next-js-error-serializing-date-returned-from-getserversideprops/#fix-the-error-using-jsonparse-and-jsonstringify
}

export default Home;

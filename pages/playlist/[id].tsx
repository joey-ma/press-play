// import type { NextPage } from 'next';
import { FC } from 'react';
import GradientLayout from '../../components/gradientLayout';
import { validateToken } from '../../lib/auth';
import prisma from '../../lib/prisma';
import SongsTable from '../../components/songsTable';
import { formatDate } from '../../lib/formatter';

const getBgColor = (id: number) => {
  const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'purple',
    'gray',
    'teal',
    'yellow',
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

interface PlaylistProps {
  playlist: {
    id: number | undefined;
    createdAt: any;
    updatedAt: any | null;
    name: string;
    songs: string[] | [];
  };
}

const Playlist: FC<PlaylistProps> = ({ playlist }) => {
  const color = getBgColor(playlist?.id as number);

  return (
    <GradientLayout
      color={color}
      title={playlist.name}
      subtitle="playlist"
      description={`This playlist currently has ${playlist.songs?.length} songs.`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  );
};

interface ServerSideProps {
  query: any;
  req: any;
}

export const getServerSideProps = async ({ query, req }: ServerSideProps) => {
  const { id } = validateToken(req.cookies.P4L_ACCESS_TOKEN);

  // data: an [] of 1 obj
  const [data] = await prisma.playlist.findMany({
    where: {
      id: +query.id, //playlist id
      userId: id, // only if the user's token is verified
    },
    include: {
      songs: {
        include: {
          // join
          artist: {
            select: {
              name: true,
              id: true,
            }, // specify artist info, but include everything else
          },
        },
      },
    },
  });

  // format data as an {}
  const playlist = {
    ...data,
    createdAt: formatDate(data.createdAt),
    updatedAt: formatDate(data.updatedAt),
    // format songs: [] of obj so they are all serializable
    songs: data.songs.map((song: any) => ({
      ...song,
      createdAt: formatDate(song.createdAt),
      updatedAt: formatDate(song.updatedAt),
    })),
  };

  return { props: { playlist } };
};

export default Playlist;

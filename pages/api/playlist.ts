import prisma from '../../lib/prisma';
import { validateRoute } from '../../lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: any) => {
    const playlists = await prisma.playlist.findMany({
      where: {
        userId: user.id,
      },
      // flawed: Playlist 1, 10, 2, 3, 4, 5, 6, 7, 8, 9
      orderBy: {
        name: 'asc',
      },
    });

    res.json(playlists);
  }
);

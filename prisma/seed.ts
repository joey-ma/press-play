import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { artistsData } from './songData';

const prisma = new PrismaClient();
// Log query & info
// const prisma = new PrismaClient({ log: ['query', 'info'] });

const run = async () => {
  await Promise.all(
    artistsData.map(async (artist) => {
      return await prisma.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          songs: {
            create: artist.songs.map((song) => ({
              name: song.name,
              // album: song.album,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
      });
    })
  );

  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    create: {
      name: 'tester',
      email: 'test@test.com',
      password: bcrypt.hashSync('test', salt),
      imageUrl: `https://cdn.shibe.online/shibes/55b60c1d79c482357fbf259ededc456191bd3798.jpg`,
    },
    update: {},
    where: { email: 'test@test.com' },
  });

  // user: {
  //   id: 1,
  //   createdAt: 2022 - 10 - 13T07: 00: 10.874Z,
  //   updatedAt: 2022 - 10 - 13T07: 00: 10.874Z,
  //   email: 'test@test.com',
  //   name: 'tester',
  //   password: 'encrypted-password',
  //   imageUrl: 'https://cdn.shibe.online/shibes/55b60c1d79c482357fbf259ededc456191bd3798.jpg'
  // }

  const songs = await prisma.song.findMany({});

  // 1st attempt:
  // await Promise.all(
  //   new Array(10).fill(1).map(async (_, i) => {
  //     return prisma.playlist.create({
  //       data: {
  //         name: `Playlist #${i + 1}`,
  //         user: {
  //           connect: { id: user.id },
  //         },
  //         songs: {
  //           connect: songs.map((song) => ({
  //             id: song.id,
  //           })),
  //         },
  //       },
  //     });
  //   })
  // );

  // 2nd approach: separate the array from map with async fn
  // let playlists = new Array(9).fill(1).map((el, i) => ({
  //   name: `Playlist #${i + 1}`,
  //   user: { connect: { id: user.id } },
  //   userId: 1,
  //   songs: { connect: songs.map((song) => ({ id: song.id })) },
  // }));
  // await Promise.all(
  //   playlists.map(async (playlist) =>
  //     prisma.playlist.create({ data: playlist })
  //   )
  // );

  // 3rd approach: using upsert to create a playlist with # matching its id, not fully working yet
  await Promise.all(
    new Array(10).fill(1).map(async (_, i) => {
      return prisma.playlist.upsert({
        where: { id: Number(i + 1) },
        update: { name: `Playlist #${i + 1}` },
        create: {
          name: `Playlist #${i + 1}`,
          user: {
            connect: { id: user.id },
          },
          songs: {
            connect: songs.map((song) => ({
              id: song.id,
            })),
          },
        },
      });
    })
  );
};

run()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
// https://typescript-eslint.io/rules/no-misused-promises/

# Press-Play

<!-- A README is often the first item a visitor will see when visiting your repository. README files typically include information on:

What the project does
Why the project is useful
How users can get started with the project
Where users can get help with your project
Who maintains and contributes to the project

If you put your README file in your repository's hidden .github, root, or docs directory, GitHub will recognize and automatically surface your README to repository visitors. -->

## About 

<!-- What the project does -->
Meet your _(music)_ **Player for Life**! You may also see it as a Spotify-clone, with a fraction of what Spotify can do, but I'd like to at least give it a more interesting name than `spotify-clone`. A tiny library of royalty-free songs were used for the database.

<!-- Why the project is useful -->
Building this application provides the unique opportunity to put everything I have learned together, learn several new tools, and also gain hands-on experience for database design, frontend and backend development, in-depth GitHub features and project management practices all during the process. Enjoy exploring this repo!

## Dev environment overview

I am using **Next.js** for a full stack development experience, which is a flexible React framework (`next`, `react` & `react-dom`) that builds fast web applications.

You can learn more about **Next.js** here: 
- [About Next.js](https://nextjs.org/learn/foundations/about-nextjs)
- [Create a Next.js App](https://nextjs.org/learn/basics/create-nextjs-app)

I am using **PostgreSQL** (`postgres`) as the object-relational database system, **Prisma** (`prisma`) as the ORM (Object-Relational Mapping/Mapper), and `Supabase` for database hosting (although it can do so much more).

You can learn more about **PostgreSQL** here: 
- [PostgreSQL](https://www.postgresql.org/)
- [PostgreSQL Wiki](https://wiki.postgresql.org/wiki/Main_Page)

You can learn more about **Prisma** here: 
- [Getting started with Prisma](https://www.prisma.io/docs/getting-started)
- [Why Prisma](https://www.prisma.io/docs/concepts/overview/why-prisma)

You can learn more about **Supabase** here: 
- [Getting started with Supabase](https://supabase.com/docs/guides/getting-started)

## Getting started

<!-- How users can get started with the project -->
### See the application live
I do hope to deploy this app someday, but it is not yet. It is currently available in development mode only.

### Exploring the code
Feel free to look around here. Discussions space is opened for you to have conversations, ask questions, and post answers without opening issues.

If you'd like to, you can view the code / run this application on your local machine by following the steps below.

#### 1. Fork this GitHub repository to your own account.

https://github.com/yoyoyojoe/press-play

<img src='../assets/images/fork_it.png' width=500px height=auto/>

#### 2. Git clone 

Run the following command in your terminal to clone this repo into your local environment & preferred directory.

```bash
git clone https://github.com/your_username/press-play.git # note: your_username
```

#### 3. Install all dependencies

Make sure you're within the root directory of `press-play` in your terminal (e.g., enter `cd press-play`). Run the following commands to get started.

```
npm i
```

#### 4. Set up your database 

<!-- todo -->
Our application would be useless without a database to hold onto the tasks between sessions. Since we don't want our song library nor our user info to be publicly available, the db connection url to database and JWT secret are stored in an .env file and added to .gitignore. (Therefore, not committed and uploaded in our GitHub repo.) To create your own .env file with your own `DATABASE_URL` and `JWT_SECRET`, a brief instruction is provided for you.

#### 4.1 Create a `.env` file

With Prisma, `prisma init` creates a template `.env` file in the project root directory.

```bash
npx prisma init
```

Alternatively, you can: 

```bash
touch .env # where `.env` would be your file name
```

#### 4.2 Add database & JWT secret

Please put the URI of the database you will be using (local or cloud hosted). If your personal URI contains sensitive information (the password), feel free to replace myURI when you are ready to commit. See the documentation for all the connection string options: https://pris.ly/d/connection-strings

```bash
# this is a working database with some sample data. 
# feel free to hack it (for the purpose of helping make this database more secure) if you'd like.
DATABASE_URL="postgresql://postgres:r2CSQZbLdA2Afh%23@db.bingvsdkdgckfwcuwmci.supabase.co:5432/postgres"
# this JWT_SECRET is a different one from what I have 
# so you should not be able to log in to existing user accounts
# however, the new user accounts created by you should be accessible to you.
JWT_SECRET="test" 
```

Now you have a test database! To use your own database, see below [Developer's Notes](#developers-Notes)
### Development mode

To start the application in development mode, run: 

```
npm run dev
```

Next.js built-in development server is automatically started when you run the default `next dev` command. By default, it starts a server at http://localhost:3000. If port 3000 is already in use, then a fallback port (e.g., 3001) will be used. After Next.js starts, the location where the dev server is listening will be printed to the terminal.

Learn more about how to get started with Next.js [here](https://nextjs.org/docs/getting-started).

### Production mode

Optionally, you can build the application for [production][nextjs-build]. An optimized version of your application will be generated inside the `.next` folder.

```
npm run build
```

Then start application (but now in production mode).

```
npm start
```

# Developer's Notes

## Contributing

<!-- Where users can get help with your project -->
See the [contributing guide](./CONTRIBUTING.md) for how to get involved as a contributor.
See the [Issues section](./CONTRIBUTING.md#issues) for how to create an issue, e.g., create a bug report, submit a feature request, etc.
See [types of issues](./TYPES_OF_CONTRIBUTIONS.md#lady_beetle-issues) for more details regarding how to contribute.

## Database

### Optional

You can go to `prisma/schema.prisma` to update the variable name as you'd like.

```js
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL") // as long as it matches to what is in the .env file
}
```

You can go to `lib/auth.ts` to update the variable name as you'd like.

```js
      try {
        const { id } = jwt.verify(
          token,
          process.env.JWT_SECRET as string  // as long as it matches to what is in the .env file
        ) as JwtPayload;
}
```

As you have noticed, you can modify the database schema at `prisma/prisma.schema` (with [docs][prisma-schema]). If you make any changes, some useful commands include: 

```bash
npx prisma db push
```

- to prototype a new schema or a new feature for an existing schema
  - `db push` does not generate a history.

```bash
npx prisma migrate dev
```

- to apply migration
  - to keep your db schema in sync with your Prisma schema as it evolves
  - maintain existing data in your database
  - to [evolve your db schema][prisma-migrate]

```bash
npx prisma migrate reset
``` 

- to delete and recreate the database, or performs a ['soft reset'][migrate-reset] by removing all data, tables, indexes, and other artifacts
  - e.g., `db push` will prompt you to reset because you cannot add a required field to a table with existing content unless you provide a default value:

```bash
npx prisma migrate reset
``` 

- to see your database using Prisma Studio

# Notes

Definitely a ton more functions and features can be added to actually make a Spotify-clone. Did you know that there are 1,600+ engineers managing 14,000+ software components at Spotify?

## Inspirations

[Spotify Engineering][engineering-at-spotify] has great resources for developers. Be sure to check them out. 

## More Resources

[Spotify for Developers Docs](https://developer.spotify.com/documentation/web-playback-sdk/guide/)
[Scott Moss' course](https://frontendmasters.com/courses/fullstack-app-next/)
[Achraf Garai's article](https://www.achrafgarai.com/building-a-music-app-part-3-back-end-with-prisma-and-express/)
[Chris Bongers's article](https://daily-dev-tips.com/posts/static-playlist-website-with-nextjs-and-prisma/)

And I'm sure you can find a ton more. (I could only go through a fraction of what's listed here.)

<!-- And a bunch of YouTube videos: https://www.youtube.com/results?search_query=spotify+clone -->
<!-- [Clever Programmer's YouTube video](https://youtu.be/pnkuI8KXW_8)
[Web Dev Simplified's YouTube video](https://youtu.be/Xcet6msf3eE)
[JavaScript Mastery's YouTube video (Tailwind, Redux, RapidAPI)](https://youtu.be/I1cpb0tYV74)
[Sonny Sangha's YouTube video (Nextjs 12, Middleware, Spotify API, Tailwind, NextAuth, Recoil)](https://youtu.be/3xrko3GpYoU) -->

[nextjs-build]:https://nextjs.org/docs/deployment#nextjs-build-api
[prisma-schema]: https://www.prisma.io/docs/concepts/components/prisma-schema
[prisma-migrate]: https://www.prisma.io/docs/concepts/components/prisma-migrate/mental-model#evolve-your-database-schema-with-prisma-migrate
[migrate-reset]: https://www.prisma.io/docs/reference/api-reference/command-reference#migrate-reset
[engineering-at-spotify]: https://engineering.atspotify.com/
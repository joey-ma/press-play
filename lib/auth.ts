import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from './prisma';

interface JwtPayload {
  id: number;
}

// run every time a playlist is clicked on
export function validateRoute(handler: any) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const { P4L_ACCESS_TOKEN: token } = req.cookies;
    // * same or can also be written as the following
    // const token = req.cookies.P4L_ACCESS_TOKEN;

    // if (process.env.NODE === 'development')
    //   console.log(
    //     `🚀 -> file: auth.ts -> line 12 -> req.cookies:`,
    //     req.cookies
    //   );

    if (token) {
      let user;

      // check if user id (from jwt) is in database
      try {
        const { id } = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload;

        if ((process.env.NODE = 'development')) {
          console.log('auth.ts -> route validated');
          // console.log(
          //   `🚀 -> file: auth.ts (validateRoute function) -> line 27 -> id:`,
          //   id
          // );
        }

        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new Error('401 Unauthorized: invalid credentials');
        }
      } catch (e) {
        res.status(401).json({ error: '401 Unauthorized' });
        return;
      }
      return handler(req, res, user);
    }

    res.status(401).json({ error: '401 Unauthorized' });
  };
}

export function validateToken(token: any) {
  const user = jwt.verify(token, process.env.JWT_SECRET as string);

  if ((process.env.NODE = 'development')) {
    console.log('auth.ts -> token validated');
  }

  return user as { id: number };
  // currently specifically used by playlist/[id].tsx only
}

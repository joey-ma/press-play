import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // server side:
  if (process.env.NODE_ENV === 'development') {
    console.log('🚀 ~ file: signin.ts ~ line 19 ~ user:');
    console.log(user);
  }

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        time: Date.now(),
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '8h',
      }
    );

    if (process.env.NODE_ENV === 'development')
      console.log('token created:', token);

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('P4L_ACCESS_TOKEN', token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    );

    if (process.env.NODE_ENV === 'development')
      console.log('token stored in cookie');

    res.json(user);
  } else {
    // client side:
    // currently displaying res.status & message
    res.status(401);
    res.json({
      status: 401,
      statusMessage: 'Invalid authorization',
      error: 'Invalid authorization: Email or password may be wrong',
    });
    // alternatively, can redirect to /signup page; i.e.,
    // res.redirect('/signup');
  }
}

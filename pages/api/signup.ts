import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import prisma from '../../lib/prisma';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const salt = bcrypt.genSaltSync();

  const { name, email, password } = req.body;

  let user;

  try {
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, salt),
      },
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(`data received from request body: 
      name: ${name}
      email: ${email}
      password: ${email}`);

      console.log('user created:', user);
    }
  } catch (e) {
    console.log('error encountered validating signup');

    const prismaError = {
      ...(e as { code: string; meta: { target: [string] } }),
    };

    // console.log(prismaError);

    // * security concerns aside, nice user feedback (not so good for bad actors)
    // * currently provides a "hint" of what's wrong instead of explicitly stating it

    if (
      prismaError.code === 'P2002' &&
      prismaError.meta.target[0] === 'email'
    ) {
      console.log('email already exists in db');
      // client side: stored in const `access`
      // currently displaying access.status & access.message
      res.status(409); // needed to send http status
      // return needed to exit code block
      return res.json({
        status: 409,
        statusMessage: 'Request conflict',
        error: 'Request conflict: user may already exist', // notes for debugging
      });
    }

    if (user === undefined) {
      console.log('database may be down');
      // client side: stored in const `access`
      // currently displaying access.status & access.message
      res.status(500); // needed to send http status
      // return needed to exit code block
      return res.json({
        status: 500,
        statusMessage: 'Internal Server Error',
        error: 'Internal Server Error: database may be down', // notes for debugging
      });
    }
    // would create a different user experience
    // but alternatively can redirect to '/signup' page, i.e.,
    // res.redirect('/signin');
  }

  // if there's no return statement within catch block,
  // code will continue here, causing errors including:
  // - 'ERR_HTTP_HEADERS_SENT'
  // - 'ERR_STREAM_WRITE_AFTER_END'
  // - 'TypeError: Cannot read properties of undefined (reading 'email')'

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    process.env.JWT_SECRET as string,
    { expiresIn: '8h' }
  );

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
  // send jwt to cookie, and set it to HTTP only, it cannot be accessed by JavaScript
  // cookies are sent up automatically so it saves dev time and gives us more security against CSRF
  // you can send jwt to local storage, but it can be access by JavaScript
  res.json(user);
}

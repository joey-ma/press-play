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
      email: ${email}, 
      password: ${email}`);

      console.log('user created:', user);
    }
  } catch (e) {
    res.status(401);
    return res.json({ error: 'Invalid request, or user already exists' });
  }

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

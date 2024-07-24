import express, { Request, Response, NextFunction } from "express";

import { BadRequest } from "../exceptions/bad_request";
import { ErrorCode } from '../exceptions/root';
import { userValidation } from "../validation/user";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { refreshTokenKey, tokenKey } from "../secrets";
import { NotFoundException } from "../exceptions/not_found";
import { prisma } from "../prisma_client";
import redis from "redis";
import { client } from "..";
import { Role } from "@prisma/client";


// Sign Up
export const signup = async (req: Request, res: Response, next: NextFunction) => {

  //userValidation.parse(req.body);
  let admin;

  const { userName, email, password, profile, role, subject } = req.body;

  let user = await prisma.user.findFirst({
    where: {
      email: email,
      userName: userName
    }
  })
  if (user) {
    throw new BadRequest(
      "User already exist",
      ErrorCode.BAD_REQUEST
    )
  }
  user = await prisma.user.create({
    data: {
      userName,
      email,
      role,
      password: hashSync(password, 10),
    },
  });
  role == "Admin" ?
    admin = await prisma.admin.create({
      data: {
        subject,
        userId: user.id
      }
    }) : null;

  const refreshToken = jwt.sign({
    id: user.id,
  },
    refreshTokenKey,
    { expiresIn: '30 days' }
  );

  res.status(200).json({
    "user": user, "refreshToken": refreshToken,
    "admin": role == "Admin" ? admin : null
  });

}


// Sign in
export const signin = async (req: Request, res: Response, next: NextFunction) => {

  const { email, userName, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  });
  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.NOT_FOUND);
  }
  const checkPassword = compareSync(
    password,
    user?.password,
  );
  if (!checkPassword) {
    throw new BadRequest("Password incorrect",
      ErrorCode.BAD_REQUEST)
  }
  const token = jwt.sign({
    id: user.id,
  },
    tokenKey,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign({
    id: user.id,
  },
    refreshTokenKey,
    { expiresIn: '30 days' }
  );

  const s = await prisma.tokens.createMany({

    data: [{
      token: token,
      userId: user.id
    },
    {
      token: refreshToken,
      userId: user.id
    }
    ],

  });

  res.status(200).json({
    "user": user, "token": token, "refreshToken": refreshToken
  })

}

export const me = async (req: Request, res: Response) => {
  return res.status(200).json(req?.user);
}

// Logout
export const logOut = async (req: Request, res: Response) => {
  //: TODO freshly signed up user can't log out
  const token = req.headers.authorization;

  //  await client.connect();
  //   const t = await client.set("token", token!);
  //   await client.disconnect();

  //   console.log(t);


  await prisma.tokens.update({
    where: {
      token: token
    },
    data: {
      isValid: false
    }
  });
  res.status(200).json({ "message": "Logout successful" });
}


// Refresh Token 
export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.headers.authorization;

  const refreshPayload = jwt.verify(
    refreshToken!,
    refreshTokenKey
  ) as any;
  if (!refreshPayload) {
    throw new BadRequest("Refresh token is not valid", ErrorCode.UNAUTHORIZED);
  }
  const token = jwt.sign({
    id: refreshPayload.id,
  },
    tokenKey,
    { expiresIn: '1h' }
  );


  await prisma.tokens.create({

    data: {
      token: token,
      userId: refreshPayload.id,
    },

  });
  res.status(200).json({ "token": token });

}
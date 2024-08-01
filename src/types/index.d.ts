
import { Express, Request } from 'express-serve-static-core';

import { User } from '@prisma/client';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
declare global {
  namespace Express {
    export interface Request {
      user: User?;
    }
  }
}

export interface UserFirebase extends Request{

  firebaseUser:UserRecord!;

}




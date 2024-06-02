
import { Express, Request  } from 'express-serve-static-core';

import { User } from '@prisma/client';

declare global {
  namespace Express {
export   interface Request {
  
   user :User? ;
  
  }
}
}


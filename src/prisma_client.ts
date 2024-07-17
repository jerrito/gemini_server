import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

// connection string 
const connectionString = `${process.env.DATABASE_URL}`

// pool 
const pool = new Pool({ connectionString })

// adapter
const adapter = new PrismaPg(pool)

// prisma client
export const prisma = new PrismaClient({ adapter })

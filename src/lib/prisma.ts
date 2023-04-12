import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  // Show the script that will run in the database
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})

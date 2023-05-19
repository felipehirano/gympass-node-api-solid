import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'

// postgresql://docker:docker@localhost:5432/apisolid?schema=public

function generateDataBaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)
  return url.toString()
}

const prisma = new PrismaClient()

export default <Environment>{
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDataBaseUrl(schema)

    process.env.DATABASE_URL = databaseURL

    // Roda os comandos como se estivessem sendo executados no terminal
    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        // Apagar os schemas de cada teste. O Cascade da o comando pra apagar todas as infos que dependem dos schemas que
        // foram criados para esses testes(indice, chaves, chaves estrangeiras)
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        prisma.$disconnect()
      },
    }
  },
}

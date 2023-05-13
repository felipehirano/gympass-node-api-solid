import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  async setup() {
    console.log('Executa antes de cada arquivo de teste')

    return {
      async teardown() {
        console.log('Executa depois de cada teste')
      },
    }
  },
}

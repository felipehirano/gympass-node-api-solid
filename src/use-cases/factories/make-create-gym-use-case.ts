import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym-use-case'

// Factory Pattern
export function makeCreateGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()

  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}

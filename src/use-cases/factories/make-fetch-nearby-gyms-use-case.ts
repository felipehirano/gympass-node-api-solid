import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms-use-case'

// Factory Pattern
export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()

  const useCase = new FetchNearbyGymsUseCase(gymsRepository)

  return useCase
}

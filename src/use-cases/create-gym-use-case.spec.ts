import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym-use-case'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', async () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to register a gym', async () => {
    const { gym } = await sut.execute({
      title: 'ACM',
      description: null,
      phone: null,
      latitude: -15.8247367,
      longitude: -47.8993626,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})

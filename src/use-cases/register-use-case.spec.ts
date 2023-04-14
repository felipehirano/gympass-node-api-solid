import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { RegisterUseCase } from './register-use-case'

let usersRepository: InMemoryUsersRepository
// This is a pattern to indicate which variable we are testing. In this case it is the registerUseCase
// System Under Test;
let sut: RegisterUseCase

describe('Register Use Case', async () => {
  beforeEach(() => {
    // This way, the tests will run isolated by other tests
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user password upon registration', async () => {
    // This is wrong for unit tests, the unit tests can't depend on any other layer;
    // const prismaUsersRepository = new PrismaUsersRepository()
    // const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    // The correct way to do this is using mock data to simulate the layers, like the following:
    // const usersRepository = new InMemoryUsersRepository()
    // const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHased = await compare('123456', user.password_hash)

    expect(isPasswordCorrectlyHased).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@gmail.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    // Resolve / Reject

    expect(async () => {
      await sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})

import { FastifyRequest, FastifyReply } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true }) // Verifica se existe o refreshToken no cookie

  const { role } = request.user

  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true, // Criptografa com HTTPS e o frontend não irá conseguir ler esse cookie
      sameSite: true,
      httpOnly: true, // Só é acessado através da requisição e resposta, não fica salva no browser
    })
    .status(200)
    .send({ token })
}

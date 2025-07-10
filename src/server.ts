//import { fastifyCors } from '@fastify/cors'
import cors from '@fastify/cors'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(cors, {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
  return 'OK'
})

app.register(getRoomsRoute)

app.listen({ port: env.PORT }).then(() => {
  // console.log(`PORT: ${process.env.PORT}`)
  // biome-ignore lint/suspicious/noConsole: only alert
  console.log('HTTP server running!!!!')
})

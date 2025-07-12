//import { fastifyCors } from '@fastify/cors'
import cors from '@fastify/cors'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { createQuestionRoute } from './http/routes/create-question.ts'
import { createRoomRoute } from './http/routes/create-room.ts'
import { getRoomDetailsRoute } from './http/routes/get-room-details.ts'
import { getRoomQuestionsRoute } from './http/routes/get-room-questions.ts'
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
app.register(createRoomRoute)
app.register(getRoomQuestionsRoute)
app.register(createQuestionRoute)
app.register(getRoomDetailsRoute)

app.listen({ port: env.PORT }).then(() => {
  // console.log(`PORT: ${process.env.PORT}`)
  // biome-ignore lint/suspicious/noConsole: only alert
  console.log('HTTP server running!!!!')
})

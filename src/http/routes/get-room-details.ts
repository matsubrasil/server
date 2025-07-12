import { eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

export const getRoomDetailsRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/rooms/:roomId',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request) => {
      const { roomId } = request.params

      // biome-ignore lint/suspicious/noConsole: test
      console.log(roomId)

      const results = await db
        .select({
          id: schema.rooms.id,
          name: schema.rooms.name,
        })
        .from(schema.rooms)
        .where(eq(schema.rooms.id, roomId))

      return results
    }
  )
}

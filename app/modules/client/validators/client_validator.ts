import vine from '@vinejs/vine'

export const clientStoreValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
    email: vine.string().email(),
  })
)

export const clientUpdateValidator = vine.compile(
  vine.object({
    id: vine.number(),
    name: vine.string().minLength(3).optional(),
    email: vine.string().email().optional(),
  })
)

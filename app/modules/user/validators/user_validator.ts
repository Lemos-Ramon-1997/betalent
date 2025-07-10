import vine from '@vinejs/vine'

export const userStoreValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
    surname: vine.string().minLength(3),
    email: vine.string().email(),
    role: vine.string().minLength(3),
    password: vine.string().minLength(8),
  })
)

export const userUpdateValidator = vine.compile(
  vine.object({
    id: vine.number(),
    name: vine.string().minLength(3).optional(),
    surname: vine.string().minLength(3).optional(),
    email: vine.string().email().optional(),
    role: vine.string().minLength(3).optional(),
    password: vine.string().minLength(8).optional(),
  })
)

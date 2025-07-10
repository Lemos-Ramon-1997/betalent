import vine from '@vinejs/vine'

export const productStoreValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
    amount: vine.number(),
    price: vine.number().positive(),
  })
)

export const productUpdateValidator = vine.compile(
  vine.object({
    id: vine.number(),
    name: vine.string().minLength(3).optional(),
    amount: vine.number().optional(),
    price: vine.number().positive().optional(),
  })
)

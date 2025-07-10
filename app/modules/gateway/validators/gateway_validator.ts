import vine from '@vinejs/vine'

export const gatewayStoreValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
    is_active: vine.boolean(),
    priority: vine.number(),
  })
)

export const gatewayUpdateValidator = vine.compile(
  vine.object({
    id: vine.number(),
    name: vine.string().minLength(3).optional(),
    is_active: vine.boolean().optional(),
    priority: vine.number().optional(),
  })
)

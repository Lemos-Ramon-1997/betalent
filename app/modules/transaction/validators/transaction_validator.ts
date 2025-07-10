import vine from '@vinejs/vine'

export const transactionStoreValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
    email: vine.string().email(),
    cardNumber: vine.string().minLength(16).maxLength(16),
    cvv: vine.string().minLength(3).maxLength(4),
    products: vine.array(
      vine.object({
        product_id: vine.number().positive(),
        quantity: vine.number().positive(),
      })
    ).minLength(1),
  })
)

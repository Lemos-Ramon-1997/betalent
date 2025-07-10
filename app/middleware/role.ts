import type { HttpContext } from '@adonisjs/core/http';

export default function role(roles: string[]) {
  return async ({ auth, response }: HttpContext, next: () => Promise<void>) => {
    await auth.check()
    const user = auth.user;
    if (!user || !roles.includes(user.role)) {
      return response.unauthorized({ error: 'Acesso negado: permissão insuficiente.' });
    }
    await next();
  }
}

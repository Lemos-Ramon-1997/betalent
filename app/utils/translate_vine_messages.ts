// Função utilitária para traduzir mensagens do VineJS para português
export function translateVineMessages(messages: any[]): string {
  return messages.map((m: any) => {
    if (m.rule === 'minLength') {
      return `O campo ${m.field} deve ter no mínimo ${m.meta.min} caracteres`;
    }
    if (m.rule === 'email') {
      return `O campo ${m.field} deve ser um e-mail válido`;
    }
    if (m.rule === 'required') {
      return `O campo ${m.field} é obrigatório`;
    }
    if (m.rule === 'string') {
      return `O campo ${m.field} deve ser uma string`;
    }
    if (m.rule === 'number') {
      return `O campo ${m.field} deve ser um número`;
    }
    if (m.rule === 'boolean') {
      return `O campo ${m.field} deve ser verdadeiro ou falso`;
    }
    // Adicione outras regras conforme necessário
    return m.message;
  }).join('; ');
}

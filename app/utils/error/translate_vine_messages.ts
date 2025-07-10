// Função utilitária para traduzir mensagens do VineJS para português
const translateVineMessages = (messages: any[]): string => {
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
    return m.message;
  }).join('; ');
}

export { translateVineMessages };
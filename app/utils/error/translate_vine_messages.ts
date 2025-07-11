// Função utilitária para traduzir mensagens do VineJS para português de forma modular
const vineTranslations: Record<string, (m: any) => string> = {
  minLength:      (m) => `O campo ${m.field} deve ter no mínimo ${m.meta.min} caracteres`,
  maxLength:      (m) => `O campo ${m.field} deve ter no máximo ${m.meta.max} caracteres`,
  email:          (m) => `O campo ${m.field} deve ser um e-mail válido`,
  required:       (m) => `O campo ${m.field} é obrigatório`,
  confirmed:      (m) => `O campo ${m.field} deve ser igual ao campo de confirmação`,
  alpha:          (m) => `O campo ${m.field} deve conter apenas letras`,
  alphaNumeric:   (m) => `O campo ${m.field} deve conter apenas letras e números`,
  integer:        (m) => `O campo ${m.field} deve ser um número inteiro`,
  number:         (m) => `O campo ${m.field} deve ser um número`,
  boolean:        (m) => `O campo ${m.field} deve ser verdadeiro ou falso`,
  min:            (m) => `O campo ${m.field} deve ser no mínimo ${m.meta.min}`,
  max:            (m) => `O campo ${m.field} deve ser no máximo ${m.meta.max}`,
  in:             (m) => `O campo ${m.field} deve ser um dos seguintes valores: ${m.meta.values?.join(', ')}`,
  notIn:          (m) => `O campo ${m.field} não pode ser um dos seguintes valores: ${m.meta.values?.join(', ')}`,
  regex:          (m) => `O campo ${m.field} possui formato inválido`,
  url:            (m) => `O campo ${m.field} deve ser uma URL válida`,
  date:           (m) => `O campo ${m.field} deve ser uma data válida`,
  before:         (m) => `O campo ${m.field} deve ser uma data anterior a ${m.meta.date}`,
  after:          (m) => `O campo ${m.field} deve ser uma data posterior a ${m.meta.date}`,
};

const translateVineMessages = (messages: any[]): string => {
  if (!messages || messages.length === 0) return '';
  const m = messages[0];
  if (vineTranslations[m.rule]) {
    return vineTranslations[m.rule](m);
  }
  return m.message;
}

export { translateVineMessages };
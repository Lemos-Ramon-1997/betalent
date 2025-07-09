import ErrorResponse from "../error/error_handler.js";


const checkRequiredParams = (req: any, params: string[], key: string | null = null): void => {
  const data = typeof req.only === 'function' ? req.only(params) : req.body;
  const obj = key ? data[key] : data;
  if (!obj || typeof obj !== 'object') throw new ErrorResponse(`Parâmetro "${key}" ausente ou inválido.`);
  const missingParams = params.filter(param => {
    if (!Object.prototype.hasOwnProperty.call(obj, param) || obj[param] === null) return true;
    if (typeof obj[param] === 'string' && obj[param].trim() === '') return true;
    return false;
  });
  if (missingParams.length > 0) throw new ErrorResponse(`Parâmetros ausentes ou vazios: ${missingParams.join(', ')}`);
};

export { 
    checkRequiredParams
}
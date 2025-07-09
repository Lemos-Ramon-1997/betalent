class ErrorResponse {
  message: string;
  status: number;

  constructor(message: string, status = 500) {
    this.message = message;
    this.status = status;
  }
}


export default ErrorResponse;
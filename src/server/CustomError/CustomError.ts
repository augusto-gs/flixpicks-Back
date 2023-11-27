class CustomError extends Error {
  constructor(
    message: string,
    public statusCode: string,
    public customMessage: string,
  ) {
    super(message);
  }
}

export default CustomError;

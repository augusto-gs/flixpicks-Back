class CustomError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public customMessage: string,
  ) {
    super(message);
  }
}

export default CustomError;

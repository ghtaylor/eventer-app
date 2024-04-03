export type ErrorOptions = {
  originalError?: unknown;
  data?: unknown;
};

export abstract class BaseError extends Error {
  abstract readonly name: string;
  readonly originalError: ErrorOptions["originalError"];

  constructor(message: string, options: ErrorOptions = {}) {
    super(message);

    this.originalError = options.originalError;
  }
}

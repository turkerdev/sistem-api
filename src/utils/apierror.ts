export interface APIErrorObject {
  path: string;
  messages: string[];
}

interface APIErrorMessage {
  errors: Array<APIErrorObject>;
}

export class APIError {
  readonly status: number;
  readonly error: APIErrorMessage;

  constructor(status: number, error: APIErrorObject | APIErrorObject[]) {
    this.status = status;
    this.error = {
      errors: Array.isArray(error) ? error : [error],
    };
  }
}

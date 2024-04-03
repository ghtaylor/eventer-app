import { Result } from "neverthrow";
import { ParseError } from "./errors/ParseError";

export interface JsonParser<T> {
  parseJsonString(json: string): Result<T, ParseError>;
}

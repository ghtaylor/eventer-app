import { ResultAsync } from "neverthrow";
import { ServiceError } from "./errors/ServiceError";

export default interface Repository<T> {
  getAll(): ResultAsync<T[], ServiceError>;
  getOne(id: string): ResultAsync<T | null, ServiceError>;
  create(item: T): ResultAsync<null, ServiceError>;
  update(id: string, item: T): ResultAsync<null, ServiceError>;
  delete(id: string): ResultAsync<null, ServiceError>;
}

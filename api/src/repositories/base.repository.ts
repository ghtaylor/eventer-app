import { ResultAsync } from "neverthrow";
import { ServiceError } from "../errors/ServiceError";

export default interface Repository<TSelect, TInsert> {
  getAll(): ResultAsync<TSelect[], ServiceError>;
  getOne(id: string): ResultAsync<TSelect | null, ServiceError>;
  create(item: TInsert): ResultAsync<null, ServiceError>;
  update(id: string, item: TInsert): ResultAsync<null, ServiceError>;
  delete(id: string): ResultAsync<null, ServiceError>;
}

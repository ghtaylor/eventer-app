export interface BaseController<TRequest, TResponse> {
  getAll(req: TRequest, res: TResponse): Promise<void>;
  getOne(req: TRequest, res: TResponse): Promise<void>;
  create(req: TRequest, res: TResponse): Promise<void>;
  update(req: TRequest, res: TResponse): Promise<void>;
  delete(req: TRequest, res: TResponse): Promise<void>;
}

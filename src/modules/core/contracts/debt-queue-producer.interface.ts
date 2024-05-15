export interface IDebtQueueProducer {
  add(name: string, data: unknown, options?: unknown): Promise<unknown>;
}

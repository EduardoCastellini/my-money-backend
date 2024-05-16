export interface IEventEmitterService {
  emit(event: string, payload: any): void;
}

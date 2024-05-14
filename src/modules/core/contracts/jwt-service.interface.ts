export interface IJwtService {
  sign(payload: any): Promise<string>;
}

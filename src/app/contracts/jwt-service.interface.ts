export interface IJwtService {
  sign(payload: any): Promise<string>;

  // verify(token: string): any;

  // decode(token: string): any;
}

import { IJwtService } from 'src/modules/core/contracts/jwt-service.interface';
import { JwtService } from '@nestjs/jwt';

export class JwtAdapter implements IJwtService {
  constructor(private jwtService: JwtService) {}

  async sign(payload: any): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}

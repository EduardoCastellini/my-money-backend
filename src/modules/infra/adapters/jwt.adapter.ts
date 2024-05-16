import { IJwtService } from 'src/modules/core/contracts/jwt-service.interface';
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common';

export class JwtAdapter implements IJwtService {
  constructor(@Inject(JwtService) private jwtService: JwtService) {}

  async sign(payload: any): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}

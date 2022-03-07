import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import { AuthService } from '../../../application/services/auth.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private authService: AuthService) {
    super({ header: 'Authorization', prefix: 'ApiKey ' }, false);
  }

  async validate(apiKey: string) {
    const client = await this.authService.validateUser(apiKey);
    if (!client) {
      throw new UnauthorizedException();
    }

    return client;
  }
}

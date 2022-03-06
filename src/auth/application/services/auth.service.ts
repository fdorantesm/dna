import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ApiKeyService } from '../../domain/apikey.service';

@Injectable()
export class AuthService {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  public async validateUser(apiKey: string): Promise<any> {
    try {
      const uuid = this.apiKeyService.toUUID(apiKey);
      const api = await this.apiKeyService.find({ uuid, publicKey: apiKey });
      const isValid = this.apiKeyService.check(api.publicKey, api.uuid);
      if (!isValid) {
        throw new UnauthorizedException('Invalid API Key');
      }
      return api;
    } catch (error) {
      throw new UnauthorizedException('Invalid API Key');
    }
  }
}

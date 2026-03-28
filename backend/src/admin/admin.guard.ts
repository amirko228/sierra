import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const configured = this.config.get<string>('admin.apiKey');
    if (!configured) {
      throw new UnauthorizedException('Admin API not configured');
    }
    const header = req.headers['x-admin-key'];
    const key = Array.isArray(header) ? header[0] : header;
    if (!key || key !== configured) {
      throw new UnauthorizedException('Invalid admin key');
    }
    return true;
  }
}

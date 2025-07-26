import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

export const SUPERADMIN_ONLY_KEY = 'superadminOnly';
export const ADMIN_ONLY_KEY = 'adminOnly';

export function SuperAdminOnly() {
  return (
    target: object,
    key?: string | symbol,
    descriptor?: TypedPropertyDescriptor<unknown>,
  ) => {
    Reflect.defineMetadata(
      SUPERADMIN_ONLY_KEY,
      true,
      descriptor && descriptor.value ? (descriptor.value as object) : target,
    );
  };
}

export function AdminOnly() {
  return (
    target: object,
    key?: string | symbol,
    descriptor?: TypedPropertyDescriptor<unknown>,
  ) => {
    Reflect.defineMetadata(
      ADMIN_ONLY_KEY,
      true,
      descriptor && descriptor.value ? (descriptor.value as object) : target,
    );
  };
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const superadminOnly = this.reflector.get<boolean>(
      SUPERADMIN_ONLY_KEY,
      context.getHandler(),
    );
    const adminOnly = this.reflector.get<boolean>(
      ADMIN_ONLY_KEY,
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as { superadmin?: boolean } | undefined;
    if (superadminOnly) {
      if (!user?.superadmin) {
        throw new ForbiddenException(
          'Solo el súper admin puede acceder a este recurso',
        );
      }
    } else if (adminOnly) {
      if (!user) {
        throw new ForbiddenException(
          'Solo administradores pueden acceder a este recurso',
        );
      }
    }
    return true;
  }
}

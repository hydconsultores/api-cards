import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import Config from '../../config/app';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor() {
    super(Config.Jwt);
  }

  setError() {
    throw new UnauthorizedException(
      'No tiene permisos suficientes para realizar la acción solicitada',
    );
  }

  async validate(payload: any) {
    if (!payload) {
      this.setError();
    }

    let tienePermiso = false;
    if (payload.roles !== undefined && payload.roles !== null) {
      for (const rol of payload.roles) {
        if (rol.role.code === 'ADMIN') {
          tienePermiso = true;
          payload.role = rol.role;
          break;
        }
      }
    } else if (payload.role !== undefined && payload.role !== null) {
      if (payload.role.code === 'ADMIN') {
        tienePermiso = true;
      }
    }

    if (!tienePermiso) {
      this.setError();
    }

    return {
      id: payload.id,
      master_id: payload.master_id,
      name: payload.name,
      role: payload.role,
    };
  }
}

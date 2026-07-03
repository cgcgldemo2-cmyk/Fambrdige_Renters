import { Injectable } from '@angular/core';

export interface JwtPayload {
  sub?: string;
  iat?: number;
  exp?: number;
  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class JwtService {

  decode(token: string): JwtPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return null;
      }
      const payload = parts[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded) as JwtPayload;
    } catch {
      return null;
    }
  }

  isExpired(token: string): boolean {
    const payload = this.decode(token);
    if (!payload || typeof payload['exp'] !== 'number') {
      return true;
    }
    return Date.now() >= payload['exp'] * 1000;
  }

  getField<T>(token: string, field: string): T | null {
    const payload = this.decode(token);
    if (!payload || !(field in payload)) {
      return null;
    }
    return payload[field] as T;
  }
}

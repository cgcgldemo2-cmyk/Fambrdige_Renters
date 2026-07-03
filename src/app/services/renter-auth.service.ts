import { Injectable } from '@angular/core';

export interface LocalRentalUser {
  id: string;
  name: string;
  email: string;
  countryCode: string;
  mobile: string;
  password: string;
  accountType: string;
  type: string;
  typeId?: number;
  category?: string;
  categoryId?: number;
}

@Injectable({ providedIn: 'root' })
export class RenterAuthService {
  private readonly usersKey = 'rental_platform_users';
  private readonly sessionKey = 'rental_platform_current_user';
  private readonly tokenKey = 'access_token';

  register(user: Omit<LocalRentalUser, 'id'>): { status: boolean; message: string } {
    const users = this.getUsers();
    const email = user.email.trim().toLowerCase();

    if (users.some(existingUser => existingUser.email === email)) {
      return {
        status: false,
        message: 'An account already exists for this email.'
      };
    }

    const newUser: LocalRentalUser = {
      ...user,
      id: `USR-${Date.now().toString().slice(-8)}`,
      email
    };

    localStorage.setItem(this.usersKey, JSON.stringify([...users, newUser]));

    return {
      status: true,
      message: 'Account created. You can now sign in.'
    };
  }

  login(email: string, password: string): { status: boolean; message: string; token?: string } {
    const normalizedEmail = email.trim().toLowerCase();
    const user = this.getUsers()
      .find(existingUser => existingUser.email === normalizedEmail && existingUser.password === password);

    if (!user) {
      return {
        status: false,
        message: 'Invalid email or password.'
      };
    }

    if (user.accountType !== 'Renter') {
      return {
        status: false,
        message: 'This account belongs to a different portal.'
      };
    }

    const token = `mock-renter-token-${Date.now()}`;
    sessionStorage.setItem(this.tokenKey, token);
    sessionStorage.setItem(this.sessionKey, JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      countryCode: user.countryCode,
      mobile: user.mobile,
      accountType: user.accountType,
      type: user.type,
      category: user.accountType
    }));

    return {
      status: true,
      message: 'Login successful.',
      token
    };
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): Pick<LocalRentalUser, 'id' | 'name' | 'email' | 'countryCode' | 'mobile' | 'accountType' | 'type'> | null {
    const currentUser = sessionStorage.getItem(this.sessionKey);
    return currentUser ? JSON.parse(currentUser) : null;
  }

  private getUsers(): LocalRentalUser[] {
    const users = localStorage.getItem(this.usersKey);
    return users ? JSON.parse(users) : [];
  }
}

import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  constructor(private commonService: CommonService, private router: Router) {
    this.isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    const loginedInfo = sessionStorage.getItem('userinfo');
    if (loginedInfo) {
      this.commonService.loginedUserInfo = JSON.parse(loginedInfo);
    }
  }
  set setLogin(isLoggedIn: boolean) {
    sessionStorage.setItem('isAuthenticated', '' + isLoggedIn); // Store login state
    this.isAuthenticated = isLoggedIn;
  }
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
  logOutApplication() {
    this.isAuthenticated = false;
    sessionStorage.removeItem('userinfo');
    sessionStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }
}

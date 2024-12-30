import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _apiUrl: string = environment._apiUrl;

  constructor(private http: HttpClient) {}
  public saveUserInfo(userSavePayload: any) {
    return this.http.post<any>(`${this._apiUrl}users`, userSavePayload);
  }
  public getUserList() {
    return this.http.get<any>(`${this._apiUrl}users`);
  }
  public getUserSpecificInfo(userId: any) {
    return this.http.get<any>(`${this._apiUrl}users/:${userId}`);
  }
  public updateUserInfo(userSavePayload: any) {
    return this.http.put<any>(`${this._apiUrl}users`, userSavePayload);
  }
  public deleteUser(userId: any, userSavePayload: any) {
    return this.http.put<any>(
      `${this._apiUrl}users/:${userId}`,
      userSavePayload
    );
  }
  public userLogin(loginPayload: any) {
    return this.http.post<any>(`${this._apiUrl}users/login`, loginPayload);
  }

  public updateUserStatus(userId: any,userSavePayload: any) {
    return this.http.put<any>(`${this._apiUrl}users/${userId}/status`, userSavePayload);
  }
}

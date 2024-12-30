import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDashboardService {
  private _apiUrl: string = environment._apiUrl;
  constructor(private http: HttpClient) {}
  public getEmployeeDashboardCount(employeeId: string) {
    return this.http.get<any>(`${this._apiUrl}employee/${employeeId}/stats`);
  }
}

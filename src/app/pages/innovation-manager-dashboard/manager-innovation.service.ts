import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ManagerInnovationService {
  private _apiUrl: string = environment._apiUrl;
  constructor(private http: HttpClient) {}
  public getAllIdeaCount() {
    return this.http.get<any>(`${this._apiUrl}ideas/all/ideaCount`);
  }
}

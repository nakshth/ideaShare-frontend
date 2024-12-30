import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UploadInnovationIdeasService {
  private _apiUrl: string = environment._apiUrl;

  constructor(private http: HttpClient) {}
  public createIdea(userSavePayload: any) {
    return this.http.post<any>(`${this._apiUrl}ideas`, userSavePayload);
  }
  public getIdeas() {
    return this.http.get<any>(`${this._apiUrl}ideas`);
  }
  public getIdeaById(userId: any) {
    return this.http.get<any>(`${this._apiUrl}ideas/:${userId}`);
  }
  public updateIdea(userSavePayload: any, ideaId: any) {
    return this.http.put<any>(
      `${this._apiUrl}ideas/${ideaId}`,
      userSavePayload
    );
  }
  public deleteIdea(userId: any) {
    return this.http.delete<any>(`${this._apiUrl}ideas/${userId}`);
  }
  public updateIdeaStatus(id: any, ideaPayload: any) {
    return this.http.put<any>(`${this._apiUrl}ideas/${id}/status`, ideaPayload);
  }
  public getIdeasByUser(employeeId: string) {
    return this.http.get<any>(`${this._apiUrl}ideas/${employeeId}/user`);
  }
  public giveReward(id: any, ideaPayload: any) {
    return this.http.patch<any>(
      `${this._apiUrl}ideas/${id}/reward`,
      ideaPayload
    );
  }
  public getIdeasWithUserInfo() {
    return this.http.get<any>(`${this._apiUrl}ideas/indeaInfo/WithUserInfo`);
  }
  voteIdea(id: any, ideaPayload: any) {
    return this.http.post<any>(`${this._apiUrl}ideas/${id}/like`, ideaPayload);
  }
  unVoteIdea(id: any, ideaPayload: any) {
    return this.http.post<any>(`${this._apiUrl}ideas/${id}/unlike`, ideaPayload);
  }
}

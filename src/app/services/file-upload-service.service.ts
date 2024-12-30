import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileUploadServiceService {
  private _apiUrl: string = environment._apiUrl;

  constructor(private http: HttpClient) {}
  uploadFile(selectedFile: File) {
    const formData: FormData = new FormData();
    formData.append('file', selectedFile);
    return this.http.post<{ [key: string]: string }>(
      `${this._apiUrl}files/upload`,
      formData
    );
  }
}

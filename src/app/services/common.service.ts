import { Injectable } from '@angular/core';
export interface UserModel {
  id: string;
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  password?: string;
  role?: string;
  creationDate: Date;
  modificationDate: Date;
  jwt: string;
  phone?: string;
  profileImage?: string;
  assignedTo?: string[];
  approved?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public loginedUserInfo!: UserModel;

  constructor() {}
}

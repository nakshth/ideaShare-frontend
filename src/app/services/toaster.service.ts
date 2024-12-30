import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor() {}
  confirm(title: string = "", text: string): Promise<any> {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1de9b6',
      cancelButtonColor: '#f44236',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: false
    });
  }

  success(title: string, text: string): Promise<any> {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#1de9b6',
      confirmButtonText: 'Ok',
      allowOutsideClick: false
    });
  }

  danger(title: string, text: string): Promise<any> {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      showCancelButton: false,
      confirmButtonColor: '#1de9b6',
      confirmButtonText: 'Ok',
      allowOutsideClick: false
    });
  }

  info(title: string, text: string): Promise<any> {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'info',
      showCancelButton: false,
      confirmButtonColor: '#1de9b6',
      confirmButtonText: 'Ok',
      allowOutsideClick: false
    });
  }
}

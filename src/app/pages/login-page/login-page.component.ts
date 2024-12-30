import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ToasterService } from '../../services/toaster.service';
import { AuthService } from '../../services/auth.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [HttpClientModule, UserService, AuthService],

  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  public loginForm!: FormGroup;
  private destroy$ = new Subject<void>();
  constructor(
    private formBuilder: FormBuilder,
    private toasterService: ToasterService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    if (this.authService.isLoggedIn()) {
      this.navigateDashboard();
    }
  }
  onSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.userService
        .userLogin(this.loginForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (result) => {
            if (result.success) {
              this.authService.setLogin = true;
              this.commonService.loginedUserInfo = result.user;
              sessionStorage.setItem('userinfo', JSON.stringify(result.user));
              this.toasterService.success('Success', result.message).then(() => {
                this.navigateDashboard();
              });
            } else {
              this.toasterService.danger(
                'Error',
                'Error while saving user informations'
              );
            }
          },
          error: (err) => {
            this.toasterService.danger('Error', err.error.message);
          },
        });
    }
  }
  openCreateAccount() {
    this.router.navigate(['/register']);
  }
  navigateDashboard(){
    const userInfo = JSON.parse(sessionStorage.getItem("userinfo") ?? '');
    switch(userInfo.role){
      case'EMPLOYEE' :
      this.router.navigate(['/member-dashboard']);
      break
      case'INNOVATION MANAGER' :
      this.router.navigate(['/innovation-manager-dashboard']);
      break
      case 'DECISION MAKER':
        this.router.navigate(['decision-maker-dashboard']);
      break;
      case 'Admin':
        this.router.navigate(['admin-dashboard']);
      break;
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormValidators } from '../validators/form-validators';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToasterService } from '../../services/toaster.service';
import { FileUploadServiceService } from '../../services/file-upload-service.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, HttpClientModule],
  providers: [HttpClientModule, FileUploadServiceService, UserService],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
})
export class RegistrationPageComponent {
  @Input() isEditMode: boolean = false;
  public getPasswordError: (arg1: FormGroup, arg2: string) => boolean;
  public isFieldInvalid: (arg1: FormGroup, arg2: string) => boolean | undefined;
  public isPasswordMismatch: (
    arg1: FormGroup,
    arg2: string,
    arg3: string
  ) => boolean | null;
  public createAccountForm!: FormGroup;
  private formValidator = new FormValidators();
  private destroy$ = new Subject<void>();
  public roleLists: any = [
    { displayName: 'Employee', value: 'EMPLOYEE' },
    { displayName: 'Innovation Manager', value: 'INNOVATION MANAGER' },
    { displayName: 'Decision Maker', value: 'DECISION MAKER' }
  ]
  public imageUrl: string =
    '../assets/images/authentication/img-placeholder.jpg';
  public MAX_FILE_SIZE: number = 5 * 1024 * 1024; // 5 MB
  public ALLOWED_FILE_TYPES: string[] = [
    'image/png',
    'image/jpeg',
    'image/jpg',
  ];
  public isChecked: boolean = true;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toasterService: ToasterService,
    private userService: UserService,
    private fileUploadService: FileUploadServiceService
  ) {
    this.createAccountForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        profileImage: [null],
        email: ['', [Validators.required, Validators.email]],
        role: ['', [Validators.required]],
        mobile: [
          '',
          [Validators.required, Validators.pattern('^\\+?\\d{10,15}$')],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            this.formValidator.customPasswordValidator,
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.formValidator.passwordMatchValidator.bind(
          this.createAccountForm
        ),
      }
    );
    this.isFieldInvalid = this.formValidator.isFieldInvalid;
    this.getPasswordError = this.formValidator.getPasswordError;
    this.isPasswordMismatch = this.formValidator.isPasswordMismatch;
  }
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const selectedFile = files[0];
    if (!this.ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      this.toasterService.danger('Error', 'Only PNG and JPEG files are allowed');
      return;
    }
    if (selectedFile.size > this.MAX_FILE_SIZE) {
      this.toasterService.danger('Error', 'File size should not exceed 5MB!');
      return;
    }
    this.fileUploadService
      .uploadFile(selectedFile)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result: any) => {
          if (result?.file?.url) {
            this.imageUrl = result?.file?.url;
            this.createAccountForm
              .get('profileImage')
              ?.setValue(result?.file?.url);
          }
        },
        error: (err) => {
          this.toasterService.danger('Error', 'Only PNG and JPEG files are allowed');
        },
      });
  }
  triggerFileInput(): void {
    const fileInput: HTMLElement = document.querySelector('#fileInput')!;
    fileInput.click();
  }
  onSubmit() {
    this.createAccountForm.markAllAsTouched();
    if (this.createAccountForm.valid) {
      if (!this.isChecked) {
        this.toasterService.danger(
          'Error',
          'Please agree to all the Terms & Condition'
        );
      } else {
        this.userService
          .saveUserInfo(this.createAccountForm.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (isSuccesFull) => {
              if (isSuccesFull.success) {
                this.toasterService
                  .success(
                    'Success',
                    'User succesfully created. Please contact adminstrator for approval'
                  )
                  .then(() => {
                    this.createAccountForm.reset();
                    setTimeout(() => {
                      this.router.navigate(['/login']);
                    }, 100);
                  });
              } else {
                this.toasterService.danger(
                  'Error',
                  'Error while saving user informations'
                );
              }
            },
            error: (error: any) => {
              this.toasterService.danger(
                'Error',
                error?.error?.message ?? 'Error while saving user informations'
              );
            },
          });
      }
    } else {
      console.error('Form is invalid');
    }
  }
  openLoginAccount() {
    this.router.navigate(['/login']);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

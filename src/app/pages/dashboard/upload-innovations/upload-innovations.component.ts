import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { FormValidators } from '../../validators/form-validators';
import { Subject, takeUntil } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ToasterService } from '../../../services/toaster.service';
import { FileUploadServiceService } from '../../../services/file-upload-service.service';
import { UploadInnovationIdeasService } from '../../../services/upload-innovation-ideas.service';
import { CommonService } from '../../../services/common.service';
@Component({
  selector: 'app-upload-innovations',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
  ],
  providers: [
    HttpClientModule,
    CommonService,
    FileUploadServiceService,
    UploadInnovationIdeasService,
  ],
  templateUrl: './upload-innovations.component.html',
  styleUrl: './upload-innovations.component.scss',
})
export class UploadInnovationsComponent {
  @Input() editInnovation: any;
  isChecked: boolean = false;
  public getPasswordError: (arg1: FormGroup, arg2: string) => boolean;
  public isFieldInvalid: (arg1: FormGroup, arg2: string) => boolean | undefined;
  public isPasswordMismatch: (
    arg1: FormGroup,
    arg2: string,
    arg3: string
  ) => boolean | null;
  public ideaSubmissionForm!: FormGroup;
  private formValidator = new FormValidators();
  private destroy$ = new Subject<void>();
  public MAX_FILE_SIZE: number = 5 * 1024 * 1024; // 5 MB
  public ALLOWED_FILE_TYPES: string[] = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'application/pdf',
    'application/msword', // For .doc
  ];
  categories = ['Innovation', 'Productivity', 'Cost-Saving'];
  uploadedFiles: string[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private toasterService: ToasterService,
    private fileUploadService: FileUploadServiceService,
    private commonService: CommonService,
    private uploadInnovationIdeasService: UploadInnovationIdeasService
  ) {
    this.ideaSubmissionForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      file: [null],
    });
    this.isFieldInvalid = this.formValidator.isFieldInvalid;
    this.getPasswordError = this.formValidator.getPasswordError;
    this.isPasswordMismatch = this.formValidator.isPasswordMismatch;
  }
  ngOnInit(): void {
    if (this.editInnovation) {
      const formElements = {
        title: this.editInnovation.title,
        file: '',
        description: this.editInnovation.description,
        category: this.editInnovation.category,
      };
      this.ideaSubmissionForm.setValue(formElements);
      this.uploadedFiles = this.editInnovation.files;
    }
  }
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const selectedFile = files[0];
    if (!this.ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      this.toasterService.danger(
        'Error',
        'Un-supported file format'
      );
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
            this.uploadedFiles = this.uploadedFiles.concat(result?.file?.url);
          }
        },
        error: (err) => {
          this.toasterService.danger(
            'Error',
            'Un-supported file format'
          );
        },
      });
  }
  onSubmit() {
    let lastSubmittedId = '';
    if (sessionStorage.getItem('userinfo')) {
      const userInfo = JSON.parse(sessionStorage.getItem('userinfo') ?? '');
      lastSubmittedId = userInfo?._id;
    }
    this.ideaSubmissionForm.markAllAsTouched();
    if (this.ideaSubmissionForm.valid) {
      if (this.editInnovation) {
        this.uploadInnovationIdeasService
          .updateIdea(
            {
              ...this.ideaSubmissionForm.value,
              submittedBy: lastSubmittedId,
              files: this.uploadedFiles,
            },
            this.editInnovation._id
          )
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (isSuccesFull) => {
              if (isSuccesFull.success) {
                this.toasterService
                  .success('Success', 'Your Idea succesfully updated.')
                  .then(() => {
                    this.ideaSubmissionForm.reset();
                    this.uploadedFiles = [];
                  });
              } else {
                this.toasterService.danger(
                  'Error',
                  isSuccesFull?.message ?? 'Error while updating Ideas'
                );
              }
            },
            error: (error: any) => {
              this.toasterService.danger(
                'Error',
                error?.error?.message ?? 'Error while updating Ideas'
              );
            },
          });
      } else {
        this.uploadInnovationIdeasService
          .createIdea({
            ...this.ideaSubmissionForm.value,
            submittedBy: lastSubmittedId,
            files: this.uploadedFiles,
          })
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (isSuccesFull) => {
              if (isSuccesFull.success) {
                this.toasterService
                  .success('Success', 'Your Idea succesfully created.')
                  .then(() => {
                    this.ideaSubmissionForm.reset();
                    this.uploadedFiles = [];
                  });
              } else {
                this.toasterService.danger(
                  'Error',
                  isSuccesFull?.message ?? 'Error while saving Ideas'
                );
              }
            },
            error: (error: any) => {
              this.toasterService.danger(
                'Error',
                error?.error?.message ?? 'Error while saving Ideas'
              );
            },
          });
      }
    } else {
      console.error('Form is invalid');
    }
  }
}

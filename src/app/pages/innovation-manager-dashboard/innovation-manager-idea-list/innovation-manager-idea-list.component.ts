import { Component, ElementRef, ViewChild } from '@angular/core';
import { UploadInnovationIdeasService } from '../../../services/upload-innovation-ideas.service';
import { ToasterService } from '../../../services/toaster.service';
import { SidebarService } from '../../../services/sidebar.service';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormValidators } from '../../validators/form-validators';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-innovation-manager-idea-list',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [HttpClientModule, UploadInnovationIdeasService],
  templateUrl: './innovation-manager-idea-list.component.html',
  styleUrl: './innovation-manager-idea-list.component.scss',
})
export class InnovationManagerIdeaListComponent {
  searchText: string = '';
  showIdeaPreview: boolean = false;
  showActionModal: boolean = false;
  itemsPerPage: number = 10;
  entriesOptions: number[] = [5, 10, 15, 25];
  public suggestionForm!: FormGroup;
  public rewardsPointsForm!: FormGroup;
  p: number = 1; // Page number for pagination
  ideasList: any[] = []; // Initialize with your data or fetch from a service
  sortColumn: keyof any = 'name'; // Default sorting column
  sortDirection: 'asc' | 'desc' = 'asc'; // Default sorting direction
  selectedIdea: any = {};
  selectedStatus: string = '';
  showRewardsPoints: boolean = false;
  private destroy$ = new Subject<void>();
  public isFieldInvalid: (arg1: FormGroup, arg2: string) => boolean | undefined;
  private formValidator = new FormValidators();
  filterStatus = ['Submitted', 'In Progress', 'Approved', 'Rejected'];
  statusList = ['In Progress', 'Approved', 'Rejected'];

  constructor(
    private uploadInnovationIdeasService: UploadInnovationIdeasService,
    private toasterService: ToasterService,
    private sidebarService: SidebarService,
    private formBuilder: FormBuilder
  ) {
    this.isFieldInvalid = this.formValidator.isFieldInvalid;
  }
  ngOnInit() {
    this.fetchAllIdeaList();
    this.suggestionForm = this.formBuilder.group({
      status: ['', Validators.required],
      suggestions: ['', Validators.required],
    });
    this.rewardsPointsForm = this.formBuilder.group({
      rewardsPoints: ['', Validators.required],
      comments: ['', Validators.required],
    });
  }

  // Filter and sort functionality for students
  get filteredStudents(): any[] {
    return this.sortedStudents.filter((student) =>
      Object.values(student).some(
        (value) =>
          value
            ?.toString()
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) &&
          student?.status?.includes(this.selectedStatus)
      )
    );
  }
  fetchAllIdeaList() {
    this.uploadInnovationIdeasService.getIdeas().subscribe((result) => {
      this.ideasList = result;
    });
  }
  get sortedStudents(): any[] {
    const sortedStudents = [...this.ideasList];
    sortedStudents.sort((a, b) => {
      const aValue = a[this.sortColumn];
      const bValue = b[this.sortColumn];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        return 0;
      }
    });
    return sortedStudents;
  }

  sortBy(column: keyof any): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }
  editIdea(idea: any) {
    if (idea.status === 'Submitted') {
      this.toasterService
        .confirm('Confirm', 'Are you sure do you want to edit this record?')
        .then((result) => {
          if (result.isConfirmed) {
            this.sidebarService.setEditInnovation(idea);
          }
        });
    } else {
      this.toasterService.info(
        'Warning',
        `Sorry!! You can't edit ${idea.status} idea`
      );
    }
  }
  showPreview(idea: any) {
    this.showIdeaPreview = true;
    this.selectedIdea = idea;
  }
  closePreview() {
    this.showIdeaPreview = false;
    this.selectedIdea = {};
  }
  showActionPopup(idea: any) {
    let providedBy = '';
    let userInfo;
    if (sessionStorage.getItem('userinfo')) {
      userInfo = JSON.parse(sessionStorage.getItem('userinfo') ?? '');
      providedBy = userInfo?._id;
    }
    if (idea.status === 'Completed') {
      this.toasterService.info('Warning', `This already in Completed state`);
      return;
    }
    if (['Admin', 'DECISION MAKER'].includes(userInfo.role)) {
      if (idea.status === 'Approved') {
        this.showRewardsPoints = true;
        this.selectedIdea = idea;
      } else {
        if (
          providedBy === idea.updatedBy &&
          ['Rejected'].includes(idea.status) &&
          userInfo.role !== 'Admin'
        ) {
          this.toasterService.danger(
            'Warning',
            `Further actions Prevented for this record. Your changed the Status into ${idea.status} `
          );
        } else {
          this.closesActionPopup();
          this.selectedIdea = idea;
          this.showActionModal = true;
        }
      }
    } else {
      if (['Rejected', 'Approved'].includes(idea.status)) {
        this.toasterService.danger(
          'Warning',
          `Further actions Prevented for this record. Your changed the Status into ${idea.status} `
        );
      } else {
        this.closesActionPopup();
        this.selectedIdea = idea;
        this.showActionModal = true;
      }
    }
  }
  closesActionPopup() {
    this.selectedIdea = {};
    this.showActionModal = false;
  }
  onSubmit() {
    let providedBy = '';
    if (sessionStorage.getItem('userinfo')) {
      const userInfo = JSON.parse(sessionStorage.getItem('userinfo') ?? '');
      providedBy = userInfo?._id;
    }
    this.suggestionForm.markAllAsTouched();
    if (this.suggestionForm.valid) {
      if (this.selectedIdea) {
        this.uploadInnovationIdeasService
          .updateIdeaStatus(this.selectedIdea._id, {
            ...this.suggestionForm.value,
            providedBy: providedBy,
          })
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (isSuccesFull) => {
              if (isSuccesFull.success) {
                this.closesActionPopup();
                this.fetchAllIdeaList();
                this.toasterService
                  .success('Success', 'Idea"s suggestions updated')
                  .then(() => {
                    this.suggestionForm.reset();
                  });
              } else {
                this.toasterService.danger(
                  'Error',
                  isSuccesFull?.message ?? 'Error while updating'
                );
              }
            },
            error: (error: any) => {
              this.toasterService.danger(
                'Error',
                error?.error?.message ?? 'Error while updating'
              );
            },
          });
      }
    } else {
      console.error('Form is invalid');
    }
  }
  onRewardsPointsSubmit() {
    let providedBy = '';
    if (sessionStorage.getItem('userinfo')) {
      const userInfo = JSON.parse(sessionStorage.getItem('userinfo') ?? '');
      providedBy = userInfo?._id;
    }
    this.rewardsPointsForm.markAllAsTouched();
    if (this.rewardsPointsForm.valid) {
      if (this.selectedIdea) {
        this.uploadInnovationIdeasService
          .giveReward(this.selectedIdea._id, {
            ...this.rewardsPointsForm.value,
            providedBy: providedBy,
          })
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (isSuccesFull) => {
              if (isSuccesFull.success) {
                this.closesActionPopup();
                this.fetchAllIdeaList();
                this.toasterService
                  .success('Success', 'Rewards succesfully given')
                  .then(() => {
                    this.closeRewardsPoints();
                    this.rewardsPointsForm.reset();
                  });
              } else {
                this.toasterService.danger(
                  'Error',
                  isSuccesFull?.message ?? 'Error giving Rewards '
                );
              }
            },
            error: (error: any) => {
              this.toasterService.danger(
                'Error',
                error?.error?.message ?? 'Error giving Rewards'
              );
            },
          });
      }
    } else {
      console.error('Form is invalid');
    }
  }
  closeRewardsPoints() {
    this.showRewardsPoints = false;
  }
}

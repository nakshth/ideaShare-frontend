import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UploadInnovationIdeasService } from '../../../services/upload-innovation-ideas.service';
import { ToasterService } from '../../../services/toaster.service';
import { SidebarService } from '../../../services/sidebar.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-innovation-list',
  standalone: true,
  imports: [BreadcrumbComponent, CommonModule, HttpClientModule,FormsModule],
  providers: [HttpClientModule, UploadInnovationIdeasService],
  templateUrl: './employee-innovation-list.component.html',
  styleUrl: './employee-innovation-list.component.scss',
})
export class EmployeeInnovationListComponent {
  searchText: string = '';
  ideasList: any[] = []; // Initialize with your data or fetch from a service
  sortColumn: keyof any = 'name'; // Default sorting column
  sortDirection: 'asc' | 'desc' = 'asc'; // Default sorting direction
  constructor(
    private uploadInnovationIdeasService: UploadInnovationIdeasService,
    private toasterService: ToasterService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.fetchIdeaList();
  }

  // Filter and sort functionality for students
  get filteredStudents(): any[] {
    if (!this.searchText) return this.sortedStudents;
    return this.sortedStudents.filter((student) =>
      Object.values(student).some((value) =>
        value?.toString().toLowerCase().includes(this.searchText.toLowerCase())
      )
    );
  }
  fetchIdeaList() {
    let lastSubmittedId = '';
    if (sessionStorage.getItem('userinfo')) {
      const userInfo = JSON.parse(sessionStorage.getItem('userinfo') ?? '');
      lastSubmittedId = userInfo?._id;
    }
    this.uploadInnovationIdeasService
      .getIdeasByUser(lastSubmittedId)
      .subscribe((result) => {
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
  deleteIdea(idea: any) {
    if (idea.status === 'Submitted') {
      this.toasterService
        .confirm('Confirm', 'Are you sure you do want to delete this record?')
        .then((result) => {
          if (result.isConfirmed) {
            this.uploadInnovationIdeasService.deleteIdea(idea._id).subscribe({
              next: (result) => {
                if (result.message) {
                  this.fetchIdeaList();
                  this.toasterService.success('Success', result.message);
                } else {
                  this.toasterService.success('Error', result.message);
                }
              },
              error: () => {
                this.toasterService.success(
                  'Error',
                  'Error While deleting Idea'
                );
              },
            });
          }
        });
    } else {
      this.toasterService.info(
        'Warning',
        `Sorry!! You can't delete ${idea.status} idea`
      );
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
}

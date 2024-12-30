import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserService } from '../../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ToasterService } from '../../../services/toaster.service';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-innovation-manager-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule, HttpClientModule,BreadcrumbComponent],
  providers: [HttpClientModule, UserService],
  templateUrl: './innovation-manager-list.component.html',
  styleUrl: './innovation-manager-list.component.scss',
})
export class InnovationManagerListComponent {
  searchText: string = '';
  itemsPerPage: number = 20;
  entriesOptions: number[] = [5, 10, 15, 25];
  p: number = 1; // Page number for pagination
  innovationmanagerList: any[] = []; // Initialize with your data

  constructor(
    private userService: UserService,
    private toasterService: ToasterService
  ) {
    this.fetchUsers();
  }
  fetchUsers() {
    this.userService.getUserList().subscribe((result) => {
      if (result?.data?.length) {
        this.innovationmanagerList = result?.data?.filter(
          (ele: { role: string }) => ele.role == 'INNOVATION MANAGER'
        );
      }
    });
  }
  // Filtered data based on search text
  get filteredUsers(): any[] {
    if (!this.searchText) return this.innovationmanagerList;
    return this.innovationmanagerList.filter((user) =>
      Object.values(user).some((value) =>
        value?.toString().toLowerCase().includes(this.searchText.toLowerCase())
      )
    );
  }

  // Paginated data
  get paginatedUsers(): any[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, endIndex);
  }

  // Handle page changes
  onPageChange(page: number): void {
    this.p = page;
  }

  // Handle items per page changes
  onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.p = 1; // Reset to the first page when items per page changes
  }
  deleteUser(user: any) {
    if (user.status === 'Disabled') {
      this.toasterService
        .confirm('Warning', 'Are you sure do you want to Active the user')
        .then((result) => {
          if (result.isConfirmed) {
            this.userService
              .updateUserStatus(user._id, { status: 'Active' })
              .subscribe((result) => {
                if (result.message) {
                  this.fetchUsers();
                  this.toasterService.confirm('Success', result.message);
                } else {
                  this.toasterService.confirm(
                    'Error',
                    'Error while deleting user'
                  );
                }
              });
          }
        });
    } else {
      this.toasterService
        .confirm('Warning', 'Are you sure ? do you want to disable the user')
        .then((result) => {
          if (result.isConfirmed) {
            this.userService
              .updateUserStatus(user._id, { status: 'Disabled' })
              .subscribe((result) => {
                if (result.message) {
                  this.fetchUsers();
                  this.toasterService.confirm('Success', result.message);
                } else {
                  this.toasterService.confirm(
                    'Error',
                    'Error while deleting user'
                  );
                }
              });
          }
        });
    }
  }
}

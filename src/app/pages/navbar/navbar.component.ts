import { Component, HostListener } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { LeftSideSectionComponent } from '../left-side-section/left-side-section.component';
import { RightSideSectionComponent } from '../right-side-section/right-side-section.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LeftSideSectionComponent, RightSideSectionComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isNotificationDropdownOpen = false;
  isProfileDropdownOpen = false;
  isModeDropdownOpen = false;
  showOffcanvas = false;
  isdropdownopen = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    const dropdowns = [
      document.querySelector('#notificationDropdown'),
      document.querySelector('#profileDropdown'),
      document.querySelector('#modeDropdown'),
    ];

    // Close all dropdowns if click is outside any dropdown
    if (
      dropdowns.every(
        (dropdown) => dropdown && !dropdown.contains(clickedElement)
      )
    ) {
      this.closeAllDropdowns();
    }
  }
  isSidebarHidden = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.sidebarHidden$.subscribe((hidden) => {
      this.isSidebarHidden = hidden;
    });
  }
  toggleNotificationDropdown(): void {
    this.closeAllDropdowns();
    this.isNotificationDropdownOpen = !this.isNotificationDropdownOpen;
  }

  toggleProfileDropdown(): void {
    this.closeAllDropdowns();
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  toggleModeDropdown(): void {
    this.closeAllDropdowns();
    this.isModeDropdownOpen = !this.isModeDropdownOpen;
  }

  toggleDropdown(): void {
    this.closeAllDropdowns();
    this.isdropdownopen = !this.isdropdownopen;
  }

  toggleOffcanvas(): void {
    this.closeAll(); // Close all dropdowns before toggling offcanvas

    this.showOffcanvas = !this.showOffcanvas;

    const offcanvasElement = document.querySelector('#offcanvas_pc_layout');
    if (offcanvasElement) {
      if (this.showOffcanvas) {
        offcanvasElement.classList.add('show');
      } else {
        offcanvasElement.classList.remove('show');
      }
    }
  }
  closeAll(): void {
    this.isNotificationDropdownOpen = false;
    this.isProfileDropdownOpen = false;
    this.isModeDropdownOpen = false;
    this.isdropdownopen = false;
    this.showOffcanvas = false;
  }
  private closeAllDropdowns(): void {
    this.isNotificationDropdownOpen = false;
    this.isProfileDropdownOpen = false;
    this.isModeDropdownOpen = false;
    this.isdropdownopen = false;
  }

  toggleSidebar(): void {
    const sidebarElements = document.querySelectorAll('.pc-sidebar');

    sidebarElements.forEach((element) => {
      if (element.classList.contains('pc-sidebar-hide')) {
        element.classList.remove('pc-sidebar-hide');
      } else {
        element.classList.add('pc-sidebar-hide');
      }
    });
  }
}

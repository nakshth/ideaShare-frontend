import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-left-side-section',
  standalone: true,
  imports: [],
  templateUrl: './left-side-section.component.html',
  styleUrl: './left-side-section.component.scss'
})
export class LeftSideSectionComponent {
  constructor(private sidebarService: SidebarService) {}

  // Method to toggle sidebar visibility
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
  toggleSidebarMobile() {
    this.sidebarService.toggleSidebar();
  }
}

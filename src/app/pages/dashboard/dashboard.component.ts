import { Component, QueryList, ViewChildren } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { LayoutSettingsService } from '../../services/layout-settings.service';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  NgbDropdown,
  NgbModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { UploadInnovationsComponent } from './upload-innovations/upload-innovations.component';
import { EmployeeInnovationListComponent } from './employee-innovation-list/employee-innovation-list.component';
import { OthersInnovationsComponent } from './others-innovations/others-innovations.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    CommonModule,
    NgbModule,
    NgbTooltipModule,
    EmployeeDashboardComponent,
    UploadInnovationsComponent,
    EmployeeInnovationListComponent,
    OthersInnovationsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  settings: any = {
    themeMode: 'dark', // 'light' | 'dark' | 'default'
    sidebarTheme: 'dark', // 'light' | 'dark'
    accentColor: 'preset-1',
    sidebarCaption: true,
    rtl: false,
    containerWidth: false,
  };
  public employeeNavItems: any = [
    {
      menuName: 'Member',
      menuItems: [
        {
          text: 'Dashboard',
          icon: 'ph-gauge',
          link: '/statistics',
          isLeadingPageIcon: false,
          open: true,
          subMenus: [],
        },
        {
          text: 'Innovation List',
          link: '/contact-search',
          icon: 'ph-projector-screen-chart',
          isLeadingPageIcon: false,
          subMenus: [],
        },
        {
          text: 'Upload Innovation',
          link: '/course-view',
          icon: 'ph-upload',
          isLeadingPageIcon: false,
          subMenus: [],
        },
        {
          text: 'Others Innovations',
          link: '/contact-search',
          icon: 'ph-users',
          isLeadingPageIcon: false,
          subMenus: [],
        },
      ],
    },
  ];
  activePanel: any = {
    text: 'Dashboard',
    icon: 'ph-gauge',
    link: '/statistics',
    isLeadingPageIcon: false,
    subMenus: [],
  };
  isSidebarHidden = false;
  editInnovation: any = {};
  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.sidePanelSelection$.subscribe((activePanel) => {
      this.activePanel = activePanel;
      this.editInnovation = null;
    });
    this.sidebarService.editInnovationIdea$.subscribe((editValue) => {
      this.editInnovation = editValue;
      this.activePanel = {
        text: 'Upload Innovation',
        link: '/course-view',
        icon: 'ph-upload',
        isLeadingPageIcon: false,
        subMenus: [],
      };
      this.employeeNavItems[0].menuItems.forEach((ele: any, index: number) => {
        ele.open = index + 1 === this.employeeNavItems[0].menuItems.length;
      });
    });
    this.sidebarService.sidebarHidden$.subscribe((hidden) => {
      this.isSidebarHidden = hidden;
    });
  }
}

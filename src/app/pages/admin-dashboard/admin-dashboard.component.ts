import { Component } from '@angular/core';
import { InnovationManagerIdeaListComponent } from '../innovation-manager-dashboard/innovation-manager-idea-list/innovation-manager-idea-list.component';
import { DecisionDashboardComponent } from '../decistion-maker-dashboard/decision-dashboard/decision-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../../services/sidebar.service';
import { AdminInnerDashboardComponent } from './admin-inner-dashboard/admin-inner-dashboard.component';
import { DescisionMakerListComponent } from './descision-maker-list/descision-maker-list.component';
import { InnovationManagerListComponent } from './innovation-manager-list/innovation-manager-list.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { RegistrationPageComponent } from '../registration-page/registration-page.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    CommonModule,
    NgbModule,
    AdminInnerDashboardComponent,
    InnovationManagerIdeaListComponent,
    DescisionMakerListComponent,
    InnovationManagerListComponent,
    EmployeeListComponent,
    RegistrationPageComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
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
      menuName: 'Admin',
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
          text: 'Employee List',
          link: '/applications-users-list',
          icon: 'ph-user-circle',
          isLeadingPageIcon: false,
          subMenus: [],
        },
        {
          text: 'Innovation Manager List',
          link: '/applications-users-list',
          icon: 'ph-user-circle-gear',
          isLeadingPageIcon: false,
          subMenus: [],
        },
        {
          text: 'Decision Maker List',
          link: '/applications-users-list',
          icon: 'ph-user-circle-plus',
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
  showEditModel: boolean = false
  showEditConatiner: boolean = false
  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.sidePanelSelection$.subscribe((activePanel) => {
      this.activePanel = activePanel;
    });
    this.sidebarService.editInnovationIdea$.subscribe((editValue) => {
      this.employeeNavItems[0].menuItems.forEach((ele: any, index: number) => {
        ele.open = false;
        if (ele.text === editValue) {
          this.activePanel = ele;
          ele.open = true;
        }
      });
    });
    this.sidebarService.sidebarHidden$.subscribe((hidden) => {
      this.isSidebarHidden = hidden;
    });
    this.sidebarService.openEditAccountDetails$.subscribe(() => {
      this.showEditModel = true;
      setTimeout(() => {
        this.showEditConatiner = true;
      })
    })
  }
}

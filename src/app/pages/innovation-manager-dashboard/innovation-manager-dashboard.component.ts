import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { InnovationManagerIdeaListComponent } from './innovation-manager-idea-list/innovation-manager-idea-list.component';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-innovation-manager-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    CommonModule,
    NgbModule,
    ManagerDashboardComponent,
    InnovationManagerIdeaListComponent,
  ],
  templateUrl: './innovation-manager-dashboard.component.html',
  styleUrl: './innovation-manager-dashboard.component.scss',
})
export class InnovationManagerDashboardComponent {
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
      menuName: 'Innovation Manager',
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
        }
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
    constructor(private sidebarService: SidebarService) {}
  
    ngOnInit(): void {
      this.sidebarService.sidePanelSelection$.subscribe((activePanel) => {
        this.activePanel = activePanel;
      });
      this.sidebarService.sidebarHidden$.subscribe((hidden) => {
        this.isSidebarHidden = hidden;
      });
    }
}

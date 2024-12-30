import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ManagerDashboardComponent } from '../innovation-manager-dashboard/manager-dashboard/manager-dashboard.component';
import { InnovationManagerIdeaListComponent } from '../innovation-manager-dashboard/innovation-manager-idea-list/innovation-manager-idea-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DecisionDashboardComponent } from './decision-dashboard/decision-dashboard.component';

@Component({
  selector: 'app-decistion-maker-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    CommonModule,
    NgbModule,
    DecisionDashboardComponent,
    InnovationManagerIdeaListComponent,
  ],
  templateUrl: './decistion-maker-dashboard.component.html',
  styleUrl: './decistion-maker-dashboard.component.scss',
})
export class DecistionMakerDashboardComponent {
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
      menuName: 'Descision Maker',
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

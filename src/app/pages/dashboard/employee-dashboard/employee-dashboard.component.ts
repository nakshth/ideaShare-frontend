import { Component, QueryList, ViewChildren } from '@angular/core';
import { LayoutSettingsService } from '../../../services/layout-settings.service';
import { SidebarService } from '../../../services/sidebar.service';
import { CommonModule } from '@angular/common';
import {
  NgbDropdown,
  NgbModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeDashboardService } from './employee-dashboard.service';
@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    NgbModule,
    NgbTooltipModule,
    HttpClientModule,
  ],
  providers: [HttpClientModule, EmployeeDashboardService],

  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.scss',
})
export class EmployeeDashboardComponent {
  settings: any = {
    themeMode: 'dark', // 'light' | 'dark' | 'default'
    sidebarTheme: 'dark', // 'light' | 'dark'
    accentColor: 'preset-1',
    sidebarCaption: true,
    rtl: false,
    containerWidth: false,
  };
  memberCount: any = {};
  constructor(
    private settingsService: LayoutSettingsService,
    private sidebarService: SidebarService,
    private employeeDashboardService: EmployeeDashboardService
  ) {}

  ngOnInit(): void {
    let lastSubmittedId = '';
    if (sessionStorage.getItem('userinfo')) {
      const userInfo = JSON.parse(sessionStorage.getItem('userinfo') ?? '');
      lastSubmittedId = userInfo?._id;
    }
    this.settingsService.settings$.subscribe((settings: any) => {
      this.settings = settings;
    });
    this.sidebarService.sidebarHidden$.subscribe((hidden: boolean) => {
      this.isSidebarHidden = hidden;
    });
    this.employeeDashboardService
      .getEmployeeDashboardCount(lastSubmittedId)
      .subscribe((result) => {
        this.memberCount = result;
      });
  }

  isSidebarHidden = false;
  @ViewChildren(NgbDropdown) dropdowns!: QueryList<NgbDropdown>;
  selectedTab: string = 'mon';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}

import { Component, QueryList, ViewChildren } from '@angular/core';
import {
  NgbDropdown,
  NgbModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { LayoutSettingsService } from '../../../services/layout-settings.service';
import { SidebarService } from '../../../services/sidebar.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { ManagerInnovationService } from '../manager-innovation.service';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    NgbModule,
    NgbTooltipModule,
    HttpClientModule,
  ],
  providers: [HttpClientModule, ManagerInnovationService],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.scss',
})
export class ManagerDashboardComponent {
  settings: any = {
    themeMode: 'dark', // 'light' | 'dark' | 'default'
    sidebarTheme: 'dark', // 'light' | 'dark'
    accentColor: 'preset-1',
    sidebarCaption: true,
    rtl: false,
    containerWidth: false,
  };
  managerDashboardCount: any = {};
  constructor(
    private settingsService: LayoutSettingsService,
    private sidebarService: SidebarService,
    private managerInnovationService: ManagerInnovationService
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
    this.managerInnovationService
      .getAllIdeaCount()
      .subscribe((allIdeaCount) => {
        this.managerDashboardCount = allIdeaCount;
      });
  }

  isSidebarHidden = false;
  @ViewChildren(NgbDropdown) dropdowns!: QueryList<NgbDropdown>;
  selectedTab: string = 'mon';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}

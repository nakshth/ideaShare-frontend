import { Component, QueryList, ViewChildren } from '@angular/core';
import { LayoutSettingsService } from '../../../services/layout-settings.service';
import { SidebarService } from '../../../services/sidebar.service';
import { ManagerInnovationService } from '../../innovation-manager-dashboard/manager-innovation.service';
import {
  NgbDropdown,
  NgbModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-decision-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    NgbModule,
    NgbTooltipModule,
    HttpClientModule,
  ],
  providers: [HttpClientModule, ManagerInnovationService],
  templateUrl: './decision-dashboard.component.html',
  styleUrl: './decision-dashboard.component.scss',
})
export class DecisionDashboardComponent {
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

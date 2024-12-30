import { Component, QueryList, ViewChildren } from '@angular/core';
import { ManagerInnovationService } from '../../innovation-manager-dashboard/manager-innovation.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import {
  NgbDropdown,
  NgbModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { LayoutSettingsService } from '../../../services/layout-settings.service';
import { SidebarService } from '../../../services/sidebar.service';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-inner-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    NgbModule,
    NgbTooltipModule,
    HttpClientModule,
    DatePipe ,
    FormsModule
  ],
  providers: [HttpClientModule, ManagerInnovationService,UserService],
  templateUrl: './admin-inner-dashboard.component.html',
  styleUrl: './admin-inner-dashboard.component.scss',
})
export class AdminInnerDashboardComponent {
  settings: any = {
    themeMode: 'dark', // 'light' | 'dark' | 'default'
    sidebarTheme: 'dark', // 'light' | 'dark'
    accentColor: 'preset-1',
    sidebarCaption: true,
    rtl: false,
    containerWidth: false,
  };
  adminDashboardCount: any = {};
  employeeList:any = [];
  innovationmanagerList:any = [];
  decisionmanagerList:any = [];

  constructor(
    private settingsService: LayoutSettingsService,
    private sidebarService: SidebarService,
    private userService:UserService,
    private managerInnovationService: ManagerInnovationService
  ) {}
  users: any[] = [
    {
      name: 'Airi Satou',
      email: 'satou123@gmail.com',
      joiningDate: '2023/09/12',
      avatar: '../assets/images/user/avatar-4.jpg',
    },
    {
      name: 'Ashton Cox',
      email: 'ashton@gmail.com',
      joiningDate: '2023/12/24',
      avatar: '../assets/images/user/avatar-1.jpg',
    },
    {
      name: 'Bradley Greer',
      email: 'greer05@gmail.com',
      joiningDate: '2022/09/19',
      avatar: '../assets/images/user/avatar-2.jpg',
    },
    {
      name: 'Brielle Williamson',
      email: 'bw23@gmail.com',
      joiningDate: '2022/08/22',
      avatar: '../assets/images/user/avatar-3.jpg',
    },
    {
      name: 'Colleen Hurst',
      email: 'hurst006@gmail.com',
      joiningDate: '2022/06/26',
      avatar: '../assets/images/user/avatar-5.jpg',
    },
  ];
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
        this.adminDashboardCount = allIdeaCount;
      });
      this.userService.getUserList().subscribe((result) => {
        if(result?.data?.length){
          this.employeeList = result?.data?.filter(
            (ele: { role: string; }) => ele.role == "EMPLOYEE"
          ).slice(0, 10)
          this.innovationmanagerList = result?.data?.filter(
            (ele: { role: string; }) => ele.role == "INNOVATION MANAGER"
          ).slice(0, 10)
          this.decisionmanagerList = result?.data?.filter(
            (ele: { role: string; }) => ele.role == "DECISION MAKER"
          ).slice(0, 10)
        }
      })
  }

  isSidebarHidden = false;
  @ViewChildren(NgbDropdown) dropdowns!: QueryList<NgbDropdown>;
  selectedTab: string = 'mon';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  gotoUserList(gotoText:any){
    this.sidebarService.setEditInnovation(gotoText);
  }
}

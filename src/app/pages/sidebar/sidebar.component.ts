import { Component, HostListener, Input } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { IconsModule } from '../../Component/icons/icons.module';
import { Menu, MenuItem } from '../../models/layouts.model';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LayoutSettingsService } from '../../services/layout-settings.service';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    HttpClientModule,
    IconsModule,
    SimplebarAngularModule,
    RouterModule,
    NgbCollapseModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isSidebarHidden = false;
  isMobile: boolean = window.innerWidth <= 1024;
  options = { autoHide: true };
  @Input() navItems: Menu[] = [];
  callpseSideBar: boolean = false;
  userInfo:any = {};
  constructor(
    private http: HttpClient,
    private settingService: LayoutSettingsService,
    public router: Router,
    private sidebarService: SidebarService
  ) {}
  ngOnInit(): void {
    this.setActiveMenu(this.router.url);
    if (sessionStorage.getItem('userinfo')) {
      this.userInfo = JSON.parse(sessionStorage.getItem('userinfo') ?? '');
    }
    this.settingService.toggleSideBarSubject$.subscribe((data) => {
      this.callpseSideBar = data;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveMenu(this.router.url);
      }
    });
    this.sidebarService.sidebarHidden$.subscribe((hidden) => {
      this.isSidebarHidden = hidden;
    });
  }
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = (event.target as Window).innerWidth <= 1024;
  }

  toggleSidebarMobile(): void {
    this.sidebarService.toggleSidebar();
  }

  closeSidebar(): void {
    // Explicitly hide the sidebar
    this.sidebarService.setSidebarVisibility(true);
  }

  closeOutSide() {
    this.sidebarService.setSidebarVisibility(true);
    console.log('clicl');
  }

  openLink(item: MenuItem) {
    this.sidebarService.setPanelChange(item);
  }

  setActiveMenu(url: string) {
    this.navItems.forEach((navItem) => {
      navItem.menuItems.forEach((menuItem) => {
        if (menuItem.link === url) {
          this.toggleCollapse(menuItem);
        } else if (menuItem.subMenus) {
          menuItem.subMenus.forEach((subMenu) => {
            if (subMenu.link === url) {
              this.toggleCollapse(menuItem);
              this.toggleInnerSubMenuNew(subMenu, menuItem);
            } else if (subMenu.innerSubMenu) {
              subMenu.innerSubMenu.forEach((innerSubMenu) => {
                if (innerSubMenu.link === url) {
                  this.toggleCollapse(menuItem);
                  this.toggleInnerSubMenuNew(subMenu, menuItem);
                  subMenu.subMenuOpen = true;
                }
              });
            }
          });
        }
      });
    });
  }

  toggleCollapse(menuItem: MenuItem) {
    this.navItems.forEach((navItem) => {
      navItem.menuItems.forEach((item) => {
        if (item !== menuItem) {
          item.open = false;
          item?.subMenus?.forEach((element) => {
            element.subMenuOpen = false;
          });
        }
      });
    });

    menuItem.open = !menuItem.open;
    this.openLink(menuItem);
  }

  toggleInnerSubMenuNew(subMenu: any, menuItem: MenuItem) {
    menuItem.open = true;

    menuItem.subMenus?.forEach((sub) => {
      if (sub !== subMenu) {
        sub.subMenuOpen = false;
      }
    });

    subMenu.subMenuOpen = !subMenu.subMenuOpen;
  }

  trackByMenuIndex(index: number): number {
    return index;
  }

  trackBySubMenuIndex(index: number): number {
    return index;
  }
}

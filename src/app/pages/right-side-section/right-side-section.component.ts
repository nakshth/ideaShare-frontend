import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  NgbDropdown,
  NgbDropdownModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LayoutSettingsService } from '../../services/layout-settings.service';
import { ToasterService } from '../../services/toaster.service';
import { AuthService } from '../../services/auth.service';
import { RegistrationPageComponent } from '../registration-page/registration-page.component';
import { SidebarService } from '../../services/sidebar.service';

interface MenuItem {
  type: any;
  icon: string;
  text: string;
  link?: string;
  children?: any[];
  badge?: number;
  action?: () => void;
  isDropdownOpen?: boolean;
}

@Component({
  selector: 'app-right-side-section',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    NgbDropdownModule,
    NgbTooltipModule,
    SimplebarAngularModule,
  ],
  templateUrl: './right-side-section.component.html',
  styleUrl: './right-side-section.component.scss',
})
export class RightSideSectionComponent {
  @ViewChildren(NgbDropdown) dropdowns: QueryList<NgbDropdown> | undefined;

  settings: any = {
    themeMode: 'dark', // 'light' | 'dark' | 'default'
    sidebarTheme: 'dark', // 'light' | 'dark'
    accentColor: 'preset-1',
    sidebarCaption: true,
    rtl: false,
    containerWidth: false,
  };
  options = { autoHide: true };
  profileImage: string = '';
  showEditModel: boolean = false;
  showEditConatiner: boolean = false;
  constructor(
    private settingsService: LayoutSettingsService,
    private toasterService: ToasterService,
    private authService: AuthService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.settingsService.settings$.subscribe((settings) => {
      this.settings = settings;
    });
    if (sessionStorage.getItem('userinfo')) {
      const userInfo = JSON.parse(sessionStorage.getItem('userinfo') ?? '');
      this.profileImage = userInfo.profileImage;
    }
  }

  updateThemeMode(mode: 'light' | 'dark' | 'default'): void {
    this.settingsService.updateSettings({ themeMode: mode });
  }

  updateSidebarTheme(theme: 'light' | 'dark'): void {
    this.settingsService.updateSettings({ sidebarTheme: theme });
  }

  updateAccentColor(color: string): void {
    this.settingsService.updateSettings({ accentColor: color });
  }

  updateSidebarCaption(show: boolean): void {
    this.settingsService.updateSettings({ sidebarCaption: show });
  }

  updateRtl(isRtl: boolean): void {
    this.settingsService.updateSettings({ rtl: isRtl });
  }

  updateContainerWidth(isFixed: boolean): void {
    this.settingsService.updateSettings({ containerWidth: isFixed });
  }

  resetLayout(): void {
    this.settingsService.resetSettings();
  }

  onToggleDarkMode(event: any) {
    const isChecked = event.target.checked;
    this.updateThemeMode(isChecked ? 'dark' : 'light');
  }

  toggleDropdown(dropdown: NgbDropdown) {
    if (dropdown.isOpen()) {
      dropdown.close();
    } else {
      dropdown.open();
    }
  }
  showSampleMessage() {
    this.toasterService.success(
      'Success',
      'Support request Send. Support Teams will conact you soon'
    );
  }
  logOutApplication() {
    this.authService.logOutApplication();
  }
  openEditModel() {
    this.sidebarService.openEditAccountDetail(true);
  }
}

// layout-settings.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LayoutSettings } from '../models/layouts.model';

@Injectable({
  providedIn: 'root',
})
export class LayoutSettingsService {
  private defaultSettings: LayoutSettings = {
    themeMode: 'dark', // 'light' | 'dark' | 'default'
    sidebarTheme: 'dark', // 'light' | 'dark'
    accentColor: 'preset-1',
    sidebarCaption: true,
    rtl: false,
    containerWidth: false,
    layoutChange: '',
    islanding: '',
    isComponentPage: false,
  };

  private settingsSubject = new BehaviorSubject<LayoutSettings>({
    ...this.defaultSettings,
  });
  settings$ = this.settingsSubject.asObservable();

  public toggleSideBarSubject = new BehaviorSubject<boolean>(false);
  toggleSideBarSubject$ = this.toggleSideBarSubject.asObservable();

  private body = document.body;

  constructor() {}

  getSettings(): LayoutSettings {
    return this.settingsSubject.value;
  }

  updateSettings(newSettings: Partial<LayoutSettings>): void {
    const updatedSettings = { ...this.settingsSubject.value, ...newSettings };
    this.settingsSubject.next(updatedSettings);
    this.handleSettingsChange(newSettings);
  }

  resetSettings(): void {
    this.settingsSubject.next({ ...this.defaultSettings });
    this.handleSettingsChange(this.defaultSettings);
  }

  private handleSettingsChange(newSettings: Partial<LayoutSettings>): void {
    Object.entries(newSettings).forEach(([key, value]) => {
      if (value !== undefined) {
        this.handleSettingChange(key as keyof LayoutSettings, value);
      }
    });
  }

  private handleSettingChange(key: keyof LayoutSettings, value: any): void {
    switch (key) {
      case 'themeMode':
        this.setBodyAttribute(
          'data-pc-theme',
          value === 'default' ? 'light' : value
        );
        break;
      case 'sidebarTheme':
        this.setBodyAttribute('data-pc-sidebar-theme', value);
        break;
      case 'accentColor':
        this.setBodyAttribute('data-pc-preset', value);
        break;
      case 'rtl':
        this.setBodyAttribute('data-pc-direction', value ? 'rtl' : 'ltr');
        break;
      case 'sidebarCaption':
        this.setBodyAttribute('data-pc-sidebar-caption', value.toString());
        break;

      case 'layoutChange':
        const data = value.toString() ? value.toString() : '';

        if (data === 'layout-3') {
          this.setBodyAttribute('class', data);
        } else {
          this.setBodyAttribute('data-pc-layout', data);
        }
        break;

      case 'islanding':
        console.log(value);

        this.setBodyAttribute('class', value);
        break;

      case 'isComponentPage':
        // console.log(value);

        //   this.setBodyAttribute('class', value);
        this.body.classList.toggle('component-page', value);
        // this.body.className(value ? 'iscomponents' : '') ;
        break;
    }
  }

  private setBodyAttribute(attribute: string, value: string): void {
    if (this.body) {
      this.body.setAttribute(attribute, value);
    }
  }
}

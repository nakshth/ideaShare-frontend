export interface Menu {
  menuName: string;
  menuItems: MenuItem[];
}

export interface SubmenuItem {
  text: string;
  link: string;
  subMenuOpen?: boolean;
  innerSubMenu?: InnerSubmenu[];
}

export interface InnerSubmenu {
  text: string;
  link: string;
}
export interface MenuItem {
  text: string;
  icon: string;
  badge?: string;
  open?: boolean;
  link?: string;
  isLeadingPageIcon?: boolean;
  subMenus?: SubmenuItem[];
}

// LayoutSettings
export interface LayoutSettings {
  themeMode: 'light' | 'dark' | 'default';
  sidebarTheme: 'light' | 'dark';
  accentColor: string; // Use color codes or class names as needed
  sidebarCaption: boolean;
  rtl: boolean;
  containerWidth: boolean; // true for fixed width, false for full width

  layoutChange: 'horizontal' | 'tab' | '' | 'layout-3' | 'compact';
  islanding: 'landing-page' | '';
  isComponentPage: boolean;
}

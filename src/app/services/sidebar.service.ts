import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor() {
    // Initialize sidebar visibility based on screen size
    this.checkScreenWidth(window.innerWidth);
    // Listen for window resize events
    window.addEventListener('resize', this.onResize.bind(this));
  }

  // BehaviorSubject to keep track of the sidebar state (hidden or visible)
  private sidebarHidden = new BehaviorSubject<boolean>(false);
  private sidePanelSelection = new Subject();
  private editInnovationIdea = new Subject();
  private openEditAccountDetails = new Subject();

  // Observable to expose the sidebar state
  sidebarHidden$ = this.sidebarHidden.asObservable();
  sidePanelSelection$ = this.sidePanelSelection.asObservable();
  editInnovationIdea$ = this.editInnovationIdea.asObservable();
  openEditAccountDetails$ = this.openEditAccountDetails.asObservable();

  setPanelChange(value: any) {
    this.sidePanelSelection.next(value);
  }
  setEditInnovation(editValue: any) {
    this.editInnovationIdea.next(editValue);
  }
  openEditAccountDetail(editValue: any) {
    this.openEditAccountDetails.next(editValue);
  }
  // Check screen width and update sidebar visibility
  private checkScreenWidth(width: number) {
    if (width <= 1024) {
      this.setSidebarVisibility(true);
    } else {
      this.setSidebarVisibility(false);
    }
  }

  // Handler for window resize event
  private onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    this.checkScreenWidth(width);
  }

  // Method to toggle the sidebar visibility
  toggleSidebar() {
    this.sidebarHidden.next(!this.sidebarHidden.value);
  }

  // Method to set the sidebar visibility explicitly
  setSidebarVisibility(hidden: boolean) {
    console.log('hidden', hidden);

    this.sidebarHidden.next(hidden);
  }
}

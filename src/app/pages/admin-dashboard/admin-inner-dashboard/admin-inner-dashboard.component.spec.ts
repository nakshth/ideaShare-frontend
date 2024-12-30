import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInnerDashboardComponent } from './admin-inner-dashboard.component';

describe('AdminInnerDashboardComponent', () => {
  let component: AdminInnerDashboardComponent;
  let fixture: ComponentFixture<AdminInnerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInnerDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminInnerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

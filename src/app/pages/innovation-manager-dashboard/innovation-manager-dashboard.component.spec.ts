import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationManagerDashboardComponent } from './innovation-manager-dashboard.component';

describe('InnovationManagerDashboardComponent', () => {
  let component: InnovationManagerDashboardComponent;
  let fixture: ComponentFixture<InnovationManagerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InnovationManagerDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InnovationManagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

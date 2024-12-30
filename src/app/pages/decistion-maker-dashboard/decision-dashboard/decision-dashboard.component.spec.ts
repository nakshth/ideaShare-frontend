import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionDashboardComponent } from './decision-dashboard.component';

describe('DecisionDashboardComponent', () => {
  let component: DecisionDashboardComponent;
  let fixture: ComponentFixture<DecisionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecisionDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DecisionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

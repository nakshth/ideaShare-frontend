import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecistionMakerDashboardComponent } from './decistion-maker-dashboard.component';

describe('DecistionMakerDashboardComponent', () => {
  let component: DecistionMakerDashboardComponent;
  let fixture: ComponentFixture<DecistionMakerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecistionMakerDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DecistionMakerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

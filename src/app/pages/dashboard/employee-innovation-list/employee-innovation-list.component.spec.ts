import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInnovationListComponent } from './employee-innovation-list.component';

describe('EmployeeInnovationListComponent', () => {
  let component: EmployeeInnovationListComponent;
  let fixture: ComponentFixture<EmployeeInnovationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeInnovationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeInnovationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

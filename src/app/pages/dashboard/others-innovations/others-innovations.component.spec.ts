import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersInnovationsComponent } from './others-innovations.component';

describe('OthersInnovationsComponent', () => {
  let component: OthersInnovationsComponent;
  let fixture: ComponentFixture<OthersInnovationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OthersInnovationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OthersInnovationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

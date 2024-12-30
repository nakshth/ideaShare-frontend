import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSideSectionComponent } from './right-side-section.component';

describe('RightSideSectionComponent', () => {
  let component: RightSideSectionComponent;
  let fixture: ComponentFixture<RightSideSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightSideSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RightSideSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescisionMakerListComponent } from './descision-maker-list.component';

describe('DescisionMakerListComponent', () => {
  let component: DescisionMakerListComponent;
  let fixture: ComponentFixture<DescisionMakerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescisionMakerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescisionMakerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

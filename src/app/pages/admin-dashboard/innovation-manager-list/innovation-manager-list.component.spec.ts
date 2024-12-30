import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationManagerListComponent } from './innovation-manager-list.component';

describe('InnovationManagerListComponent', () => {
  let component: InnovationManagerListComponent;
  let fixture: ComponentFixture<InnovationManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InnovationManagerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InnovationManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

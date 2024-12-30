import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationManagerIdeaListComponent } from './innovation-manager-idea-list.component';

describe('InnovationManagerIdeaListComponent', () => {
  let component: InnovationManagerIdeaListComponent;
  let fixture: ComponentFixture<InnovationManagerIdeaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InnovationManagerIdeaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InnovationManagerIdeaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

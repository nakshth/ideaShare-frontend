import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadInnovationsComponent } from './upload-innovations.component';

describe('UploadInnovationsComponent', () => {
  let component: UploadInnovationsComponent;
  let fixture: ComponentFixture<UploadInnovationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadInnovationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadInnovationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

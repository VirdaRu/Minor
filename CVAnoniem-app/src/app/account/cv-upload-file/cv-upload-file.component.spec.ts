import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvUploadFileComponent } from './cv-upload-file.component';

describe('CvUploadFileComponent', () => {
  let component: CvUploadFileComponent;
  let fixture: ComponentFixture<CvUploadFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvUploadFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

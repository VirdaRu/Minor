import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCvComponent } from './saved-cv.component';

describe('SavedCvComponent', () => {
  let component: SavedCvComponent;
  let fixture: ComponentFixture<SavedCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedCvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

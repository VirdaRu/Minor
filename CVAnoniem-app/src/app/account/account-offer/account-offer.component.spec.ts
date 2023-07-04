import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOfferComponent } from './account-offer.component';

describe('AccountOfferComponent', () => {
  let component: AccountOfferComponent;
  let fixture: ComponentFixture<AccountOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

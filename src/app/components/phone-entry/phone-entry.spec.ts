import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneEntry } from './phone-entry';

describe('PhoneEntry', () => {
  let component: PhoneEntry;
  let fixture: ComponentFixture<PhoneEntry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneEntry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneEntry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

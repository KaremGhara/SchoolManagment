import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSchoolComponent } from './all-school.component';

describe('AllSchoolComponent', () => {
  let component: AllSchoolComponent;
  let fixture: ComponentFixture<AllSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

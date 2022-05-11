import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolToProgramComponent } from './school-to-program.component';

describe('SchoolToProgramComponent', () => {
  let component: SchoolToProgramComponent;
  let fixture: ComponentFixture<SchoolToProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolToProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolToProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

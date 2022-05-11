import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLinkedProgramComponent } from './edit-linked-program.component';

describe('EditLinkedProgramComponent', () => {
  let component: EditLinkedProgramComponent;
  let fixture: ComponentFixture<EditLinkedProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLinkedProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLinkedProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

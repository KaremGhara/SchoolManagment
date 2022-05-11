import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramImageComponent } from './program-image.component';

describe('ProgramImageComponent', () => {
  let component: ProgramImageComponent;
  let fixture: ComponentFixture<ProgramImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

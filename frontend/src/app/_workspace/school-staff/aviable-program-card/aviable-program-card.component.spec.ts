import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AviableProgramCardComponent } from './aviable-program-card.component';

describe('AviableProgramCardComponent', () => {
  let component: AviableProgramCardComponent;
  let fixture: ComponentFixture<AviableProgramCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AviableProgramCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AviableProgramCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

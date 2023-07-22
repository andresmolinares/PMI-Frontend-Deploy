import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychologicalTestsComponent } from './psychological-tests.component';

describe('PsychologicalTestsComponent', () => {
  let component: PsychologicalTestsComponent;
  let fixture: ComponentFixture<PsychologicalTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsychologicalTestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychologicalTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

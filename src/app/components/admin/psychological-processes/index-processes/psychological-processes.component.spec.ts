import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychologicalProcessesComponent } from './psychological-processes.component';

describe('PsychologicalProcessesComponent', () => {
  let component: PsychologicalProcessesComponent;
  let fixture: ComponentFixture<PsychologicalProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsychologicalProcessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychologicalProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

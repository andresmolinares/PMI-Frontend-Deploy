import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitiveProcessesComponent } from './cognitive-processes.component';

describe('CognitiveProcessesComponent', () => {
  let component: CognitiveProcessesComponent;
  let fixture: ComponentFixture<CognitiveProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CognitiveProcessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitiveProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

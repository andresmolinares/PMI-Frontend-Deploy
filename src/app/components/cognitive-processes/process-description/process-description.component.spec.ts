import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessDescriptionComponent } from './process-description.component';

describe('ProcessDescriptionComponent', () => {
  let component: ProcessDescriptionComponent;
  let fixture: ComponentFixture<ProcessDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

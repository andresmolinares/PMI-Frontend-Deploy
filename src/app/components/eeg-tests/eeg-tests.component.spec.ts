import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EegTestsComponent } from './eeg-tests.component';

describe('EegTestsComponent', () => {
  let component: EegTestsComponent;
  let fixture: ComponentFixture<EegTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EegTestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EegTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

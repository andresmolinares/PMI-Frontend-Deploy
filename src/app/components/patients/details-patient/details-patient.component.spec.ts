import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDataPatientComponent } from './details-patient.component';

describe('BasicDataPatientComponent', () => {
  let component: BasicDataPatientComponent;
  let fixture: ComponentFixture<BasicDataPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDataPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDataPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

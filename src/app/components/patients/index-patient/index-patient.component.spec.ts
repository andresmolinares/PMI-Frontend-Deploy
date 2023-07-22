import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPatientComponent } from './index-patient.component';

describe('IndexPatientComponent', () => {
  let component: IndexPatientComponent;
  let fixture: ComponentFixture<IndexPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

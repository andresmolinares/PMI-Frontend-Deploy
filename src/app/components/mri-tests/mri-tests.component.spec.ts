import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MriTestsComponent } from './mri-tests.component';

describe('MriTestsComponent', () => {
  let component: MriTestsComponent;
  let fixture: ComponentFixture<MriTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MriTestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MriTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
